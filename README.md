# Aegis Bank — Full-Stack Banking App

A sophisticated, deploy-ready banking platform built with **Next.js 14 (App Router)**,
**Supabase** (auth, Postgres, storage), and **Tailwind CSS**.

## Features

- 🔐 **Auth & KYC** — email/password registration, login, and a guided identity-
  verification flow with document upload.
- 🏦 **Accounts** — checking, savings (3.5% APY), and loan (8.5% APR) account types.
- 💸 **Internal transfers** — atomic, server-validated transfers via a Postgres
  `transfer_funds` function (balance checks + row locking).
- 📜 **Transaction history** — filter by type and date range.
- 🛡️ **Row-Level Security** — every table is protected; users only ever see their own data.
- 👑 **Admin panel** — manage users, approve/reject KYC, freeze accounts, fund deposits,
  and grant admin roles (uses the service-role key, server-side only).
- 🌗 **Dark / light mode** and a polished, responsive banking UI.

## Tech stack

| Layer    | Choice                                   |
| -------- | ---------------------------------------- |
| Frontend | Next.js 14 App Router, React, TypeScript |
| Styling  | Tailwind CSS, next-themes, lucide-react  |
| Backend  | Supabase (Postgres, Auth, Storage, RLS)  |
| Hosting  | Vercel                                   |

## Getting started

### 1. Create a Supabase project

At [app.supabase.com](https://app.supabase.com), create a project. Then open the
**SQL Editor** and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
This creates all tables, the RLS policies, the `transfer_funds` function, the
new-user trigger, and the `kyc-documents` storage bucket.

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in from **Project Settings → API**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only — powers the admin panel)

### 3. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Create an admin

Register a normal account, then promote it in the Supabase SQL editor:

```sql
update public.profiles set role = 'admin' where email = 'you@example.com';
```

The **Admin** link then appears in the sidebar. Use it to approve KYC and fund
accounts (new accounts start at a $0 balance).

### 5. (Optional) Seed demo data

To make a fresh account look realistic for a portfolio demo, edit the email at the
top of [`supabase/seed.sql`](supabase/seed.sql) and run it in the SQL editor. It
marks you verified and adds three funded accounts with a month of transactions.

## Deploying to Vercel

1. Push this folder to a Git repository.
2. Import it into Vercel.
3. Add the three environment variables in the Vercel project settings.
4. Deploy. (Set the Supabase Auth **Site URL** + redirect URLs to your Vercel domain.)

## Security notes

- All data access is guarded by Postgres **Row-Level Security**; the anon key alone
  can never read another user's rows.
- The service-role key is only ever imported in server actions, and every admin
  action calls `requireAdmin()` before using it.
- Fund transfers run inside a `SECURITY DEFINER` function that re-verifies ownership,
  account status, and sufficient balance under row locks — preventing race conditions.

> This is a portfolio demo, not a regulated financial institution.
