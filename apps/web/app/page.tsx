"use client";

import * as React from "react";
import { ArrowRight, Zap, BarChart3, Share2, LayoutGrid, Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky z-50 mx-auto w-full max-w-5xl px-4 transition-all duration-500",
        scrolled ? "top-3" : "top-4",
      )}
    >
      <nav
        className={cn(
          "group flex items-center justify-between rounded-full border px-3 py-2 transition-all duration-500",
          scrolled
            ? "border-border bg-background/90 shadow-[0_8px_32px_-12px_rgba(40,60,40,0.25)] backdrop-blur-xl"
            : "border-border/70 bg-background/70 shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(40,60,40,0.15)] backdrop-blur-md",
          "hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_16px_40px_-12px_rgba(40,60,40,0.25)] hover:border-border",
        )}
      >
        <a
          href="/"
          className="flex items-center gap-2 pl-2 transition-transform duration-300 hover:scale-105"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-[13px] font-semibold transition-transform duration-500 group-hover:rotate-[8deg]"
            style={serif}
          >
            K
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">Kanso</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {["Features", "Explore", "Pricing", "API Docs"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <a
            href="#login"
            className="hidden rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground sm:inline-flex"
          >
            Log in
          </a>
          <a
            href="#start"
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:gap-2.5 hover:shadow-[0_8px_20px_-8px_rgba(40,60,40,0.4)]"
          >
            Get Started
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const fields = ["Short Text", "Email", "Multiple Choice", "Rating", "Date", "File Upload"];
  return (
    <section className="relative px-4 pt-16 pb-24 md:pt-20 md:pb-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Trusted by 10,000+ teams worldwide
        </span>
        <h1
          className="mt-6 text-balance text-5xl leading-[1.05] tracking-[-0.02em] text-foreground md:text-7xl"
          style={serif}
        >
          Less <em className="not-italic text-primary">friction.</em>
          <br className="hidden sm:block" /> More responses.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Thoughtfully designed forms that feel effortless to complete and powerful to manage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#start"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_-12px_rgba(40,60,40,0.45)]"
          >
            Start Building Free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            See it in action
          </a>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          No credit card required · Free forever plan
        </p>
      </div>

      {/* Integrated builder preview */}
      <div id="showcase" className="mx-auto mt-16 max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(40,60,40,0.25)]">
          <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.13_30)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.84_0.13_85)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.1_150)]" />
            </div>
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
              app.kanso.io/forms/abcdef
            </span>
            <span className="w-16" />
          </div>
          <div className="grid grid-cols-12">
            <aside className="col-span-12 border-b border-border p-5 md:col-span-3 md:border-b-0 md:border-r">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Fields
              </p>
              <ul className="mt-4 space-y-1.5">
                {fields.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary/60" />
                    {f}
                  </li>
                ))}
              </ul>
            </aside>
            <div className="col-span-12 p-6 md:col-span-9">
              <div className="rounded-xl border border-border bg-background p-5 text-left">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg text-foreground" style={serif}>
                      Customer Feedback Survey
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Help us improve — takes under a minute.
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                    Live draft
                  </span>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Field label="Full Name *" filled />
                  <Field label="Email Address *" />
                </div>
                <div className="mt-4">
                  <p className="text-xs text-foreground">How satisfied are you with our service?</p>
                  <div className="mt-1.5 flex gap-1 text-primary">
                    {"★★★★☆".split("").map((s, i) => (
                      <span key={i} className={i < 4 ? "" : "text-muted-foreground/40"}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, filled }: { label: string; filled?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs text-foreground">{label}</span>
      <div
        className={`mt-1.5 h-9 rounded-md border bg-background px-3 ${
          filled ? "border-primary/60 ring-2 ring-primary/15" : "border-border"
        }`}
      />
    </label>
  );
}

function Features() {
  return (
    <section id="features" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Features
          </p>
          <h2
            className="mt-4 text-4xl tracking-[-0.02em] text-foreground md:text-5xl"
            style={serif}
          >
            Everything you need, nothing you don't
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
            Powerful capabilities wrapped in a calm, intuitive interface.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Big feature */}
          <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:border-primary/40 md:col-span-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-2xl text-foreground" style={serif}>
              Drag & drop builder
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Compose beautiful layouts visually. No code. Snap fields, reorder sections, and watch
              the form come together in real time.
            </p>
          </div>

          {/* Analytics */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-medium text-foreground">Live analytics</h3>
            <div className="mt-4 flex h-16 items-end gap-1.5">
              {[40, 60, 35, 75, 55, 90, 70].map((h, i) => (
                <span
                  key={i}
                  className="w-full rounded-sm bg-primary/70 transition-all duration-500 group-hover:bg-primary"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Smart Logic */}
          <div className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
              <Zap className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-medium text-foreground">Smart logic</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Branch by response. Skip, show, hide — without writing a single rule by hand.
            </p>
          </div>

          {/* Sharing */}
          <div className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
              <Share2 className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-medium text-foreground">Share anywhere</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Links, embeds, QR codes. Reach respondents wherever they already are.
            </p>
          </div>

          {/* Branding */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
              <Palette className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-medium text-foreground">Custom branding</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Match your identity perfectly with design themes, typography, and color overrides.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "oklch(0.42 0.045 150)",
                "oklch(0.94 0.015 95)",
                "oklch(0.78 0.13 30)",
                "oklch(0.84 0.13 85)",
              ].map((c) => (
                <span
                  key={c}
                  className="h-6 w-6 rounded-full border border-border transition-transform duration-300 hover:scale-110"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Free",
      tagline: "Perfect for getting started",
      price: "$0",
      period: "/month",
      features: [
        "Up to 3 forms",
        "100 responses/month",
        "Basic analytics",
        "Email notifications",
        "Kanso branding",
      ],
      cta: "Get Started Free",
    },
    {
      name: "Pro",
      tagline: "For growing teams",
      price: "$29",
      period: "/month",
      featured: true,
      features: [
        "Unlimited forms",
        "10,000 responses/month",
        "Advanced analytics",
        "Custom branding",
        "File uploads",
        "Priority support",
        "Integrations",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      tagline: "For large organizations",
      price: "Custom",
      period: "",
      features: [
        "Unlimited everything",
        "Custom integrations",
        "SSO & SAML",
        "Dedicated support",
        "SLA guarantee",
        "Custom contracts",
        "On-premise option",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="bg-secondary/40 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Pricing
          </p>
          <h2
            className="mt-4 text-4xl tracking-[-0.02em] text-foreground md:text-5xl"
            style={serif}
          >
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                t.featured
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_30px_80px_-40px_rgba(40,60,40,0.45)]"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-background">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl" style={serif}>
                {t.name}
              </h3>
              <p
                className={`mt-1 text-sm ${t.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}
              >
                {t.tagline}
              </p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl tracking-tight" style={serif}>
                  {t.price}
                </span>
                {t.period && (
                  <span
                    className={`pb-1.5 text-sm ${t.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}
                  >
                    {t.period}
                  </span>
                )}
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-primary-foreground" : "text-primary"}`}
                    />
                    <span
                      className={t.featured ? "text-primary-foreground/90" : "text-foreground/90"}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#start"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  t.featured
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <span
            className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground text-sm font-semibold"
            style={serif}
          >
            K
          </span>
          <span className="text-base font-medium text-foreground">Kanso</span>
        </div>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          Less friction. More responses.
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {["Features", "Pricing", "Docs", "Login"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-foreground">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 h-px w-full max-w-md bg-border" />
        <p className="mt-5 text-xs text-muted-foreground">© 2026 Kanso. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background font-[Inter,system-ui,sans-serif] text-foreground antialiased">
      <div className="pt-4">
        <Nav />
      </div>
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
