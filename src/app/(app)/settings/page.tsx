import { getProfile } from "@/lib/data";
import { ProfileForm, PasswordForm } from "@/components/settings/settings-forms";

export default async function SettingsPage() {
  const profile = await getProfile();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal details and security.
        </p>
      </div>

      <div className="grid gap-6">
        <ProfileForm profile={profile} />
        <PasswordForm />
      </div>
    </div>
  );
}
