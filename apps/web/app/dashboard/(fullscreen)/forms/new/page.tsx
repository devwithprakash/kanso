"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TopBar } from "@/components/dashboard/topbar";
import { Stepper } from "@/components/dashboard/stepper";
import { DetailsStep } from "@/components/dashboard/details-step";
import { FieldsStep } from "@/components/dashboard/fields-step";
import { ConfigureStep } from "@/components/dashboard/configure-step";
import { PreviewStep } from "@/components/dashboard/preview-step";
import { Label } from "@/components/dashboard/label";
import { useCreateForm } from "@/hooks/form/use-forms";
import { Field, FieldType, FormFieldOption } from "@/types/form";
import { ThemeKey } from "@/types/theme";
import { FIELD_META, serif, STEPS } from "@/constants/form";

type StepIdx = 0 | 1 | 2 | 3;

let idCounter = 0;
const nid = () => `f${++idCounter}`;

export default function FormEditPage() {
  const [step, setStep] = React.useState<StepIdx>(0);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [fields, setFields] = React.useState<Field[]>([
    {
      id: nid(),
      type: "text",
      label: "Name",
      placeholder: "Your name",
      required: true,
      order: 0,
      maxLength: undefined,
      maxValue: undefined,
      minValue: undefined,
      options: [],
    },
  ]);
  const [theme, setTheme] = React.useState<ThemeKey>("clean-zen");
  const [visibility, setVisibility] = React.useState<"public" | "unlisted">("public");
  const [responseLimit, setResponseLimit] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const { submitForm, isLoading } = useCreateForm();

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

  const formFieldData = {};

  const handleCreateForm = async () => {
    setStep((s) => (s + 1) as StepIdx);

    if (step === 1) {
      // submitForm(title, description, formFieldData)
    }
  };

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
                disabled={!canNext || isLoading}
                onClick={handleCreateForm}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.42_0.045_150/0.5)] transition-all",
                  "hover:shadow-[0_12px_32px_-8px_oklch(0.42_0.045_150/0.6)] hover:-translate-y-px",
                  (!canNext || isLoading) &&
                    "cursor-not-allowed opacity-50 hover:translate-y-0 hover:shadow-none",
                )}
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    Next <ArrowRight className="h-4 w-4" />
                  </>
                )}
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

const inputCls =
  "w-full rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10";

function FieldModal({
  existing,
  onClose,
  onSave,
}: {
  existing: Field | null;
  onClose: () => void;
  onSave: (f: Field) => void;
}) {
  const [type, setType] = React.useState<FieldType>(existing?.type ?? "text");
  const [label, setLabel] = React.useState(existing?.label ?? "");
  const [placeholder, setPlaceholder] = React.useState(existing?.placeholder ?? "");
  const [required, setRequired] = React.useState(existing?.required ?? false);
  const [maxLength, setMaxLength] = React.useState(
    existing?.maxLength ? String(existing.maxLength) : "",
  );
  const [optionsText, setOptionsText] = React.useState((existing?.options ?? []).join("\n"));

  const save = () => {
    if (!label.trim()) return;

    const f: Field = {
      id: existing?.id ?? crypto.randomUUID(),
      label: label.trim(),
      type,
      order: existing?.order ?? 0,
      required,
      placeholder: placeholder.trim() || undefined,
      maxLength: maxLength ? Number(maxLength) : undefined,
      minValue: undefined,
      maxValue: undefined,
      options:
        type === "select" || type === "radio" || type === "checkbox"
          ? optionsText
              .split("\n")
              .map((option, index) => ({
                label: option.trim(),
                value: option.trim().toLowerCase().replace(/\s+/g, "-"),
                order: index,
              }))
              .filter((option) => option.label.length > 0)
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

          {type === "select" && (
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

          {(type === "text" || type === "textarea") && (
            <div>
              <Label>Max length</Label>
              <input
                type="number"
                min={1}
                className={inputCls}
                value={maxLength}
                onChange={(e) => setMaxLength(e.target.value)}
                placeholder="Leave empty for unlimited"
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
