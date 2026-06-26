"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navFor } from "@/lib/nav";
import { NexusLogo } from "@/components/home/nexus-logo";

export function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const links = navFor(isAdmin);

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card md:block">
      <Link
        href="/dashboard"
        className="flex h-16 items-center gap-2 border-b border-border px-6 text-lg font-extrabold tracking-tight transition-opacity hover:opacity-80"
      >
        <NexusLogo className="h-8 w-8 text-primary" />
        Nexus<span className="font-semibold text-muted-foreground">Bank</span>
      </Link>
      <nav className="space-y-1 p-4">
        {links.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
