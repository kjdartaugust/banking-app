import Link from "next/link";
import { ShieldCheck, Lock, Award, ArrowRight } from "lucide-react";
import { ChaseNav } from "@/components/home/chase-nav";
import { Hero } from "@/components/home/hero";
import { ChooseGrid } from "@/components/home/choose-grid";
import { EditorialSection } from "@/components/home/editorial-section";
import { SiteFooter } from "@/components/home/site-footer";
import { Reveal } from "@/components/home/reveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-chase-ink">
      <ChaseNav />
      <Hero />

      {/* Trust strip */}
      <div className="border-y border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 text-sm font-medium text-slate-600">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-chase-navy" /> Member FDIC
          </span>
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-chase-navy" /> 256-bit encryption
          </span>
          <span className="flex items-center gap-2">
            <Award className="h-4 w-4 text-chase-navy" /> Trusted by 60M+ customers
          </span>
        </div>
      </div>

      <ChooseGrid />

      <EditorialSection
        eyebrow="Investing by J.P. Morgan"
        heading="Grow your wealth with confidence"
        body="From self-directed investing to dedicated advisory, put a world-class team and a centuries-old institution behind every decision you make."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
        imageSide="left"
        highlights={[
          {
            title: "Self-Directed Investing",
            body: "Trade stocks, ETFs, and options with $0 commissions and intuitive tools.",
          },
          {
            title: "Personal Advisors",
            body: "Get a tailored plan built around your goals, reviewed by experts.",
          },
        ]}
        cta="Explore investing"
      />

      <EditorialSection
        eyebrow="Home Lending"
        heading="A home loan that feels like home"
        body="Competitive rates, transparent terms, and a guided process from pre-approval to closing — so you can move forward with certainty."
        image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
        imageSide="right"
        highlights={[
          {
            title: "Low fixed rates",
            body: "Lock in predictable monthly payments for the life of your loan.",
          },
          {
            title: "Dedicated specialists",
            body: "Work one-on-one with a lending advisor at every step.",
          },
        ]}
        cta="Explore home loans"
      />

      {/* Full-bleed editorial CTA */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-chase-navy/80" />
        <div className="mx-auto max-w-7xl px-6 py-24 text-center text-white">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-chase-gold">
              A relationship that lasts
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-5xl">
              Banking, lending, and investing — under one trusted roof
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
              Open your account in minutes and experience the standard set by the
              world&apos;s leading financial institutions.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-bold text-chase-navy transition hover:bg-chase-gold hover:text-white"
            >
              Open an account <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
