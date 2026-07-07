"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

const STAT_ITEMS = [
  { value: "10K+", label: "Teams worldwide" },
  { value: "2M+", label: "Responses collected" },
  { value: "99.9%", label: "Uptime SLA" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-24 md:pt-36 md:pb-32">
      {/* Background ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-secondary/60 blur-[80px]" />
        <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-primary/6 blur-[80px]" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            The modern form builder for SaaS teams
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mt-7 text-balance text-5xl leading-[1.04] tracking-[-0.025em] text-foreground md:text-7xl"
          style={serif}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Build forms your{" "}
          <em className="not-italic text-primary">users love</em>{" "}
          to fill.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Kanso lets you drag, drop, and deploy beautiful forms in minutes —
          with real-time analytics, custom themes, and zero-friction sharing
          built right in.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="/sign-up"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:gap-3"
          >
            Start Building — it's free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-secondary/60"
          >
            Explore features
          </a>
        </motion.div>

        <motion.p
          className="mt-4 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          No credit card required · Free forever plan · Cancel anytime
        </motion.p>

        {/* Stats strip */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {STAT_ITEMS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span
                className="text-2xl font-bold tracking-tight text-foreground"
                style={serif}
              >
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
