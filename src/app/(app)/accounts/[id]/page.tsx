import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowLeftRight, CreditCard, PiggyBank, Landmark } from "lucide-react";
import { getAccount, getAccountTransactions } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/badge";
import { TransactionList } from "@/components/transaction-list";
import { ExportButton } from "@/components/transactions/export-button";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";
import { SpendingChart, type MonthlyFlow } from "@/components/dashboard/spending-chart";
import type { Transaction } from "@/lib/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const icons = { checking: CreditCard, savings: PiggyBank, loan: Landmark } as const;

function monthlyFlows(transactions: Transaction[], accountId: string): MonthlyFlow[] {
  const now = new Date();
  const buckets = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, month: MONTHS[d.getMonth()], income: 0, spending: 0 };
  });
  const index = new Map(buckets.map((b) => [b.key, b]));
  for (const tx of transactions) {
    const d = new Date(tx.created_at);
    const b = index.get(`${d.getFullYear()}-${d.getMonth()}`);
    if (!b) continue;
    if (tx.to_account_id === accountId) b.income += Number(tx.amount);
    if (tx.from_account_id === accountId) b.spending += Number(tx.amount);
  }
  return buckets.map(({ month, income, spending }) => ({ month, income, spending }));
}

export default async function AccountDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const account = await getAccount(params.id);
  if (!account) notFound();

  const transactions = await getAccountTransactions(account.id);
  const flows = monthlyFlows(transactions, account.id);
  const Icon = icons[account.type];
  const isLoan = account.type === "loan";

  return (
    <div className="space-y-6">
      <Link
        href="/accounts"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to accounts
      </Link>

      {/* Header */}
      <div className="relative overflow-hidden rounded-lg bg-navy-gradient p-6 text-white shadow-lg">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold capitalize">{account.type} account</p>
              <p className="font-mono text-sm text-white/70">{account.account_number}</p>
            </div>
          </div>
          <Badge status={account.status} />
        </div>
        <p className="relative mt-6 text-3xl font-extrabold tracking-tight">
          <AnimatedCounter value={Number(account.balance)} />
        </p>
        <p className="relative mt-1 text-sm text-white/60">
          {isLoan ? "Outstanding balance" : "Available balance"}
          {account.interest_rate > 0 &&
            ` · ${isLoan ? "APR" : "APY"} ${account.interest_rate}%`}
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link
            href="/transfer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-nexus-navy transition hover:bg-nexus-aqua hover:text-white"
          >
            <ArrowLeftRight className="h-4 w-4" /> Transfer
          </Link>
        </div>
      </div>

      {/* Account facts */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Fact label="Account number" value={account.account_number} mono />
        <Fact label="Currency" value={account.currency} />
        <Fact label="Opened" value={formatDate(account.created_at)} />
      </div>

      {/* Cash flow */}
      <div className="glass p-5">
        <h2 className="mb-1 font-semibold">Cash flow</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Money in and out of this account, last 6 months
        </p>
        <SpendingChart data={flows} />
      </div>

      {/* Transactions */}
      <div className="card p-5">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transaction history</h2>
          <ExportButton
            transactions={transactions}
            ownedAccountIds={[account.id]}
            filename={`nexus-${account.account_number.slice(-4)}-statement.csv`}
          />
        </div>
        <TransactionList transactions={transactions} ownedAccountIds={[account.id]} />
      </div>
    </div>
  );
}

function Fact({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}
