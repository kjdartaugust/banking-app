import { requireAdmin } from "@/lib/data";
import { createAdminClient } from "@/lib/supabase/server";
import { Badge } from "@/components/badge";
import { formatCurrency, maskAccountNumber } from "@/lib/utils";
import {
  setKycStatus,
  setAccountStatus,
  setUserRole,
  fundAccount,
} from "@/app/actions/admin";
import { AdminCharts } from "@/components/admin/admin-charts";
import type { Account, Profile } from "@/lib/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default async function AdminPage() {
  await requireAdmin();
  const db = createAdminClient();

  const { data: profiles } = await db
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  const { data: accounts } = await db
    .from("accounts")
    .select("*")
    .order("created_at", { ascending: false });

  const users = (profiles as Profile[]) ?? [];
  const allAccounts = (accounts as Account[]) ?? [];
  const totalDeposits = allAccounts
    .filter((a) => a.type !== "loan")
    .reduce((s, a) => s + Number(a.balance), 0);

  // New users — last 6 months.
  const now = new Date();
  const signupBuckets = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, month: MONTHS[d.getMonth()], count: 0 };
  });
  const signupIndex = new Map(signupBuckets.map((b) => [b.key, b]));
  for (const u of users) {
    const d = new Date(u.created_at);
    const b = signupIndex.get(`${d.getFullYear()}-${d.getMonth()}`);
    if (b) b.count += 1;
  }
  const signups = signupBuckets.map(({ month, count }) => ({ month, count }));

  // Deposits by account type.
  const deposits = (["checking", "savings", "loan"] as const).map((type) => ({
    type: type[0].toUpperCase() + type.slice(1),
    amount: allAccounts
      .filter((a) => a.type === type)
      .reduce((s, a) => s + Number(a.balance), 0),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin panel</h1>
        <p className="text-sm text-muted-foreground">
          Manage users, KYC approvals, and accounts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total users" value={String(users.length)} />
        <Stat label="Total accounts" value={String(allAccounts.length)} />
        <Stat label="Total deposits" value={formatCurrency(totalDeposits)} />
      </div>

      <AdminCharts signups={signups} deposits={deposits} />

      {/* Users + KYC */}
      <div className="card p-5">
        <h2 className="mb-4 text-lg font-semibold">Users &amp; KYC</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-2 pr-4">User</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">KYC</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border/60">
                  <td className="py-3 pr-4">
                    <p className="font-medium">{u.full_name ?? "—"}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </td>
                  <td className="py-3 pr-4 capitalize">{u.role}</td>
                  <td className="py-3 pr-4">
                    <Badge status={u.kyc_status} />
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-2">
                      <form action={setKycStatus}>
                        <input type="hidden" name="user_id" value={u.id} />
                        <input type="hidden" name="status" value="approved" />
                        <button className="btn-outline h-8 text-xs">Approve</button>
                      </form>
                      <form action={setKycStatus}>
                        <input type="hidden" name="user_id" value={u.id} />
                        <input type="hidden" name="status" value="rejected" />
                        <button className="btn-outline h-8 text-xs">Reject</button>
                      </form>
                      <form action={setUserRole}>
                        <input type="hidden" name="user_id" value={u.id} />
                        <input
                          type="hidden"
                          name="role"
                          value={u.role === "admin" ? "user" : "admin"}
                        />
                        <button className="btn-outline h-8 text-xs">
                          {u.role === "admin" ? "Demote" : "Make admin"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accounts */}
      <div className="card p-5">
        <h2 className="mb-4 text-lg font-semibold">Accounts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-2 pr-4">Number</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Balance</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allAccounts.map((a) => (
                <tr key={a.id} className="border-b border-border/60">
                  <td className="py-3 pr-4 font-mono text-xs">
                    {maskAccountNumber(a.account_number)}
                  </td>
                  <td className="py-3 pr-4 capitalize">{a.type}</td>
                  <td className="py-3 pr-4">{formatCurrency(a.balance, a.currency)}</td>
                  <td className="py-3 pr-4">
                    <Badge status={a.status} />
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <form action={fundAccount} className="flex items-center gap-1">
                        <input type="hidden" name="account_id" value={a.id} />
                        <input
                          name="amount"
                          type="number"
                          step="0.01"
                          min="0.01"
                          placeholder="0.00"
                          className="input h-8 w-24 py-1 text-xs"
                        />
                        <button className="btn-outline h-8 text-xs">Fund</button>
                      </form>
                      <form action={setAccountStatus}>
                        <input type="hidden" name="account_id" value={a.id} />
                        <input
                          type="hidden"
                          name="status"
                          value={a.status === "active" ? "frozen" : "active"}
                        />
                        <button className="btn-outline h-8 text-xs">
                          {a.status === "active" ? "Freeze" : "Activate"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
