import { getAccounts, getTransactions } from "@/lib/data";
import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionList } from "@/components/transaction-list";
import { ExportButton } from "@/components/transactions/export-button";
import { SpendingChart, type MonthlyFlow } from "@/components/dashboard/spending-chart";
import type { Transaction } from "@/lib/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Buckets the last 6 months of income vs spending relative to owned accounts. */
function monthlyFlows(transactions: Transaction[], ownedIds: string[]): MonthlyFlow[] {
  const now = new Date();
  const buckets = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, month: MONTHS[d.getMonth()], income: 0, spending: 0 };
  });
  const index = new Map(buckets.map((b) => [b.key, b]));

  for (const tx of transactions) {
    const d = new Date(tx.created_at);
    const bucket = index.get(`${d.getFullYear()}-${d.getMonth()}`);
    if (!bucket) continue;
    const credit = tx.to_account_id != null && ownedIds.includes(tx.to_account_id);
    const debit = tx.from_account_id != null && ownedIds.includes(tx.from_account_id);
    if (credit && !debit) bucket.income += Number(tx.amount);
    else if (debit && !credit) bucket.spending += Number(tx.amount);
  }
  return buckets.map(({ month, income, spending }) => ({ month, income, spending }));
}

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: { type?: string; from?: string; to?: string };
}) {
  const [accounts, transactions] = await Promise.all([
    getAccounts(),
    getTransactions(searchParams),
  ]);
  const ownedIds = accounts.map((a) => a.id);
  const flows = monthlyFlows(transactions, ownedIds);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground">
            {transactions.length} record{transactions.length === 1 ? "" : "s"}
          </p>
        </div>
        <ExportButton transactions={transactions} ownedAccountIds={ownedIds} />
      </div>

      <div className="glass p-5">
        <h2 className="mb-2 font-semibold">Cash flow</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Income vs spending over the last 6 months
        </p>
        <SpendingChart data={flows} />
      </div>

      <div className="card p-5">
        <TransactionFilters />
      </div>

      <div className="card p-5">
        <TransactionList transactions={transactions} ownedAccountIds={ownedIds} />
      </div>
    </div>
  );
}
