import Link from "next/link";
import { NexusLogo } from "@/components/home/nexus-logo";

const columns = [
  {
    title: "Banking",
    links: [
      { label: "Checking", href: "/products/checking" },
      { label: "Savings & CDs", href: "/products/savings" },
      { label: "Credit Cards", href: "/products/credit-cards" },
      { label: "Auto", href: "/products/auto" },
    ],
  },
  {
    title: "Lending",
    links: [
      { label: "Home Loans", href: "/products/home-loans" },
      { label: "Refinance", href: "/products/home-loans" },
      { label: "Auto Loans", href: "/products/auto" },
      { label: "Investing", href: "/products/investing" },
    ],
  },
  {
    title: "Invest & Travel",
    links: [
      { label: "Self-directed", href: "/products/investing" },
      { label: "Advisory", href: "/products/investing" },
      { label: "Travel rewards", href: "/products/travel" },
      { label: "Credit cards", href: "/products/credit-cards" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Customer Service", href: "/support" },
      { label: "Schedule a meeting", href: "/schedule" },
      { label: "Open an account", href: "/register" },
      { label: "Sign in", href: "/login" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-nexus-ink text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white transition-opacity hover:opacity-80">
              <NexusLogo className="h-8 w-8 text-nexus-cobalt" />
              <span className="text-lg font-extrabold tracking-[0.18em]">NEXUS</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Modern digital banking engineered for trust, speed, and clarity.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Nexus Bank — a portfolio demo. Not a real
            financial institution; all figures are illustrative. Member FDIC
            (illustrative).
          </p>
        </div>
      </div>
    </footer>
  );
}
