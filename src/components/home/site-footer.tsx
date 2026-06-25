import Link from "next/link";
import { OctagonLogo } from "@/components/home/octagon-logo";

const columns = [
  { title: "Banking", links: ["Checking", "Savings & CDs", "Credit Cards", "Auto"] },
  { title: "Lending", links: ["Home Loans", "Refinance", "Personal Loans", "Business"] },
  { title: "Invest", links: ["Self-directed", "Advisory", "Retirement", "Travel"] },
  { title: "Company", links: ["About", "Careers", "Newsroom", "Privacy"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-chase-ink text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <OctagonLogo className="h-8 w-8" />
              <span className="text-lg font-extrabold tracking-[0.2em]">CHASE</span>
            </div>
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
            © {new Date().getFullYear()} Aegis Bank — a portfolio demo styled after
            Chase / J.P. Morgan. Not affiliated with JPMorgan Chase &amp; Co. Deposit
            products provided by the demo, Member FDIC (illustrative).
          </p>
        </div>
      </div>
    </footer>
  );
}
