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
  const featured = account.type === "checking";

  if (featured) {
    return (
      <div className="card-hover relative overflow-hidden rounded-lg bg-navy-gradient p-5 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold capitalize">{account.type}</p>
              <p className="text-xs text-white/70">
                {maskAccountNumber(account.account_number)}
              </p>
            </div>
          </div>
          <Badge status={account.status} />
        </div>
        <p className="relative mt-5 text-2xl font-extrabold tracking-tight">
          {formatCurrency(account.balance, account.currency)}
        </p>
        <p className="relative mt-1 text-xs text-white/60">Available balance</p>
      </div>
    );
  }

  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold capitalize">{account.type}</p>
            <p className="text-xs text-muted-foreground">
              {maskAccountNumber(account.account_number)}
            </p>
          </div>
        </div>
        <Badge status={account.status} />
      </div>
      <p className="mt-5 text-2xl font-extrabold tracking-tight">
        {formatCurrency(account.balance, account.currency)}
      </p>
      {account.interest_rate > 0 && (
        <p className="mt-1 text-xs font-medium text-gold">
          {account.type === "loan" ? "APR" : "APY"} {account.interest_rate}%
        </p>
      )}
    </div>
  );
}
