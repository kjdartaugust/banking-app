-- ============================================================================
--  Demo seed data — makes a freshly-registered account look "alive".
--
--  1. Register normally in the app first (so an auth user + profile exist).
--  2. Replace the email below with the one you registered.
--  3. Run this whole file in the Supabase SQL editor.
--
--  Safe to read: it refuses to run twice (skips if the user already has
--  accounts) and never touches other users' data.
-- ============================================================================

do $$
declare
  v_email     text := 'you@example.com';   -- <<< CHANGE ME
  v_user      uuid;
  v_checking  uuid;
  v_savings   uuid;
  v_loan      uuid;
begin
  select id into v_user from public.profiles where email = v_email;
  if v_user is null then
    raise exception 'No profile found for %, register in the app first.', v_email;
  end if;

  if exists (select 1 from public.accounts where user_id = v_user) then
    raise notice 'User already has accounts — skipping seed to avoid duplicates.';
    return;
  end if;

  -- Mark identity verified so all features are unlocked.
  update public.profiles set kyc_status = 'approved' where id = v_user;

  -- Three accounts.
  insert into public.accounts (user_id, account_number, type, balance, interest_rate, status)
    values (v_user, '4012888812', 'checking', 8450.75, 0, 'active')
    returning id into v_checking;

  insert into public.accounts (user_id, account_number, type, balance, interest_rate, status)
    values (v_user, '5599820017', 'savings', 23200.00, 3.5, 'active')
    returning id into v_savings;

  insert into public.accounts (user_id, account_number, type, balance, interest_rate, status)
    values (v_user, '7741203355', 'loan', 12000.00, 8.5, 'active')
    returning id into v_loan;

  -- A month of realistic activity (credits -> to owned account, debits -> to null).
  insert into public.transactions (from_account_id, to_account_id, amount, type, description, created_at) values
    (null,       v_checking, 3200.00, 'deposit',    'Payroll — Acme Corp',        now() - interval '28 days'),
    (v_checking, null,       1500.00, 'withdrawal', 'Rent payment',               now() - interval '27 days'),
    (v_checking, null,        142.30, 'withdrawal', 'Whole Foods Market',         now() - interval '24 days'),
    (v_checking, null,         64.10, 'withdrawal', 'Shell Gas Station',          now() - interval '22 days'),
    (null,       v_checking,  250.00, 'deposit',    'Zelle from John D.',         now() - interval '19 days'),
    (v_checking, null,         15.99, 'withdrawal', 'Netflix subscription',       now() - interval '17 days'),
    (v_checking, null,        500.00, 'transfer',   'Transfer to Savings',        now() - interval '15 days'),
    (null,       v_savings,    67.50, 'interest',   'Interest earned',            now() - interval '14 days'),
    (v_checking, null,         89.45, 'withdrawal', 'Amazon.com order',           now() - interval '10 days'),
    (null,       v_checking, 3200.00, 'deposit',    'Payroll — Acme Corp',        now() - interval '7 days'),
    (v_checking, null,          5.00, 'fee',        'Monthly maintenance fee',    now() - interval '5 days'),
    (null,       v_checking,  890.00, 'deposit',    'Tax refund — IRS',           now() - interval '2 days'),
    (v_checking, null,         32.18, 'withdrawal', 'Starbucks',                  now() - interval '1 day');

  raise notice 'Seed complete for % — 3 accounts and 13 transactions added.', v_email;
end $$;
