# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build (also runs type-checking + lint; the source of truth for "does it compile")
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`next lint`)

There is no test suite. If a build fails on this machine over a Google Fonts fetch, that's a network/sandbox issue — fonts are intentionally a system stack (see Notes).

If npm hits TLS/cert errors, prefix installs with `NODE_OPTIONS=--use-system-ca`.

## Environment

Copy `.env.local.example` → `.env.local` and fill in three Supabase values:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
The service-role key is server-only and must never be imported into a client component.

## Architecture

Next.js 14 App Router + Supabase (Postgres/Auth/Storage) + Tailwind. The defining
principle: **security lives in the database, not the app.** Postgres Row-Level Security
is the real authorization boundary; the UI is a thin layer over it.

- **`supabase/schema.sql`** is the canonical backend — tables, enums, RLS policies, the
  `kyc-documents` storage bucket, the `handle_new_user` trigger (auto-creates a `profiles`
  row on signup), and two `SECURITY DEFINER` functions: `is_admin()` (used inside policies
  to avoid recursive lookups) and `transfer_funds()`. Schema changes are applied by pasting
  this file into the Supabase SQL editor — there is no migration tool wired up.

- **Money never moves in TypeScript.** `transfer_funds(from_account, to_account_number,
  amount, description)` does the whole transfer atomically under row locks: ownership check,
  active-status check, balance check, both balance updates, and the `transactions` insert.
  The transfer server action just calls `supabase.rpc("transfer_funds", …)`. Don't
  reimplement balance math in app code.

- **Three Supabase clients** in `src/lib/supabase/`: `client.ts` (browser),
  `server.ts` → `createClient()` (RLS-scoped, per-request via cookies) and
  `createAdminClient()` (service-role, **bypasses RLS**), and `middleware.ts` (session
  refresh). The admin client is only legitimate after `requireAdmin()` — see below.

- **Clients are intentionally untyped** (no `<Database>` generic). A minimal generic made
  Supabase's insert/rpc types collapse to `never`, so query results are cast explicitly,
  e.g. `(data as Account[])`. Entity types live in `src/lib/types.ts`. Keep that pattern;
  don't re-add the generic.

- **Routing**: `(auth)` group = login/register (own centered layout); `(app)` group =
  the authenticated dashboard shell (sidebar + topbar), whose layout calls `getProfile()`
  and redirects unauthenticated users. `src/middleware.ts` guards protected path prefixes
  and bounces logged-in users away from auth pages.

- **Data access helpers** are centralized in `src/lib/data.ts`: `getProfile()`,
  `getAccounts()`, `getRecentTransactions()`, and `requireAdmin()`. Pages should use these
  rather than querying Supabase ad hoc.

- **Mutations are server actions** in `src/app/actions/`. The pattern: `useFormState`
  on a client form → action returns `{ error }` or `{ success }`. Every function in
  `admin.ts` calls `requireAdmin()` **before** touching `createAdminClient()` — this is the
  only thing standing between a normal user and RLS-bypassing writes, so never skip it.

## Roles & flows

- New users get a `profiles` row with `role='user'`, `kyc_status='not_started'`. Promote an
  admin manually: `update public.profiles set role='admin' where email='…';`. The Admin
  sidebar link and `/admin` route are gated on `role='admin'`.
- KYC: user submits via `/kyc` (optional document upload to the private `kyc-documents`
  bucket, foldered by user id), which flips them to `pending`; an admin approves/rejects.
- **Approval auto-provisions banking** (Chase-style): when an admin approves KYC,
  `setKycStatus` opens a starter `checking` account with a `$300` welcome bonus
  (recorded as a `deposit`) — but only if the user has none, so re-approval never
  duplicates. Opening further accounts (`openAccount`) is gated on `kyc_status='approved'`.
- After the bonus, balances only increase via an admin "Fund" action (a `deposit`
  transaction) or an incoming transfer.

## Notes

- Fonts use a system stack (`Inter, system-ui, …` in `tailwind.config.ts`) rather than
  `next/font/google` so builds don't depend on network access.
- Client components that call `useSearchParams()` must sit inside a `<Suspense>` boundary
  or the static prerender of that route fails (see `(auth)/login/page.tsx`).
