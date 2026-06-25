import { getAccounts } from "@/lib/data";
import { TransferForm } from "@/components/transfer-form";

export default async function TransferPage() {
  const accounts = await getAccounts();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transfer funds</h1>
        <p className="text-sm text-muted-foreground">
          Send money instantly to any Nexus Bank account.
        </p>
      </div>
      <TransferForm accounts={accounts} />
    </div>
  );
}
