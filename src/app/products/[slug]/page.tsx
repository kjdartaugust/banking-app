import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { products, productBySlug } from "@/lib/products";
import { NexusNav } from "@/components/home/nexus-nav";
import { SiteFooter } from "@/components/home/site-footer";
import { Reveal } from "@/components/home/reveal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = productBySlug(params.slug);
  return {
    title: product ? `${product.title} — Nexus Bank` : "Nexus Bank",
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white font-sans text-nexus-ink">
      <NexusNav />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-nexus-navy">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-nexus-navy via-nexus-navy/95 to-nexus-cobalt/40" />
        <div className="mx-auto max-w-7xl px-6 py-20 text-white lg:py-28">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-nexus-aqua">
              {product.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              {product.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">{product.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-lg bg-nexus-cobalt px-6 py-3 text-sm font-bold text-white shadow-lg shadow-nexus-cobalt/30 transition hover:brightness-110"
              >
                {product.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="rounded-lg px-5 py-3 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-b border-slate-100 bg-nexus-mist">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-6 px-6 py-8">
          {product.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-extrabold tracking-tight text-nexus-navy sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Intro + features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-xl leading-relaxed text-slate-600">
            {product.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {product.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-slate-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-nexus-cobalt/30 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-nexus-navy text-white">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-nexus-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-nexus-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center text-white">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Open your account in minutes — verification unlocks every feature, plus
              your welcome bonus.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-nexus-aqua" /> No hidden fees
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-nexus-aqua" /> Bank-grade security
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-nexus-aqua" /> Open in minutes
              </span>
            </div>
            <Link
              href="/get-started"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-nexus-navy transition hover:bg-nexus-aqua hover:text-white"
            >
              {product.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
