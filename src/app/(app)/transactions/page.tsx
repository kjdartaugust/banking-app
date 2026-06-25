import { getAccounts, getTransactions } from "@/lib/data";
import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionList } from "@/components/transaction-list";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-sm text-muted-foreground">
          {transactions.length} record{transactions.length === 1 ? "" : "s"}
        </p>
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
