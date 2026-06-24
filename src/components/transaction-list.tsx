import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

export function TransactionList({
  transactions,
  ownedAccountIds,
}: {
  transactions: Transaction[];
  ownedAccountIds: string[];
}) {
  if (transactions.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        No transactions yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {transactions.map((tx) => {
        const isCredit =
          tx.to_account_id != null && ownedAccountIds.includes(tx.to_account_id);
        return (
          <li key={tx.id} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  isCredit ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
                }`}
              >
                {isCredit ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium capitalize">
                  {tx.description || tx.type}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(tx.created_at)}
                </p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold ${
                isCredit ? "text-success" : "text-foreground"
              }`}
            >
              {isCredit ? "+" : "−"}
              {formatCurrency(tx.amount)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
