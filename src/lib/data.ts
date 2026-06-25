import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import type { Account, Profile, Transaction } from "@/lib/types";

/**
 * Returns the authenticated user's profile. If the user is authenticated but
 * has no `profiles` row (e.g. the signup trigger didn't fire), the row is
 * created on the fly with the service-role client. This is what prevents the
 * /dashboard ⇄ /login redirect loop: an authenticated user always resolves to
 * a profile, never bouncing back to login.
 */
export async function getProfile(): Promise<Profile> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // Self-heal: `profiles` has no INSERT policy by design (the trigger owns
    // creation), so use the admin client to backfill the missing row.
    const admin = createAdminClient();
    await admin.from("profiles").upsert(
      {
        id: user.id,
        email: user.email,
        full_name:
          (user.user_metadata as { full_name?: string } | null)?.full_name ?? null,
      },
      { onConflict: "id" }
    );
    const reread = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = reread.data;
  }

  if (!profile) redirect("/login");
  return profile as Profile;
}

export async function getAccounts(): Promise<Account[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("accounts")
    .select("*")
    .order("created_at", { ascending: true });
  return (data as Account[]) ?? [];
}

export async function getRecentTransactions(limit = 10): Promise<Transaction[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as Transaction[]) ?? [];
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await getProfile();
  if (profile.role !== "admin") redirect("/dashboard");
  return profile;
}
