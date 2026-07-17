"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSubmitFormResponses } from "@/hooks/response/use-response";
import { useGetFormBySlug } from "@/hooks/form/use-forms";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { themeEffects } from "@/components/effects/registry";
import { ThemeKey } from "@/types/theme";
import { themeStyles } from "@/constants/theme";
import { buildFormSchema } from "@/lib/form-response-validation";
import { cn } from "@/lib/utils";
import { Field } from "@/types/form";

type FieldValue = string | number | boolean | string[] | null;

type FormData = Record<string, FieldValue>;

export default function PublicFormPage() {
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const params = useParams();
  const slug = params.slug as string;

  const { data: form, isLoading, error } = useGetFormBySlug(slug);
  const {
    submitResponsesMutation,
    isSubmitting,
    error: formResponseError,
  } = useSubmitFormResponses();

  const themeKey = (
    form?.theme && form.theme in themeStyles ? form.theme : "clean-zen"
  ) as ThemeKey;
  const EffectComponent = themeEffects[themeKey];
  const t = themeStyles[themeKey];

  const handleInputChange = (id: string, value: FieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => {
      if (!prev[id]) return prev;

      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCheckboxChange = (fieldId: string, optionValue: string, checked: boolean) => {
    const currentValues = (formData[fieldId] as string[] | undefined) ?? [];

    const updatedValues = checked
      ? [...currentValues, optionValue]
      : currentValues.filter((v) => v !== optionValue);

    setFormData((prev) => ({
      ...prev,
      [fieldId]: updatedValues,
    }));

    setErrors((prev) => {
      if (!prev[fieldId]) return prev;

      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (!form?.formFields) return;

    if (submitResponsesMutation.isPending) return;

    const schema = buildFormSchema(form.formFields as Field[]);
    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const fieldId = issue.path[0];

        if (typeof fieldId === "string") {
          fieldErrors[fieldId] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const formattedAnswers = Object.entries(result.data).map(([fieldId, value]) => {
        if (value === undefined || value === null) {
          return { fieldId, value: "" };
        }
        return {
          fieldId,
          value: Array.isArray(value) ? JSON.stringify(value) : String(value),
        };
      });

      await submitResponsesMutation.mutateAsync({
        formId: form.id,
        answer: formattedAnswers,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setValidationError(formResponseError?.message || "Failed to submit form. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className={`${t.page} items-center`}>
        <Loader2 className="animate-spin opacity-40 w-6 h-6" />
      </div>
    );
  }

  if (error || !form || form.visibility === "private") {
    return (
      <div className={t.page}>
        <div className="w-full max-w-lg">
          <div className={`${t.bodyCard} p-10 text-center`}>
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-5 h-5 text-slate-400" />
            </div>
            <p className="font-semibold text-slate-700 mb-1">Form unavailable</p>
            <p className="text-sm text-slate-400">
              This form is either private or no longer accepting responses.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className={t.page}>
        <div className="w-full max-w-lg">
          <div className={`${t.bodyCard} p-12 text-center`}>
            <div className="w-16 h-16 rounded-full bg-current/5 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className={`w-8 h-8 ${t.successIcon}`} />
            </div>
            <p className={`text-xl font-bold mb-2 ${t.successTitle}`}>Response recorded!</p>
            <p className={`text-sm ${t.successSubtitle}`}>
              Thank you for completing <span className="font-medium">{form.title}</span>. Your
              answers have been saved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const fields = (form.formFields ?? []) as Field[];
  const requiredCount = fields.filter((f) => f.required).length;

  return (
    <div className={t.page}>
      {EffectComponent && <EffectComponent />}
      <div className="w-full max-w-xl space-y-4">
        <div className={t.headerCard}>
          <div className="h-1 w-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 opacity-40" />
          <div className="px-8 py-7">
            <h1 className="text-2xl font-bold tracking-tight leading-tight mb-2">{form.title}</h1>
            {form.description && (
              <p className="text-sm leading-relaxed opacity-60">{form.description}</p>
            )}
            {requiredCount > 0 && (
              <p className="mt-4 text-xs opacity-40">
                Fields marked <span className="text-red-400 font-bold">*</span> are required
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={`${t.bodyCard} px-8 py-7`}>
            <div className="space-y-7">
              {fields.map((field, idx) => (
                <div key={field.id}>
                  {idx > 0 && <hr className={`${t.divider} border-t mb-7`} />}

                  <div className="flex items-start gap-3">
                    <span className={`${t.fieldNumber} mt-0.5`}>{idx + 1}</span>

                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-center gap-2">
                        <Label className={t.label}>{field.label}</Label>
                        {field.required && (
                          <span className="text-red-400 text-xs font-bold leading-none">*</span>
                        )}
                        {!field.required && <span className={t.badge}>optional</span>}
                      </div>

                      {field.type === "text" && (
                        <Input
                          className={cn(
                            t.input,
                            errors[field.id] && "border-red-500 focus-visible:ring-red-500",
                          )}
                          placeholder={field.placeholder ?? ""}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "email" && (
                        <Input
                          type="email"
                          className={cn(
                            t.input,
                            errors[field.id] && "border-red-500 focus-visible:ring-red-500",
                          )}
                          placeholder={field.placeholder ?? "you@example.com"}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "number" && (
                        <Input
                          type="number"
                          className={cn(
                            t.input,
                            errors[field.id] && "border-red-500 focus-visible:ring-red-500",
                          )}
                          placeholder={field.placeholder ?? ""}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "phone" && (
                        <Input
                          type="tel"
                          className={cn(
                            t.input,
                            errors[field.id] && "border-red-500 focus-visible:ring-red-500",
                          )}
                          placeholder={field.placeholder ?? "+1 (555) 000-0000"}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "date" && (
                        <Input
                          type="date"
                          className={cn(
                            t.input,
                            errors[field.id] && "border-red-500 focus-visible:ring-red-500",
                          )}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "textarea" && (
                        <Textarea
                          className={cn(
                            t.input,
                            "h-auto min-h-[100px] py-2.5 resize-none",
                            errors[field.id] && "border-red-500 focus-visible:ring-red-500",
                          )}
                          placeholder={field.placeholder ?? ""}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "select" && (
                        <Select
                          value={(formData[field.id] as string) ?? ""}
                          onValueChange={(val) => handleInputChange(field.id, val)}
                        >
                          <SelectTrigger
                            className={cn(
                              t.input,
                              errors[field.id] && "border-red-500 focus-visible:ring-red-500",
                            )}
                          >
                            <SelectValue placeholder="Choose an option…" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.fieldOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {field.type === "radio" && (
                        <div className="space-y-2 pt-1">
                          {field.fieldOptions.map((opt) => (
                            <label
                              key={opt.value}
                              className="flex items-center gap-3 cursor-pointer group"
                            >
                              <span
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                                  ${
                                    (formData[field.id] as string) === opt.value
                                      ? "border-current"
                                      : "border-current/20 group-hover:border-current/50"
                                  }`}
                              >
                                {(formData[field.id] as string) === opt.value && (
                                  <span className="w-2 h-2 rounded-full bg-current" />
                                )}
                              </span>
                              <input
                                type="radio"
                                className="sr-only"
                                checked={(formData[field.id] as string) === opt.value}
                                onChange={() => handleInputChange(field.id, opt.value)}
                              />
                              <span className="text-sm">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {field.type === "checkbox" && (
                        <div className="space-y-2 pt-1">
                          {field.fieldOptions.map((opt) => (
                            <label
                              key={opt.value}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <Checkbox
                                checked={((formData[field.id] as string[]) ?? []).includes(
                                  opt.value,
                                )}
                                onCheckedChange={(val) =>
                                  handleCheckboxChange(field.id, opt.value, !!val)
                                }
                              />
                              <span className="text-sm">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {errors[field.id] && (
                        <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {validationError && (
              <div className={`${t.errorBox} mt-6`}>
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-current/5">
              <Button
                type="submit"
                className={`${t.btn} flex items-center justify-center gap-2`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        <p className="text-center text-[11px] opacity-30 pb-4">Powered by FormZen</p>
      </div>
    </div>
  );
}
