import Link from "next/link";
import {
  ShieldCheck,
  ArrowLeftRight,
  PiggyBank,
  LineChart,
  Lock,
  Landmark,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  {
    icon: ArrowLeftRight,
    title: "Instant Transfers",
    desc: "Move money between accounts in real time with atomic, audited transactions.",
  },
  {
    icon: PiggyBank,
    title: "Savings & Loans",
    desc: "Open savings accounts with interest or manage loan balances in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade Security",
    desc: "Row-Level Security, KYC verification, and encrypted document storage.",
  },
  {
    icon: LineChart,
    title: "Rich Insights",
    desc: "Filterable transaction history and a clear overview of every account.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Landmark className="h-6 w-6 text-primary" />
          Aegis Bank
        </Link>
        <nav className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login" className="btn-outline">
            Sign in
          </Link>
          <Link href="/register" className="btn-primary">
            Open account
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="py-20 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Lock className="h-3 w-3" /> Secured with Supabase Row-Level Security
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Banking that feels{" "}
            <span className="text-primary">effortless &amp; secure</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Open an account in minutes, transfer funds instantly, and track every
            transaction — all in one elegant, modern dashboard.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/register" className="btn-primary px-6 py-3 text-base">
              Get started free
            </Link>
            <Link href="/login" className="btn-outline px-6 py-3 text-base">
              I have an account
            </Link>
          </div>
        </section>

        <section className="grid gap-5 pb-24 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <f.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Aegis Bank — a portfolio demo. Not a real
        financial institution.
      </footer>
    </div>
  );
}
