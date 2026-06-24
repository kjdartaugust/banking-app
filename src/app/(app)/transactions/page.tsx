import { createClient } from "@/lib/supabase/server";
import { getAccounts } from "@/lib/data";
import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionList } from "@/components/transaction-list";
import type { Transaction } from "@/lib/types";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: { type?: string; from?: string; to?: string };
}) {
  const accounts = await getAccounts();
  const ownedIds = accounts.map((a) => a.id);

  const supabase = createClient();
  let query = supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (searchParams.type && searchParams.type !== "all") {
    query = query.eq("type", searchParams.type);
  }
  if (searchParams.from) query = query.gte("created_at", searchParams.from);
  if (searchParams.to) query = query.lte("created_at", `${searchParams.to}T23:59:59`);

  const { data } = await query;
  const transactions = (data as Transaction[]) ?? [];

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
