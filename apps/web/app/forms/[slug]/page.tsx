"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSubmitFormResponses } from "@/hooks/response/use-response";
import { useGetFormBySlug } from "@/hooks/form/use-forms";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Send } from "lucide-react";
import { formThemes } from "@/components/themes";
import type { ThemeKey } from "@/types/theme";

type FieldValue = string | number | boolean | string[] | null;

interface FieldOption {
  id: string;
  fieldId: string;
  value: string;
  label: string;
  order: number;
}

interface FormField {
  id: string;
  formId: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "email"
    | "number"
    | "phone"
    | "select"
    | "radio"
    | "checkbox"
    | "date"
    | "file";
  order: number;
  required: boolean;
  placeholder?: string | null;
  helperText?: string | null;
  fieldOptions: FieldOption[];
}

type FormData = Record<string, FieldValue>;

export default function PublicFormPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data: form, isLoading, error } = useGetFormBySlug(slug);
  const {
    submitResponsesMutation,
    isSubmitting,
    error: formResponseError,
  } = useSubmitFormResponses();

  const themeKey = (form?.theme && form.theme in formThemes ? form.theme : "minimal") as ThemeKey;
  const theme = formThemes[themeKey];

  const handleInputChange = (fieldId: string, value: FieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (validationError) setValidationError(null);
  };

  const handleCheckboxChange = (fieldId: string, optionValue: string, checked: boolean) => {
    const currentValues = (formData[fieldId] as string[] | undefined) ?? [];
    const updatedValues = checked
      ? [...currentValues, optionValue]
      : currentValues.filter((v) => v !== optionValue);
    setFormData((prev) => ({ ...prev, [fieldId]: updatedValues }));
    if (validationError) setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (!form?.formFields) return;

    for (const field of form.formFields as FormField[]) {
      if (field.required) {
        const value = formData[field.id];
        const isEmpty =
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);
        if (isEmpty) {
          setValidationError(`Please complete the required field: "${field.label}"`);
          return;
        }
      }
    }

    try {
      const formattedAnswers = Object.entries(formData).map(([fieldId, value]) => ({
        fieldId,
        value: Array.isArray(value) ? JSON.stringify(value) : String(value),
      }));
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
      <theme.Page>
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin opacity-40 w-6 h-6" />
        </div>
      </theme.Page>
    );
  }

  if (error || !form || form.visibility === "private") {
    return (
      <theme.Page>
        <theme.BodyCard>
          <div className="text-center py-6">
            <p className="font-semibold mb-1">Form unavailable</p>
            <p className="text-sm opacity-50">
              This form is either private or no longer accepting responses.
            </p>
          </div>
        </theme.BodyCard>
      </theme.Page>
    );
  }

  if (isSubmitted) {
    return (
      <theme.Page>
        <theme.BodyCard>
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-current/5 flex items-center justify-center mx-auto mb-5">
              <theme.SuccessIcon />
            </div>
            <p className={`text-xl font-bold mb-2 ${theme.successTitleClassName}`}>
              Response recorded!
            </p>
            <p className={`text-sm ${theme.successSubtitleClassName}`}>
              Thank you for completing <span className="font-medium">{form.title}</span>. Your
              answers have been saved.
            </p>
          </div>
        </theme.BodyCard>
      </theme.Page>
    );
  }

  const fields = (form.formFields ?? []) as FormField[];
  const requiredCount = fields.filter((f) => f.required).length;

  return (
    <theme.Page>
      <div className="space-y-4">
        <theme.HeaderCard>
          <h1 className="text-2xl font-bold tracking-tight leading-tight mb-2">{form.title}</h1>
          {form.description && (
            <p className="text-sm leading-relaxed opacity-60">{form.description}</p>
          )}
          {requiredCount > 0 && (
            <p className="mt-4 text-xs opacity-40">
              Fields marked <span className="text-red-400 font-bold">*</span> are required
            </p>
          )}
        </theme.HeaderCard>

        <form onSubmit={handleSubmit}>
          <theme.BodyCard>
            <div className="space-y-7">
              {fields.map((field, idx) => (
                <div key={field.id}>
                  {idx > 0 && <theme.Divider />}

                  <div className="flex items-start gap-3">
                    <theme.FieldNumber>{idx + 1}</theme.FieldNumber>

                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-center gap-2">
                        <Label>
                          <theme.FieldLabel>{field.label}</theme.FieldLabel>
                        </Label>
                        {field.required ? <theme.RequiredMark /> : <theme.OptionalBadge />}
                      </div>

                      {field.helperText && <theme.HelperText>{field.helperText}</theme.HelperText>}

                      {field.type === "text" && (
                        <theme.Input
                          placeholder={field.placeholder ?? ""}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "email" && (
                        <theme.Input
                          type="email"
                          placeholder={field.placeholder ?? "you@example.com"}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "number" && (
                        <theme.Input
                          type="number"
                          placeholder={field.placeholder ?? ""}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "phone" && (
                        <theme.Input
                          type="tel"
                          placeholder={field.placeholder ?? "+1 (555) 000-0000"}
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "date" && (
                        <theme.Input
                          type="date"
                          value={(formData[field.id] as string) ?? ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      )}

                      {field.type === "textarea" && (
                        <theme.Textarea
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
                          <SelectTrigger className={theme.selectTriggerClassName}>
                            <SelectValue placeholder="Choose an option…" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.fieldOptions.map((opt) => (
                              <SelectItem key={opt.id} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {field.type === "radio" && (
                        <div className="space-y-2 pt-1">
                          {field.fieldOptions.map((opt) => {
                            const selected = (formData[field.id] as string) === opt.value;
                            return (
                              <label
                                key={opt.id}
                                className="flex items-center gap-3 cursor-pointer group"
                              >
                                <theme.RadioDot selected={selected} />
                                <input
                                  type="radio"
                                  className="sr-only"
                                  checked={selected}
                                  onChange={() => handleInputChange(field.id, opt.value)}
                                />
                                <span className="text-sm">{opt.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}

                      {field.type === "checkbox" && (
                        <div className="space-y-2 pt-1">
                          {field.fieldOptions.map((opt) => (
                            <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {validationError && (
              <div className="mt-6">
                <theme.ErrorBox>{validationError}</theme.ErrorBox>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-current/5">
              <theme.SubmitButton
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2"
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
              </theme.SubmitButton>
            </div>
          </theme.BodyCard>
        </form>

        <p className="text-center text-[11px] opacity-30 pb-4">Powered by Kanso</p>
      </div>
    </theme.Page>
  );
}
