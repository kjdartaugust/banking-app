import { CreditCard, PiggyBank, Landmark } from "lucide-react";
import { formatCurrency, maskAccountNumber } from "@/lib/utils";
import { Badge } from "@/components/badge";
import type { Account } from "@/lib/types";

const icons = {
  checking: CreditCard,
  savings: PiggyBank,
  loan: Landmark,
} as const;

export function AccountCard({ account }: { account: Account }) {
  const Icon = icons[account.type];
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium capitalize">{account.type}</p>
            <p className="text-xs text-muted-foreground">
              {maskAccountNumber(account.account_number)}
            </p>
          </div>
        </div>
        <Badge status={account.status} />
      </div>
      <p className="mt-4 text-2xl font-bold">
        {formatCurrency(account.balance, account.currency)}
      </p>
      {account.interest_rate > 0 && (
        <p className="mt-1 text-xs text-muted-foreground">
          {account.type === "loan" ? "APR" : "APY"} {account.interest_rate}%
        </p>
      )}
    </div>
  );
}
