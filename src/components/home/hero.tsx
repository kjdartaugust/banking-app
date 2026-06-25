import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NexusLoginPanel } from "@/components/home/nexus-login-panel";
import { NexusCard3D } from "@/components/home/nexus-card-3d";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-nexus-navy">
      {/* Lifestyle background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-nexus-navy via-nexus-navy/95 to-nexus-cobalt/40" />
      <div className="absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-nexus-cobalt/30 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        {/* Left: promo + 3D card */}
        <div className="text-white">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-nexus-aqua ring-1 ring-white/15">
            Welcome bonus · Limited time
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Earn <span className="text-nexus-aqua">$300</span> when banking
            finally works for you
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/75">
            Open a Nexus Premier Checking account, set up direct deposit, and get
            rewarded from day one — with tools designed around how you actually live.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-nexus-cobalt px-6 py-3 text-sm font-bold text-white shadow-lg shadow-nexus-cobalt/30 transition hover:brightness-110"
            >
              Open an account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="rounded-lg px-5 py-3 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-white/10"
            >
              See offer details
            </Link>
          </div>

          <div className="mt-12">
            <NexusCard3D />
          </div>
        </div>

        {/* Right: floating login panel */}
        <div className="flex justify-center lg:justify-end">
          <div className="animate-float">
            <NexusLoginPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
