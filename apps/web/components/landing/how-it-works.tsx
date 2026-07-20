"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FileText,
  LayoutGrid,
  Palette,
  BarChart3,
  Check,
  ChevronDown,
  GripVertical,
  Mail,
  Type,
  Hash,
  Star,
  Users,
  TrendingUp,
  Eye,
} from "lucide-react";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

/* ───────────── Step illustrations ───────────── */

/** Step 1 — Give Details */
function DetailsIllustration() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5 shadow-lg space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
        Form Details
      </p>
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-foreground">Form Title</label>
        <div className="rounded-lg border border-primary/50 bg-primary/5 px-3 py-2 text-xs text-foreground ring-1 ring-primary/20">
          Customer Feedback Survey
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-foreground">Description</label>
        <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground h-14 flex items-start">
          Help us improve by sharing your experience…
        </div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-muted-foreground">Visibility</span>
        <span className="rounded-full border border-primary/20 bg-primary/8 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
          Public
        </span>
      </div>
    </div>
  );
}

/** Step 2 — Add Fields */
function FieldsIllustration() {
  const fields = [
    { icon: <Type className="h-3 w-3" />, label: "Full Name", type: "text" },
    { icon: <Mail className="h-3 w-3" />, label: "Email Address", type: "email" },
    { icon: <Hash className="h-3 w-3" />, label: "Rating (1-10)", type: "number" },
    { icon: <Star className="h-3 w-3" />, label: "Overall Experience", type: "select" },
  ];
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5 shadow-lg space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        Form Fields
      </p>
      {fields.map((f, i) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 + 0.2 }}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2"
        >
          <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 flex-shrink-0" />
          <span className="text-muted-foreground flex-shrink-0">{f.icon}</span>
          <span className="flex-1 text-xs font-medium text-foreground truncate">{f.label}</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground capitalize">
            {f.type}
          </span>
        </motion.div>
      ))}
      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-primary font-medium cursor-pointer hover:text-primary/80 transition-colors">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">+</span>
        Add another field
      </div>
    </div>
  );
}

/** Step 3 — Configure Theme */
function ThemeIllustration() {
  const themes = [
    { name: "Clean Zen", primary: "#5f7d68", bg: "#f7f4ef", active: true },
    { name: "Cyber Sunset", primary: "#e84393", bg: "#0d0d1a" },
    { name: "Cherry Blossom", primary: "#d46090", bg: "#fff5f8" },
    { name: "Ocean Mist", primary: "#4a90b8", bg: "#f0f6fa" },
    { name: "Lavender Dream", primary: "#9b72cf", bg: "#f8f4ff" },
  ];
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5 shadow-lg space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        Choose Theme
      </p>
      <div className="grid grid-cols-5 gap-2">
        {themes.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-1.5">
            <div
              className={`h-10 w-10 rounded-xl border-2 transition-all duration-200 ${
                t.active ? "border-primary shadow-md shadow-primary/30 scale-110" : "border-border"
              }`}
              style={{ background: t.bg }}
            >
              <div
                className="m-1.5 h-2 rounded-full"
                style={{ background: t.primary }}
              />
              <div
                className="mx-1.5 h-1 rounded-full opacity-50"
                style={{ background: t.primary }}
              />
            </div>
            {t.active && (
              <span className="text-[9px] font-semibold text-primary">Active</span>
            )}
          </div>
        ))}
      </div>
      {/* Preview strip */}
      <div className="mt-2 rounded-xl border border-primary/20 bg-[#f7f4ef] p-3">
        <div className="h-2 w-24 rounded-full bg-[#5f7d68] mb-2" />
        <div className="h-1.5 w-full rounded-full bg-[#5f7d68]/20 mb-1" />
        <div className="h-1.5 w-3/4 rounded-full bg-[#5f7d68]/20" />
        <div className="mt-3 h-6 w-20 rounded-lg bg-[#5f7d68] flex items-center justify-center">
          <span className="text-[9px] font-semibold text-white">Submit</span>
        </div>
      </div>
    </div>
  );
}

