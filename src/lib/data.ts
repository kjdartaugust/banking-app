import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import type { Account, Profile, Transaction } from "@/lib/types";

/**
 * Reads are performed with the service-role client but **always scoped to the
 * authenticated user's id** (resolved from the session via `getUser()`). This
 * keeps each user limited to their own data while not depending on the
 * server-side RLS read path, which proved unreliable on the deployment.
 * Mutations still go through RLS / the `transfer_funds` SECURITY DEFINER RPC.
 */
async function requireUser(): Promise<User> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}

export async function getProfile(): Promise<Profile> {
  const user = await requireUser();

  let db;
  try {
    db = createAdminClient();
  } catch (e) {
    throw new Error(
      `Admin client init failed (SUPABASE_SERVICE_ROLE_KEY likely missing in this environment): ${
        e instanceof Error ? e.message : String(e)
      }`
    );
  }

  const { data: profile, error: readErr } = await db
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  if (readErr) {
    throw new Error(`profiles read error [${readErr.code}]: ${readErr.message}`);
  }
  if (profile) return profile as Profile;

  // Self-heal: backfill a profile if the signup trigger never created one.
  const { error: upErr } = await db.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name:
        (user.user_metadata as { full_name?: string } | null)?.full_name ?? null,
    },
    { onConflict: "id" }
  );
  if (upErr) {
    throw new Error(
      `profiles upsert error [${upErr.code}]: ${upErr.message} — if this is an RLS error, the service-role key is wrong (it's the anon key).`
    );
  }

  const { data: again, error: err2 } = await db
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  if (err2) throw new Error(`profiles reread error [${err2.code}]: ${err2.message}`);
  if (again) return again as Profile;

  throw new Error(
    `Profile still missing after upsert for user ${user.id} (${user.email}).`
  );
}

export async function getAccounts(): Promise<Account[]> {
  const user = await requireUser();
  const db = createAdminClient();
  const { data } = await db
    .from("accounts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });
  return (data as Account[]) ?? [];
}

/** Account ids owned by the current user — used to scope transaction queries. */
async function ownedAccountIds(db: ReturnType<typeof createAdminClient>, userId: string) {
  const { data } = await db.from("accounts").select("id").eq("user_id", userId);
  return ((data as { id: string }[]) ?? []).map((a) => a.id);
}

export async function getRecentTransactions(limit = 10): Promise<Transaction[]> {
  const user = await requireUser();
  const db = createAdminClient();
  const ids = await ownedAccountIds(db, user.id);
  if (ids.length === 0) return [];

  const list = ids.join(",");
  const { data } = await db
    .from("transactions")
    .select("*")
    .or(`from_account_id.in.(${list}),to_account_id.in.(${list})`)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as Transaction[]) ?? [];
}

export interface TransactionFilter {
  type?: string;
  from?: string;
  to?: string;
}

export async function getTransactions(
  filter: TransactionFilter = {}
): Promise<Transaction[]> {
  const user = await requireUser();
  const db = createAdminClient();
  const ids = await ownedAccountIds(db, user.id);
  if (ids.length === 0) return [];

  const list = ids.join(",");
  let query = db
    .from("transactions")
    .select("*")
    .or(`from_account_id.in.(${list}),to_account_id.in.(${list})`)
    .order("created_at", { ascending: false })
    .limit(200);

  if (filter.type && filter.type !== "all") query = query.eq("type", filter.type);
  if (filter.from) query = query.gte("created_at", filter.from);
  if (filter.to) query = query.lte("created_at", `${filter.to}T23:59:59`);

  const { data } = await query;
  return (data as Transaction[]) ?? [];
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await getProfile();
  if (profile.role !== "admin") redirect("/dashboard");
  return profile;
}
