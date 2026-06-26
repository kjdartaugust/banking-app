import Link from "next/link";
import { NexusLogo } from "@/components/home/nexus-logo";

const columns = [
  { title: "Banking", links: ["Checking", "Savings & CDs", "Credit Cards", "Auto"] },
  { title: "Lending", links: ["Home Loans", "Refinance", "Personal Loans", "Business"] },
  { title: "Invest", links: ["Self-directed", "Advisory", "Retirement", "Travel"] },
  { title: "Company", links: ["About", "Careers", "Newsroom", "Privacy"] },
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
                  <li key={l}>
                    <Link href="/register" className="transition hover:text-white">
                      {l}
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
