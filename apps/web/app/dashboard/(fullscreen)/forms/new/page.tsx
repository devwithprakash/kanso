"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stepper } from "@/components/dashboard/stepper";
import { DetailsStep } from "@/components/dashboard/details-step";
import { FieldsStep } from "@/components/dashboard/fields-step";
import { ConfigureStep } from "@/components/dashboard/configure-step";
import { PreviewStep } from "@/components/dashboard/preview-step";
import { useCreateForm, useUpdateForm } from "@/hooks/form/use-forms";
import { Field } from "@/types/form";
import { ThemeKey } from "@/types/theme";
import { serif, STEPS } from "@/constants/form";
import { FieldModal } from "@/components/dashboard/field-model";
import { useSyncFormFields } from "@/hooks/form/use-form-field";
import { Nav } from "@/components/landing/navbar";
import { ThankYouScreen } from "@/components/dashboard/thankyou-screen";
import { AnimatePresence, motion } from "framer-motion";

type StepIdx = 0 | 1 | 2 | 3;

let idCounter = 0;
const nid = () => `field${++idCounter}`;

export default function NewFormPage() {
  const [step, setStep] = useState<StepIdx>(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [theme, setTheme] = useState<ThemeKey>("clean-zen");
  const [visibility, setVisibility] = useState<"public" | "unlisted" | "private">("public");
  const [responseLimit, setResponseLimit] = useState("");
  const [expiry, setExpiry] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [slug, setSlug] = useState("");
  const [formId, setFormId] = useState("");
  const [published, setPublished] = useState(false);

  const { submitForm, isLoading } = useCreateForm();
  const { submitFormFieldData } = useSyncFormFields();
  const { updateForm } = useUpdateForm();

  const openAdd = () => {
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (id: string) => {
    setEditingId(id);
    setModalOpen(true);
  };

  const reindex = (list: Field[]) => list.map((f, i) => ({ ...f, order: i }));

  const remove = (id: string) => setFields((f) => reindex(f.filter((x) => x.id !== id)));

  const move = (id: string, dir: -1 | 1) =>
    setFields((arr) => {
      const i = arr.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= arr.length) return arr;

      const copy = arr.slice();
      const temp = copy[i]!; // safe: i is bounds-checked above
      copy[i] = copy[j]!;
      copy[j] = temp;

      return reindex(copy);
    });

  const onReorder = (newFields: Field[]) => {
    setFields(reindex(newFields));
  };

  const upsertField = (data: Field) => {
    setFields((arr) => {
      const idx = arr.findIndex((x) => x.id === data.id);
      if (idx === -1) {
        return [...arr, { ...data, order: arr.length }];
      }
      const existing = arr[idx]!;
      const c = arr.slice();
      c[idx] = { ...data, order: existing.order };
      return c;
    });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://kanso.prakashjangid.in/${slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const canNext = step === 0 ? title.trim().length > 0 : step === 1 ? fields.length > 0 : true;

  let formUrl = "";

  const handleCreateForm = async () => {
    if (step === 1) {
      const createdForm = await submitForm(title, description, fields);

      setFormId(createdForm.id);
      setSlug(createdForm.slug);

      formUrl = `https://kanso.prakashjangid.in/${slug}`;
      console.log("Result", createdForm);
    }

    if (step === 3) {
      const updatedForm = await updateForm(formId, title, description, theme, visibility, fields);

      console.log("Form updated successfully", updatedForm);
    }
    if (step <= 3) {
      setStep((s) => (s + 1) as StepIdx);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient background — same warm zen wash as landing */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_0%,oklch(0.92_0.03_120/0.6),transparent_60%),radial-gradient(50%_35%_at_80%_10%,oklch(0.9_0.04_75/0.55),transparent_60%)]" />
      </div>

      <Nav />

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
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step}-${published}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
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
                    onReorder={onReorder}
                  />
                )}

                {step === 2 && (
                  <ConfigureStep
                    slug={slug}
                    formUrl={formUrl}
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

                {step === 3 && !published && (
                  <PreviewStep
                    title={title}
                    description={description}
                    fields={fields}
                    theme={theme}
                  />
                )}

                {step === 3 && published && <ThankYouScreen formUrl={formUrl} title={title} />}
              </motion.div>
            </AnimatePresence>
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
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      Next <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setPublished(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.42_0.045_150/0.5)] hover:-translate-y-px transition-all"
              >
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
