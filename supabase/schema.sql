-- ============================================================================
--  Banking App — Database Schema, RLS Policies, and Functions
--  Run this in the Supabase SQL editor (https://app.supabase.com → SQL).
-- ============================================================================

-- ---------- Enums ----------------------------------------------------------
do $$ begin
  create type user_role        as enum ('user', 'admin');
  create type kyc_status        as enum ('not_started', 'pending', 'approved', 'rejected');
  create type account_type      as enum ('checking', 'savings', 'loan');
  create type account_status    as enum ('active', 'frozen', 'closed');
  create type transaction_type  as enum ('transfer', 'deposit', 'withdrawal', 'interest', 'fee');
exception
  when duplicate_object then null;
end $$;

-- ---------- profiles -------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  email       text,
  phone       text,
  role        user_role   not null default 'user',
  kyc_status  kyc_status  not null default 'not_started',
  created_at  timestamptz not null default now()
);

-- ---------- kyc_submissions ------------------------------------------------
create table if not exists public.kyc_submissions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  date_of_birth date,
  address       text,
  id_type       text,
  id_number     text,
  document_url  text,
  status        kyc_status  not null default 'pending',
  reviewed_by   uuid references public.profiles(id),
  created_at    timestamptz not null default now()
);

-- ---------- accounts -------------------------------------------------------
create table if not exists public.accounts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  account_number  text not null unique,
  type            account_type   not null default 'checking',
  balance         numeric(14,2)  not null default 0 check (balance >= 0),
  currency        text           not null default 'USD',
  status          account_status not null default 'active',
  interest_rate   numeric(5,2)   not null default 0,
  created_at      timestamptz    not null default now()
);
create index if not exists accounts_user_id_idx on public.accounts(user_id);

-- ---------- transactions ---------------------------------------------------
create table if not exists public.transactions (
  id               uuid primary key default gen_random_uuid(),
  from_account_id  uuid references public.accounts(id) on delete set null,
  to_account_id    uuid references public.accounts(id) on delete set null,
  amount           numeric(14,2) not null check (amount > 0),
  type             transaction_type not null default 'transfer',
  description      text,
  status           text not null default 'completed',
  created_at       timestamptz not null default now()
);
create index if not exists tx_from_idx on public.transactions(from_account_id);
create index if not exists tx_to_idx   on public.transactions(to_account_id);

-- ============================================================================
--  Helper: is_admin() — avoids recursive RLS lookups
-- ============================================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================================
--  Auto-create a profile when a new auth user signs up
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
--  Atomic fund transfer (internal)
-- ============================================================================
create or replace function public.transfer_funds(
  p_from_account uuid,
  p_to_account_number text,
  p_amount numeric,
  p_description text default null
)
returns public.transactions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_to_account   public.accounts%rowtype;
  v_from_account public.accounts%rowtype;
  v_tx           public.transactions%rowtype;
begin
  if p_amount is null or p_amount <= 0 then
    raise exception 'Amount must be greater than zero';
  end if;

  -- Lock the source row; verify ownership and that it is active
  select * into v_from_account from public.accounts
    where id = p_from_account for update;
  if not found then raise exception 'Source account not found'; end if;
  if v_from_account.user_id <> auth.uid() then
    raise exception 'Not authorized to use this account';
  end if;
  if v_from_account.status <> 'active' then
    raise exception 'Source account is not active';
  end if;
  if v_from_account.balance < p_amount then
    raise exception 'Insufficient funds';
  end if;

  -- Resolve and lock destination
  select * into v_to_account from public.accounts
    where account_number = p_to_account_number for update;
  if not found then raise exception 'Destination account not found'; end if;
  if v_to_account.id = v_from_account.id then
    raise exception 'Cannot transfer to the same account';
  end if;
  if v_to_account.status <> 'active' then
    raise exception 'Destination account is not active';
  end if;

  update public.accounts set balance = balance - p_amount where id = v_from_account.id;
  update public.accounts set balance = balance + p_amount where id = v_to_account.id;

  insert into public.transactions (from_account_id, to_account_id, amount, type, description)
  values (v_from_account.id, v_to_account.id, p_amount, 'transfer', p_description)
  returning * into v_tx;

  return v_tx;
end;
$$;

-- ============================================================================
--  Row Level Security
-- ============================================================================
alter table public.profiles        enable row level security;
alter table public.kyc_submissions enable row level security;
alter table public.accounts         enable row level security;
alter table public.transactions     enable row level security;

-- profiles
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid() or public.is_admin());

-- Lets the app self-heal a missing profile row for the current user (the
-- signup trigger normally owns creation; this is a safety net).
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (id = auth.uid());

-- kyc_submissions
drop policy if exists "kyc_select" on public.kyc_submissions;
create policy "kyc_select" on public.kyc_submissions
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "kyc_insert" on public.kyc_submissions;
create policy "kyc_insert" on public.kyc_submissions
  for insert with check (user_id = auth.uid());

drop policy if exists "kyc_update_admin" on public.kyc_submissions;
create policy "kyc_update_admin" on public.kyc_submissions
  for update using (public.is_admin());

-- accounts
drop policy if exists "accounts_select" on public.accounts;
create policy "accounts_select" on public.accounts
  for select using (user_id = auth.uid() or public.is_admin());

-- Users may open their own accounts (balance defaults to 0, enforced by column default)
drop policy if exists "accounts_insert_own" on public.accounts;
create policy "accounts_insert_own" on public.accounts
  for insert with check (user_id = auth.uid());

-- Admins may update/delete any account (e.g. freeze, adjust balance, fund)
drop policy if exists "accounts_admin_write" on public.accounts;
create policy "accounts_admin_write" on public.accounts
  for all using (public.is_admin()) with check (public.is_admin());

-- transactions: visible if either leg belongs to the current user
drop policy if exists "tx_select" on public.transactions;
create policy "tx_select" on public.transactions
  for select using (
    public.is_admin()
    or exists (select 1 from public.accounts a
               where a.id in (from_account_id, to_account_id) and a.user_id = auth.uid())
  );

-- ============================================================================
--  Storage bucket for KYC documents
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('kyc-documents', 'kyc-documents', false)
on conflict (id) do nothing;

drop policy if exists "kyc_docs_insert_own" on storage.objects;
create policy "kyc_docs_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'kyc-documents' and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "kyc_docs_read_own" on storage.objects;
create policy "kyc_docs_read_own" on storage.objects
  for select using (
    bucket_id = 'kyc-documents'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

-- ============================================================================
--  Grants — REQUIRED. Tables created via SQL with RLS enabled have policies
--  but no table-level privileges, so every query fails with
--  "42501: permission denied for table ...". RLS still gates rows per user;
--  these grants just allow the API roles to reach the tables at all.
-- ============================================================================
grant usage on schema public to anon, authenticated, service_role;

grant all on all tables    in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all functions in schema public to anon, authenticated, service_role;

alter default privileges in schema public
  grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public
  grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema public
  grant all on functions to anon, authenticated, service_role;
