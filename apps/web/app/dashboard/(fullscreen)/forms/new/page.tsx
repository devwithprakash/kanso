"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  X,
  Type,
  AlignLeft,
  Mail,
  Hash,
  ListChecks,
  Calendar,
  Copy,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

type FieldType = "shorttext" | "longtext" | "email" | "number" | "dropdown";

type Field = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  maxLength?: number;
  pattern?: string;
  options?: string[];
};

const FIELD_META: Record<
  FieldType,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  shorttext: { label: "Short Text", icon: Type },
  longtext: { label: "Long Text", icon: AlignLeft },
  email: { label: "Email", icon: Mail },
  number: { label: "Number", icon: Hash },
  dropdown: { label: "Dropdown", icon: ListChecks },
};

type ThemeKey = "clean-zen" | "cherry-blossum" | "cyber-sunset" | "forest-slate";
const THEMES: Record<ThemeKey, { name: string; swatch: string; bg: string; accent: string }> = {
  "clean-zen": {
    name: "Clean Zen",
    swatch: "bg-[oklch(0.42_0.045_150)]",
    bg: "bg-[oklch(0.97_0.012_120)]",
    accent: "text-[oklch(0.42_0.045_150)]",
  },
  "cherry-blossum": {
    name: "Cherry-Blossum",
    swatch: "bg-[oklch(0.85_0.04_75)]",
    bg: "bg-[oklch(0.98_0.02_85)]",
    accent: "text-[oklch(0.45_0.06_60)]",
  },
  "cyber-sunset": {
    name: "Cyber Sunset",
    swatch: "bg-[oklch(0.78_0.08_15)]",
    bg: "bg-[oklch(0.97_0.015_20)]",
    accent: "text-[oklch(0.45_0.08_15)]",
  },
  "forest-slate": {
    name: "Forest Slate",
    swatch: "bg-[oklch(0.72_0.09_230)]",
    bg: "bg-[oklch(0.97_0.015_230)]",
    accent: "text-[oklch(0.42_0.08_240)]",
  },
};

const STEPS = ["Details", "Fields", "Configure", "Preview"] as const;
type StepIdx = 0 | 1 | 2 | 3;

let idCounter = 0;
const nid = () => `f${++idCounter}`;

