import { getAccounts, getProfile } from "@/lib/data";
import { AccountCard } from "@/components/account-card";
import { OpenAccountForm } from "@/components/open-account-form";

export default async function AccountsPage() {
  const [accounts, profile] = await Promise.all([getAccounts(), getProfile()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Accounts</h1>
        <p className="text-sm text-muted-foreground">
          View balances and open new accounts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {accounts.length === 0 ? (
            <div className="card p-8 text-center text-sm text-muted-foreground">
              {profile.kyc_status === "approved"
                ? "No accounts yet — open one to get started."
                : "Verify your identity to have your first checking account opened automatically."}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {accounts.map((a) => (
                <AccountCard key={a.id} account={a} />
              ))}
            </div>
          )}
        </div>
        <OpenAccountForm kycApproved={profile.kyc_status === "approved"} />
      </div>
    </div>
  );
}
