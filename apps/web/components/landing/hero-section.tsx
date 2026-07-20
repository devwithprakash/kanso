"use client";

import {
  ArrowRight,
  Sparkles,
  Check,
  ChevronDown,
  GripVertical,
  Mail,
  Type,
  Hash,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

function MockFormCard() {
  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-primary/20 blur-3xl scale-110 -z-10"
      />

      <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-secondary/30">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          <span className="ml-2 text-xs font-medium text-muted-foreground">Contact Form</span>
        </div>

        <div className="p-5 space-y-3">
          <MockField
            icon={<Type className="h-3 w-3" />}
            label="Full Name"
            placeholder="Enter your full name"
            delay={0.6}
          />
          <MockField
            icon={<Mail className="h-3 w-3" />}
            label="Email Address"
            placeholder="hello@example.com"
            delay={0.7}
            active
          />
          <MockSelectField delay={0.8} />
          <MockField
            icon={<Calendar className="h-3 w-3" />}
            label="Preferred Date"
            placeholder="DD / MM / YYYY"
            delay={0.85}
          />

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="mt-1 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors"
          >
            Submit Response
          </motion.button>
        </div>
      </div>

      <FloatingBadge
        className="absolute -top-4 -right-6 md:-right-10"
        delay={1.1}
        content={
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-2.5 w-2.5" />
            </span>
            128 Responses today
          </span>
        }
      />
      <FloatingBadge
        className="absolute -bottom-4 -left-6 md:-left-10"
        delay={1.2}
        content={
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Live & Collecting
          </span>
        }
      />
    </motion.div>
  );
}

function MockField({
  icon,
  label,
  placeholder,
  delay,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  delay: number;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-[11px] font-medium text-foreground">{label}</span>
      </div>
      <div
        className={`flex items-center rounded-lg border px-3 py-2 text-xs text-muted-foreground transition-colors ${
          active
            ? "border-primary/60 bg-primary/5 ring-1 ring-primary/20"
            : "border-border bg-background"
        }`}
      >
        {placeholder}
      </div>
    </motion.div>
  );
}

function MockSelectField({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Hash className="h-3 w-3 text-muted-foreground" />
        <span className="text-[11px] font-medium text-foreground">Department</span>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground">
        <span>Product Design</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </div>
    </motion.div>
  );
}

function FloatingBadge({
  content,
  className,
  delay,
}: {
  content: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`rounded-xl border border-border bg-card/90 backdrop-blur-sm px-3 py-2 shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, type: "spring", stiffness: 200 }}
    >
      {content}
    </motion.div>
  );
}

function FieldChip({
  label,
  icon,
  className,
  delay,
}: {
  label: string;
  icon: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute hidden lg:flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <GripVertical className="h-3 w-3 opacity-40" />
      {icon}
      {label}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-20 md:pt-36 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute top-40 -right-24 h-96 w-96 rounded-full bg-secondary/70 blur-[90px]" />
        <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-primary/8 blur-[90px]" />
      </div>

      <FieldChip
        label="Text Input"
        icon={<Type className="h-3 w-3" />}
        className="top-40 left-8 xl:left-24"
        delay={1.3}
      />
      <FieldChip
        label="Email"
        icon={<Mail className="h-3 w-3" />}
        className="top-64 left-4 xl:left-16"
        delay={1.5}
      />
      <FieldChip
        label="Number"
        icon={<Hash className="h-3 w-3" />}
        className="top-52 right-6 xl:right-20"
        delay={1.4}
      />
      <FieldChip
        label="Date"
        icon={<Calendar className="h-3 w-3" />}
        className="top-80 right-2 xl:right-12"
        delay={1.6}
      />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-1">
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

            <motion.h1
              className="mt-7 text-balance text-5xl leading-[1.04] tracking-[-0.025em] text-foreground md:text-6xl xl:text-7xl"
              style={serif}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Build forms your <em className="not-italic text-primary">users love</em> to fill.
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Create beautiful forms with animated themes, drag-and-drop fields, and real-time
              analytics — all in one place.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="/sign-up"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:gap-3"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-secondary/60"
              >
                See how it works
              </a>
            </motion.div>
          </div>

          <div className="relative w-full lg:flex-1 flex justify-center">
            <MockFormCard />
          </div>
        </div>
      </div>
    </section>
  );
}