export default function FormEditPage() {
  const [step, setStep] = React.useState<StepIdx>(0);
  const [title, setTitle] = React.useState("Feedback form");
  const [description, setDescription] = React.useState("");
  const [fields, setFields] = React.useState<Field[]>([
    { id: nid(), type: "shorttext", label: "Name", placeholder: "Your name", required: true },
  ]);
  const [theme, setTheme] = React.useState<ThemeKey>("clean-zen");
  const [visibility, setVisibility] = React.useState<"public" | "unlisted">("public");
  const [responseLimit, setResponseLimit] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const openAdd = () => {
    setEditingId(null);
    setModalOpen(true);
  };
  const openEdit = (id: string) => {
    setEditingId(id);
    setModalOpen(true);
  };
  const remove = (id: string) => setFields((f) => f.filter((x) => x.id !== id));
  const move = (id: string, dir: -1 | 1) =>
    setFields((arr) => {
      const i = arr.indexOf(arr.find((x) => x.id === id)!);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= arr.length) return arr;
      const copy = arr.slice();
      // @ts-ignore
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  const upsertField = (data: Field) => {
    setFields((arr) => {
      const idx = arr.findIndex((x) => x.id === data.id);
      if (idx === -1) return [...arr, data];
      const c = arr.slice();
      c[idx] = data;
      return c;
    });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const canNext = step === 0 ? title.trim().length > 0 : step === 1 ? fields.length > 0 : true;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient background — same warm zen wash as landing */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_0%,oklch(0.92_0.03_120/0.6),transparent_60%),radial-gradient(50%_35%_at_80%_10%,oklch(0.9_0.04_75/0.55),transparent_60%)]" />
      </div>

      <TopBar />

      <main className="mx-auto w-full max-w-4xl px-4 pb-24 pt-24 sm:pt-28">
        <Stepper step={step} onGo={(s) => setStep(s)} />

        <section className="mt-10 sm:mt-14">
          <div className="text-center">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Step {step + 1} of {STEPS.length}
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-medium text-foreground" style={serif}>
              {STEPS[step]}
            </h1>
          </div>

          <div className="mx-auto mt-8 sm:mt-10 max-w-2xl">
            {step === 0 && (
              <DetailsStep
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
              />
            )}
            {step === 1 && (
              <FieldsStep
                fields={fields}
                onAdd={openAdd}
                onEdit={openEdit}
                onRemove={remove}
                onMove={move}
              />
            )}
            {step === 2 && (
              <ConfigureStep
                theme={theme}
                setTheme={setTheme}
                visibility={visibility}
                setVisibility={setVisibility}
                responseLimit={responseLimit}
                setResponseLimit={setResponseLimit}
                expiry={expiry}
                setExpiry={setExpiry}
                onCopy={copyLink}
                copied={copied}
              />
            )}
            {step === 3 && (
              <PreviewStep title={title} description={description} fields={fields} theme={theme} />
            )}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-6">
            <button
              onClick={() =>
                step === 0 ? window.history.back() : setStep((s) => (s - 1) as StepIdx)
              }
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                disabled={!canNext}
                onClick={() => setStep((s) => (s + 1) as StepIdx)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.42_0.045_150/0.5)] transition-all",
                  "hover:shadow-[0_12px_32px_-8px_oklch(0.42_0.045_150/0.6)] hover:-translate-y-px",
                  !canNext && "opacity-50 cursor-not-allowed hover:translate-y-0",
                )}
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.42_0.045_150/0.5)] hover:-translate-y-px transition-all">
                <Check className="h-4 w-4" /> Publish form
              </button>
            )}
          </div>
        </section>
      </main>

      {modalOpen && (
        <FieldModal
          existing={editingId ? (fields.find((f) => f.id === editingId) ?? null) : null}
          onClose={() => setModalOpen(false)}
          onSave={(f) => {
            upsertField(f);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

function TopBar() {
  return (
    <header className="fixed inset-x-0 top-3 z-40 mx-auto w-full max-w-5xl px-4">
      <nav className="flex items-center justify-between rounded-full border border-border/70 bg-background/70 px-3 py-2 backdrop-blur-md backdrop-saturate-150 shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(40,60,40,0.15)]">
        <Link href="/" className="flex items-center gap-2 pl-2">
          <span
            className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-[13px] font-semibold"
            style={serif}
          >
            K
          </span>
          <span className="text-sm font-medium tracking-tight">Kanso</span>
        </Link>
        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
          <button className="rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:-translate-y-px transition-transform">
            Save
          </button>
        </div>
      </nav>
    </header>
  );
}

function Stepper({ step, onGo }: { step: StepIdx; onGo: (s: StepIdx) => void }) {
  return (
    <ol className="mx-auto flex w-full max-w-3xl items-center gap-1 sm:gap-2">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <React.Fragment key={label}>
            <li className="flex min-w-0 items-center gap-2">
              <button
                onClick={() => i <= step && onGo(i as StepIdx)}
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-medium transition-all",
                  active &&
                    "border-primary bg-primary text-primary-foreground shadow-[0_0_0_4px_oklch(0.42_0.045_150/0.15)]",
                  done && "border-primary/60 bg-primary/10 text-primary",
                  !active && !done && "border-border bg-background text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </button>
              <span
                className={cn(
                  "hidden sm:inline text-sm truncate",
                  active
                    ? "font-medium text-foreground"
                    : done
                      ? "text-foreground/80"
                      : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </li>
            {i < STEPS.length - 1 && (
              <li
                aria-hidden
                className={cn("h-px flex-1", i < step ? "bg-primary/50" : "bg-border")}
              />
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}

/* ---------- Steps ---------- */

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 flex items-center gap-1 text-sm text-foreground/80">
      {children}
      {required && <span className="text-[oklch(0.55_0.18_25)]">*</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10";

function DetailsStep(props: {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label required>Form title</Label>
        <input
          className={inputCls}
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          placeholder="e.g. Customer feedback"
        />
      </div>
      <div>
        <Label>Description</Label>
        <textarea
          rows={4}
          className={cn(inputCls, "resize-none")}
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          placeholder="Optional description or instructions…"
        />
      </div>
    </div>
  );
}

function FieldsStep({
  fields,
  onAdd,
  onEdit,
  onRemove,
  onMove,
}: {
  fields: Field[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
}) {
  return (
    <div className="space-y-3">
      {fields.map((f, i) => {
        const Icon = FIELD_META[f.type].icon;
        return (
          <div
            key={f.id}
            className="group grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card/70 px-3 py-3 shadow-sm transition-all hover:border-primary/40 hover:shadow-[0_8px_24px_-16px_oklch(0.42_0.045_150/0.4)]"
          >
            <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/60" />
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-foreground">
                {f.label || "Untitled"}
                {f.required && <span className="ml-1 text-[oklch(0.55_0.18_25)]">*</span>}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {FIELD_META[f.type].label}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              <div className="flex flex-col">
                <button
                  onClick={() => onMove(f.id, -1)}
                  disabled={i === 0}
                  className="p-1 text-muted-foreground/70 hover:text-foreground disabled:opacity-30"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onMove(f.id, 1)}
                  disabled={i === fields.length - 1}
                  className="p-1 text-muted-foreground/70 hover:text-foreground disabled:opacity-30"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={() => onEdit(f.id)}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => onRemove(f.id)}
                className="rounded-full p-2 text-muted-foreground hover:bg-[oklch(0.95_0.03_25)] hover:text-[oklch(0.5_0.18_25)] transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}

      <button
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-transparent px-4 py-4 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
      >
        <Plus className="h-4 w-4" /> Add field
      </button>
    </div>
  );
}

function ConfigureStep(props: {
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
  visibility: "public" | "unlisted";
  setVisibility: (v: "public" | "unlisted") => void;
  responseLimit: string;
  setResponseLimit: (v: string) => void;
  expiry: string;
  setExpiry: (v: string) => void;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-medium text-foreground" style={serif}>
          Theme
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Choose a calm visual palette for your form.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(Object.keys(THEMES) as ThemeKey[]).map((k) => {
            const t = THEMES[k];
            const active = props.theme === k;
            return (
              <button
                key={k}
                onClick={() => props.setTheme(k)}
                className={cn(
                  "group flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all",
                  active
                    ? "border-primary bg-primary/5 shadow-[0_0_0_4px_oklch(0.42_0.045_150/0.12)]"
                    : "border-border bg-card/60 hover:border-primary/40",
                )}
              >
                <div className={cn("h-14 w-full rounded-xl", t.bg, "grid place-items-center")}>
                  <div className={cn("h-2 w-8 rounded-full", t.swatch)} />
                </div>
                <span className="text-xs font-medium text-foreground">{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border/60 pt-8">
        <h3 className="text-lg font-medium text-foreground" style={serif}>
          Visibility
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">Control who can access your form.</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { k: "public" as const, label: "Public", desc: "Anyone with the link can access" },
            { k: "unlisted" as const, label: "Unlisted", desc: "Only people with the direct link" },
          ].map((o) => {
            const active = props.visibility === o.k;
            return (
              <button
                key={o.k}
                onClick={() => props.setVisibility(o.k)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-primary bg-primary/5 shadow-[0_0_0_4px_oklch(0.42_0.045_150/0.12)]"
                    : "border-border bg-card/60 hover:border-primary/40",
                )}
              >
                <div className="text-sm font-medium text-foreground">{o.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{o.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border/60 pt-8">
        <h3 className="text-lg font-medium text-foreground" style={serif}>
          Limits & security
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Set optional restrictions on your form.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Expiry date</Label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={props.expiry}
                onChange={(e) => props.setExpiry(e.target.value)}
                className="flex-1 bg-transparent py-2.5 text-sm outline-none"
              />
            </div>
          </div>
          <div>
            <Label>Response limit</Label>
            <input
              type="number"
              min={1}
              value={props.responseLimit}
              onChange={(e) => props.setResponseLimit(e.target.value)}
              className={inputCls}
              placeholder="No limit"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 pt-8">
        <h3 className="text-lg font-medium text-foreground" style={serif}>
          Share
        </h3>
        <div className="mt-4 flex items-stretch gap-2">
          {/* <div className="flex-1 truncate rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm text-foreground/80">
            {props.formUrl}
          </div> */}
          <button
            onClick={props.onCopy}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-sm text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            {props.copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {props.copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewStep({
  title,
  description,
  fields,
  theme,
}: {
  title: string;
  description: string;
  fields: Field[];
  theme: ThemeKey;
}) {
  const t = THEMES[theme];
  return (
    <div
      className={cn(
        "rounded-3xl border border-border p-6 sm:p-10 shadow-[0_20px_60px_-30px_oklch(0.3_0.02_150/0.35)]",
        t.bg,
      )}
    >
      <h2 className="text-2xl sm:text-3xl font-medium text-foreground" style={serif}>
        {title || "Untitled form"}
      </h2>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-6 space-y-4">
        {fields.map((f) => (
          <div key={f.id}>
            <Label required={f.required}>{f.label || "Untitled"}</Label>
            {f.type === "longtext" ? (
              <textarea
                rows={3}
                className={cn(inputCls, "resize-none bg-card/80")}
                placeholder={f.placeholder}
              />
            ) : f.type === "dropdown" ? (
              <select className={cn(inputCls, "bg-card/80")}>
                <option value="">{f.placeholder || "Select…"}</option>
                {(f.options ?? []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type === "number" ? "number" : f.type === "email" ? "email" : "text"}
                className={cn(inputCls, "bg-card/80")}
                placeholder={f.placeholder}
                maxLength={f.maxLength}
              />
            )}
          </div>
        ))}
        {fields.length === 0 && (
          <div className="text-sm text-muted-foreground">Add a field to see a preview.</div>
        )}
        <button
          className={cn(
            "mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:-translate-y-px transition-transform",
          )}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */

function FieldModal({
  existing,
  onClose,
  onSave,
}: {
  existing: Field | null;
  onClose: () => void;
  onSave: (f: Field) => void;
}) {
  const [type, setType] = React.useState<FieldType>(existing?.type ?? "shorttext");
  const [label, setLabel] = React.useState(existing?.label ?? "");
  const [placeholder, setPlaceholder] = React.useState(existing?.placeholder ?? "");
  const [required, setRequired] = React.useState(existing?.required ?? false);
  const [maxLen, setMaxLen] = React.useState(existing?.maxLength ? String(existing.maxLength) : "");
  const [pattern, setPattern] = React.useState(existing?.pattern ?? "");
  const [optionsText, setOptionsText] = React.useState((existing?.options ?? []).join("\n"));

  const save = () => {
    if (!label.trim()) return;
    const f: Field = {
      id: existing?.id ?? nid(),
      type,
      label: label.trim(),
      placeholder: placeholder.trim() || undefined,
      required,
      maxLength: maxLen ? Number(maxLen) : undefined,
      pattern: pattern || undefined,
      options:
        type === "dropdown"
          ? optionsText
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
    };
    onSave(f);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-[0_30px_80px_-20px_oklch(0.3_0.02_150/0.35)]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-foreground" style={serif}>
            {existing ? "Edit field" : "Add field"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <Label>Field type</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(Object.keys(FIELD_META) as FieldType[]).map((k) => {
                const M = FIELD_META[k];
                const Icon = M.icon;
                const active = type === k;
                return (
                  <button
                    key={k}
                    onClick={() => setType(k)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-all",
                      active
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-card/60 text-muted-foreground hover:border-primary/40",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 place-items-center rounded-md",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground/70",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="truncate">{M.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label required>Label</Label>
            <input
              autoFocus
              className={inputCls}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter field label"
            />
          </div>

          <div>
            <Label>Placeholder</Label>
            <input
              className={inputCls}
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              placeholder="Optional placeholder text"
            />
          </div>

          <label className="flex items-center justify-between rounded-xl border border-border bg-card/60 px-4 py-3">
            <span className="text-sm text-foreground">Required field</span>
            <button
              type="button"
              role="switch"
              aria-checked={required}
              onClick={() => setRequired((v) => !v)}
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                required ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform",
                  required ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
          </label>

          {type === "dropdown" && (
            <div>
              <Label>Options</Label>
              <textarea
                rows={4}
                className={cn(inputCls, "resize-none font-mono text-xs")}
                value={optionsText}
                onChange={(e) => setOptionsText(e.target.value)}
                placeholder={"One option per line\nOption 1\nOption 2"}
              />
            </div>
          )}

          {(type === "shorttext" || type === "longtext") && (
            <div>
              <Label>Max length</Label>
              <input
                type="number"
                min={1}
                className={inputCls}
                value={maxLen}
                onChange={(e) => setMaxLen(e.target.value)}
                placeholder="Leave empty for unlimited"
              />
            </div>
          )}

          {(type === "shorttext" || type === "email") && (
            <div>
              <Label>Validation pattern (regex)</Label>
              <input
                className={cn(inputCls, "font-mono text-xs")}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="e.g. ^[A-Z].+$"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={!label.trim()}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all",
              "shadow-[0_8px_24px_-8px_oklch(0.42_0.045_150/0.5)] hover:-translate-y-px",
              !label.trim() && "opacity-50 cursor-not-allowed hover:translate-y-0",
            )}
          >
            {existing ? "Save" : "Add field"}
          </button>
        </div>
      </div>
    </div>
  );
}
