"use client";

import { Zap, BarChart3, Palette, Share2, LayoutGrid } from "lucide-react";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export function Features() {
  return (
    <section id="features" className="px-4 pt-24 pb:16 md:pt-32 md:pb:16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Features
          </p>
          <h2
            className="mt-4 text-4xl tracking-[-0.02em] text-foreground md:text-5xl"
            style={serif}
          >
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
            Powerful capabilities wrapped in a calm, intuitive interface.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* 1. Custom Branding (Prioritized, 2 cols) */}
          <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:border-primary/40 md:col-span-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-2xl text-foreground" style={serif}>
              Custom branding & themes
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Match your identity perfectly with our advanced theme engine. Customize colors, typography, and visual aesthetics.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 absolute right-7 bottom-7">
              {[
                "oklch(0.42 0.045 150)",
                "oklch(0.94 0.015 95)",
                "oklch(0.78 0.13 30)",
                "oklch(0.84 0.13 85)",
              ].map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full border border-border transition-transform duration-300 hover:scale-110 shadow-sm"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          {/* 2. Live Analytics (Prioritized, 1 col) */}
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

          {/* 3. Drag & Drop (1 col) */}
          <div className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-medium text-foreground">Drag & drop</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Compose forms visually. No code needed to build complex layouts.
            </p>
          </div>

          {/* 4. Smart Logic (1 col) */}
          <div className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
              <Zap className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-medium text-foreground">Smart logic</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Branch by response. Skip, show, hide — without writing a single rule.
            </p>
          </div>

          {/* 5. Share Anywhere (1 col) */}
          <div className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
              <Share2 className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-medium text-foreground">Share anywhere</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Links, embeds, QR codes. Reach respondents wherever they already are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
