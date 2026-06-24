import Link from "next/link";
import {
  ShieldCheck,
  ArrowLeftRight,
  PiggyBank,
  LineChart,
  Lock,
  Landmark,
  BadgeCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroLoginCard } from "@/components/hero-login-card";

const features = [
  {
    icon: ArrowLeftRight,
    title: "Instant Transfers",
    desc: "Move money between accounts in real time with atomic, fully audited transactions.",
  },
  {
    icon: PiggyBank,
    title: "Savings & Loans",
    desc: "Grow savings at 3.5% APY or manage loan balances — all from one dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade Security",
    desc: "Row-Level Security, KYC verification, and encrypted document storage by default.",
  },
  {
    icon: LineChart,
    title: "Rich Insights",
    desc: "Filterable transaction history and a crystal-clear view of every account.",
  },
];

const stats = [
  { value: "$2.4T", label: "Assets under management" },
  { value: "60M+", label: "Customers worldwide" },
  { value: "4,700", label: "Branches & ATMs" },
  { value: "99.99%", label: "Platform uptime" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Landmark className="h-5 w-5" />
            </span>
            Aegis<span className="text-gold">Bank</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition hover:text-foreground">Personal</a>
            <a href="#features" className="transition hover:text-foreground">Business</a>
            <a href="#security" className="transition hover:text-foreground">Security</a>
            <a href="#about" className="transition hover:text-foreground">About</a>
          </nav>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link href="/login" className="btn-ghost hidden sm:inline-flex">Sign in</Link>
            <Link href="/register" className="btn-gold">Open account</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute -left-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="container-page relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="animate-fade-up">
            <div className="badge-trust mb-6">
              <BadgeCheck className="h-3.5 w-3.5 text-gold" />
              FDIC Insured · Member SIPC
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Banking built for the way you{" "}
              <span className="text-primary">live & grow</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Open an account in minutes, transfer funds instantly, and track every
              dollar — all wrapped in the security a Fortune 500 institution demands.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/register" className="btn-primary px-6 py-3 text-base">
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="btn-outline px-6 py-3 text-base">
                I have an account
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="badge-trust">
                <Lock className="h-3.5 w-3.5 text-primary" /> 256-bit encryption
              </span>
              <span className="badge-trust">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Row-Level Security
              </span>
              <span className="badge-trust">
                <Headphones className="h-3.5 w-3.5 text-primary" /> 24/7 support
              </span>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <HeroLoginCard />
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-navy-gradient text-white" id="about">
        <div className="container-page grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container-page py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Why Aegis
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you expect from a world-class bank
          </h2>
          <p className="mt-4 text-muted-foreground">
            Thoughtfully engineered features, secured down to the database row.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card card-hover p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-bold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Security CTA */}
      <section id="security" className="container-page pb-24">
        <div className="glass relative overflow-hidden p-10 text-center sm:p-16">
          <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
          <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight">
            Your money, protected by design
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every account is guarded by Postgres Row-Level Security and identity
            verification — so your data is never one bug away from exposure.
          </p>
          <Link href="/register" className="btn-primary mt-8 px-6 py-3 text-base">
            Open your account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Landmark className="h-5 w-5" />
              </span>
              Aegis<span className="text-gold">Bank</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A modern digital bank engineered for trust, speed, and clarity.
            </p>
          </div>
          {[
            { title: "Personal", links: ["Checking", "Savings", "Loans", "Transfers"] },
            { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Disclosures"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <span className="cursor-pointer transition hover:text-foreground">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Aegis Bank. A portfolio demo — not a real financial institution.</p>
            <p className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> Secured with bank-grade encryption
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
