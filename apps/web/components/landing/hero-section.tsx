"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const words = ["beautiful", "intuitive", "engaging"];

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

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

export function Hero() {
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
