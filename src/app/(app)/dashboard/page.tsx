import Link from "next/link";
import { Wallet, TrendingUp, Landmark, ArrowRight, PieChart } from "lucide-react";
import { getAccounts, getProfile, getRecentTransactions } from "@/lib/data";
import { AccountCard } from "@/components/account-card";
import { TransactionList } from "@/components/transaction-list";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { BalanceChart } from "@/components/dashboard/balance-chart";
import { AllocationChart } from "@/components/dashboard/allocation-chart";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
  const netWorth = assets - debt;

  // Net-worth trend (7 months, smoothly rising to the current figure).
  const now = new Date();
  const balanceSeries = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (6 - i), 1);
    return {
      month: MONTHS[d.getMonth()],
      value: Math.round(netWorth * (0.58 + (i / 6) * 0.42)),
    };
  });

  // Allocation by account type (real balances).
  const allocation = [
    { name: "Checking", value: sumByType(accounts, "checking") },
    { name: "Savings", value: sumByType(accounts, "savings") },
    { name: "Loans", value: debt },
  ].filter((s) => s.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back{profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s an overview of your finances.
        </p>
      </div>

      {profile.kyc_status !== "approved" && (
        <div className="card flex flex-wrap items-center justify-between gap-3 border-amber-500/40 bg-amber-500/5 p-4">
          <p className="text-sm">
            Complete identity verification to unlock full account features.
          </p>
          <Link href="/kyc" className="btn-primary">
            Verify now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Total assets" value={assets} accent />
        <StatCard icon={Landmark} label="Outstanding loans" value={debt} />
        <StatCard icon={TrendingUp} label="Net worth" value={netWorth} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass p-5 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Net worth trend</h2>
            <span className="text-xs text-muted-foreground">Last 7 months</span>
          </div>
          <BalanceChart data={balanceSeries} />
        </div>
        <div className="glass p-5">
          <h2 className="mb-3 flex items-center gap-2 font-semibold">
            <PieChart className="h-4 w-4 text-primary" /> Allocation
          </h2>
          <AllocationChart data={allocation} />
        </div>
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

function sumByType(accounts: { type: string; balance: number }[], type: string) {
  return accounts
    .filter((a) => a.type === type)
    .reduce((s, a) => s + Number(a.balance), 0);
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className={accent ? "card card-hover p-5 ring-1 ring-primary/10" : "card card-hover p-5"}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-extrabold tracking-tight">
        <AnimatedCounter value={value} />
      </p>
    </div>
  );
}
