import { LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/badge";
import type { Profile } from "@/lib/types";

export function Topbar({ profile }: { profile: Profile }) {
  const initials = (profile.full_name ?? profile.email ?? "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">KYC:</span>
        <Badge status={profile.kyc_status} />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {initials}
          </div>
          <div className="hidden text-sm sm:block">
            <p className="font-medium leading-none">{profile.full_name}</p>
            <p className="text-xs text-muted-foreground">{profile.email}</p>
          </div>
        </div>
        <form action={signOut}>
          <button className="btn-outline h-9 w-9 !px-0" aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        </form>
      </div>
    </header>
  );
}
