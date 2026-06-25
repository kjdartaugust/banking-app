import Link from "next/link";
import { ArrowRight, Wifi } from "lucide-react";
import { OctagonLogo } from "@/components/home/octagon-logo";
import { ChaseLoginPanel } from "@/components/home/chase-login-panel";

function CreditCardVisual() {
  return (
    <div className="relative ml-auto h-44 w-72 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-chase-navy via-[#0a3f9c] to-chase-blue p-4 text-white shadow-xl">
      <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
      <div className="flex items-center justify-between">
        <OctagonLogo className="h-6 w-6" />
        <Wifi className="h-5 w-5 rotate-90 opacity-80" />
      </div>
      <div className="mt-5 h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400/80" />
      <p className="mt-4 font-mono text-sm tracking-[0.2em] text-white/90">
        5421 •••• •••• 0087
      </p>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-[10px] uppercase tracking-widest text-white/70">
          Sapphire®
        </span>
        <span className="text-sm font-bold tracking-[0.15em]">CHASE</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Lifestyle background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/70 to-chase-navy/30" />

      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-8 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        {/* Promo card */}
        <div className="max-w-xl rounded-2xl bg-white/95 p-8 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <span className="inline-block rounded-full bg-chase-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-chase-gold">
            Limited-time offer
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-chase-ink sm:text-5xl">
            Earn <span className="text-chase-navy">$300</span>
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            when you open a new Chase Total Checking® account and set up direct
            deposit. Banking that rewards you from day one.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-md bg-chase-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-chase-blue"
            >
              Open an account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="text-sm font-bold text-chase-blue hover:underline"
            >
              See offer details
            </Link>
          </div>
          <div className="mt-8">
            <CreditCardVisual />
          </div>
        </div>

        {/* Floating login panel */}
        <div className="lg:pl-8">
          <ChaseLoginPanel />
        </div>
      </div>
    </section>
  );
}
