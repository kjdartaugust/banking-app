import Link from "next/link";
import { Wallet, TrendingUp, Landmark, ArrowRight } from "lucide-react";
import { getAccounts, getProfile, getRecentTransactions } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { AccountCard } from "@/components/account-card";
import { TransactionList } from "@/components/transaction-list";

export default async function DashboardPage() {
  const [profile, accounts, transactions] = await Promise.all([
    getProfile(),
    getAccounts(),
    getRecentTransactions(6),
  ]);

  const ownedIds = accounts.map((a) => a.id);
  const assets = accounts
    .filter((a) => a.type !== "loan")
    .reduce((sum, a) => sum + Number(a.balance), 0);
  const debt = accounts
    .filter((a) => a.type === "loan")
    .reduce((sum, a) => sum + Number(a.balance), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back{profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s an overview of your finances.
        </p>
      </div>

      {profile.kyc_status !== "approved" && (
        <div className="card flex items-center justify-between border-amber-500/40 bg-amber-500/5 p-4">
          <p className="text-sm">
            Complete identity verification to unlock full account features.
          </p>
          <Link href="/kyc" className="btn-primary">
            Verify now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Total assets" value={formatCurrency(assets)} />
        <StatCard
          icon={Landmark}
          label="Outstanding loans"
          value={formatCurrency(debt)}
        />
        <StatCard
          icon={TrendingUp}
          label="Net worth"
          value={formatCurrency(assets - debt)}
        />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your accounts</h2>
          <Link href="/accounts" className="text-sm font-medium text-primary">
            Manage
          </Link>
        </div>
        {accounts.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              You don&apos;t have any accounts yet.
            </p>
            <Link href="/accounts" className="btn-primary mt-4">
              Open your first account
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map((a) => (
              <AccountCard key={a.id} account={a} />
            ))}
          </div>
        )}
      </div>

      <div className="card p-5">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent activity</h2>
          <Link href="/transactions" className="text-sm font-medium text-primary">
            View all
          </Link>
        </div>
        <TransactionList transactions={transactions} ownedAccountIds={ownedIds} />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
