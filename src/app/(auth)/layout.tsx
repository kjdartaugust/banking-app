import Link from "next/link";
import { ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { NexusLogo } from "@/components/home/nexus-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-navy-gradient p-12 text-white lg:flex">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <Link href="/" className="relative flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <NexusLogo className="h-9 w-9 text-white" />
          Nexus<span className="font-semibold text-white/70">Bank</span>
        </Link>

        <div className="relative max-w-md">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
            Banking that feels effortless &amp; secure.
          </h2>
          <p className="mt-4 text-white/70">
            Join a platform engineered with the security a Fortune 500 institution
            demands — protected down to the database row.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-gold" /> Row-Level Security on every account
            </li>
            <li className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-gold" /> 256-bit encrypted document storage
            </li>
            <li className="flex items-center gap-3">
              <BadgeCheck className="h-5 w-5 text-gold" /> FDIC insured · Member SIPC
            </li>
          </ul>
        </div>

        <p className="relative text-xs text-white/50">
          © {new Date().getFullYear()} Nexus Bank — a portfolio demo.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-6 lg:justify-end">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight lg:hidden">
            <NexusLogo className="h-8 w-8 text-primary" />
            Nexus<span className="font-semibold text-muted-foreground">Bank</span>
          </Link>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
}