/** Step 4 — Collect Responses */
function ResponsesIllustration() {
  const stats = [
    { label: "Total Responses", value: "1,284", icon: <Users className="h-3.5 w-3.5" />, color: "text-primary" },
    { label: "Completion Rate", value: "87%", icon: <TrendingUp className="h-3.5 w-3.5" />, color: "text-green-600 dark:text-green-400" },
    { label: "Views", value: "3,901", icon: <Eye className="h-3.5 w-3.5" />, color: "text-blue-500" },
  ];
  const bars = [45, 72, 58, 90, 67, 83, 76];

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5 shadow-lg space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Response Analytics
      </p>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-background p-2.5 text-center">
            <span className={`${s.color}`}>{s.icon}</span>
            <p className="mt-1 text-sm font-bold text-foreground">{s.value}</p>
            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-2">Responses this week</p>
        <div className="flex items-end gap-1.5 h-12">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-sm bg-primary/70"
              style={{ height: `${h}%` }}
              initial={{ scaleY: 0, originY: 1 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 + 0.3, duration: 0.4 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Step card ───────────── */
const steps = [
  {
    number: "01",
    icon: <FileText className="h-5 w-5" />,
    title: "Give Details",
    description:
      "Name your form, add a description, and choose who can see it — public, unlisted, or private.",
    illustration: <DetailsIllustration />,
  },
  {
    number: "02",
    icon: <LayoutGrid className="h-5 w-5" />,
    title: "Add Fields",
    description:
      "Drag-and-drop fields into your form — text, email, number, select, radio, checkbox, and more.",
    illustration: <FieldsIllustration />,
  },
  {
    number: "03",
    icon: <Palette className="h-5 w-5" />,
    title: "Configure Theme",
    description:
      "Pick one of five stunning animated themes to match your brand and delight your respondents.",
    illustration: <ThemeIllustration />,
  },
  {
    number: "04",
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Collect Responses",
    description:
      "Share your form link and watch responses roll in. Real-time analytics show completion rates and trends.",
    illustration: <ResponsesIllustration />,
  },
];

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full h-12 md:h-16 w-px bg-gradient-to-b from-border to-transparent z-0 hidden md:block" />
      )}

      <div
        className={`flex flex-col items-center gap-8 md:gap-12 ${
          isEven ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Text side */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Step number + icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
              {step.icon}
            </div>
            <span className="text-4xl font-bold text-border select-none" style={serif}>
              {step.number}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl text-foreground" style={serif}>
            {step.title}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
            {step.description}
          </p>

          {/* Check list */}
          <ul className="mt-4 space-y-1.5">
            {getChecklist(index).map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-2.5 w-2.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Illustration side */}
        <motion.div
          className="flex-1 w-full max-w-xs md:max-w-sm"
          initial={{ opacity: 0, x: isEven ? -24 : 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {step.illustration}
        </motion.div>
      </div>
    </motion.div>
  );
}

function getChecklist(index: number): string[] {
  const checklists: string[][] = [
    ["Custom title & description", "Set visibility (public / unlisted / private)", "Auto-generated shareable slug"],
    ["10 field types available", "Drag to reorder instantly", "Field validation & required toggle"],
    ["5 animated themes", "Live theme preview", "Matches your brand perfectly"],
    ["Real-time response tracking", "Completion rate analytics", "Weekly trends & charts"],
  ];
  return checklists[index] ?? [];
}

/* ───────────── Main Section ───────────── */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How it works
          </motion.p>
          <motion.h2
            className="mt-4 text-4xl tracking-[-0.02em] text-foreground md:text-5xl"
            style={serif}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            From idea to live form in minutes
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Four simple steps — no code, no fuss.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-20 md:space-y-28">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
