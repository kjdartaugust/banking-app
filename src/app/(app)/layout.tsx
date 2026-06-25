import type { Profile } from "@/lib/types";
import { getProfile } from "@/lib/data";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let profile: Profile;
  try {
    profile = await getProfile();
  } catch (e) {
    // Render the real error on screen — production otherwise hides Server
    // Component error messages, which made this impossible to diagnose.
    const message = e instanceof Error ? e.message : String(e);
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="card max-w-xl p-6">
          <h1 className="text-lg font-bold text-danger">Couldn’t load your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A diagnostic message (visible so we can fix it):
          </p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-muted p-3 text-xs">
            {message}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin={profile.role === "admin"} />
      <div className="flex flex-1 flex-col">
        <Topbar profile={profile} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
