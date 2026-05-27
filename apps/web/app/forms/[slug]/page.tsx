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
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

type FormTheme = "light" | "minimal" | "dark" | "gradient";

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

  const themeStyles: Record<
    FormTheme,
    {
      wrapper: string;
      card: string;
      headerLine: string;
      inputs: string;
      labels: string;
      button: string;
    }
  > = {
    light: {
      wrapper: "min-h-screen bg-[#fafafa] text-foreground antialiased font-sans py-16 px-4",
      card: "bg-card border border-border shadow-sm rounded-xl overflow-hidden",
      headerLine: "absolute top-0 left-0 w-full h-[4px] bg-primary",
      inputs:
        "text-sm h-10 bg-background border-border rounded-lg focus-visible:ring-2 focus-visible:ring-primary/20",
      labels: "text-xs font-medium text-foreground/70",
      button: "w-full text-sm font-medium h-10 bg-primary text-white rounded-lg",
    },
    minimal: {
      wrapper: "min-h-screen bg-[#fffafd] text-slate-900 py-16 px-4",
      card: "bg-white/80 backdrop-blur-sm border border-rose-100 rounded-2xl",
      headerLine:
        "absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-rose-200 via-pink-400 to-rose-200",
      inputs:
        "text-sm h-10 bg-rose-50 border-rose-200 rounded-xl focus-visible:ring-2 focus-visible:ring-rose-200",
      labels: "text-xs font-semibold text-slate-700",
      button:
        "w-full text-sm font-semibold h-10 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl",
    },
    dark: {
      wrapper: "min-h-screen bg-[#040807] text-white py-16 px-4",
      card: "bg-[#0a110f] border border-emerald-900 rounded-2xl",
      headerLine: "absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500",
      inputs: "text-sm h-10 bg-[#111d1a] border-emerald-900 text-white rounded-xl",
      labels: "text-xs font-semibold text-zinc-400",
      button: "w-full text-sm font-semibold h-10 bg-emerald-500 text-white rounded-xl",
    },
    gradient: {
      wrapper: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 py-16 px-4",
      card: "bg-white/80 backdrop-blur-md border border-orange-100 rounded-2xl",
      headerLine: "absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-orange-300",
      inputs:
        "text-sm h-10 bg-white border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-orange-200",
      labels: "text-xs font-bold text-slate-600 uppercase",
      button:
        "w-full text-sm font-bold h-10 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl",
    },
  };

  const themeKey = (form?.theme && form.theme in themeStyles ? form.theme : "light") as FormTheme;

  const activeTheme = themeStyles[themeKey];

  const handleInputChange = (fieldId: string, value: FieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    if (validationError) setValidationError(null);
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
          setValidationError(`Please complete: "${field.label}"`);
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
      <div className={`${activeTheme.wrapper} flex items-center justify-center`}>
        <Loader2 className="animate-spin opacity-60" />
      </div>
    );
  }

  if (error || !form || form.visibility === "private") {
    return (
      <div className={`${activeTheme.wrapper} flex items-center justify-center`}>
        <Card className={activeTheme.card}>
          <AlertCircle />
          <p>Form not available</p>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className={`${activeTheme.wrapper} flex items-center justify-center`}>
        <Card className={activeTheme.card}>
          <CheckCircle2 />
          <p>Submitted successfully</p>
        </Card>
      </div>
    );
  }

  return (
    <div className={activeTheme.wrapper}>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <Card className={activeTheme.card}>
          <CardHeader>
            <CardTitle>{form.title}</CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>
        </Card>

        <Card className={activeTheme.card}>
          {form.formFields?.map((field: FormField) => (
            <div key={field.id} className="space-y-2 mb-6">
              <Label className={activeTheme.labels}>
                {field.label} {field.required && "*"}
              </Label>

              {field.type === "text" && (
                <Input
                  className={activeTheme.inputs}
                  value={(formData[field.id] as string) ?? ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {field.type === "textarea" && (
                <Textarea
                  className={activeTheme.inputs}
                  value={(formData[field.id] as string) ?? ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {field.type === "select" && (
                <Select
                  value={(formData[field.id] as string) ?? ""}
                  onValueChange={(val) => handleInputChange(field.id, val)}
                >
                  <SelectTrigger className={activeTheme.inputs}>
                    <SelectValue />
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

              {field.type === "checkbox" && (
                <div>
                  {field.fieldOptions.map((opt) => {
                    const checked = ((formData[field.id] as string[]) ?? []).includes(opt.value);

                    return (
                      <div key={opt.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(val) =>
                            handleCheckboxChange(field.id, opt.value, !!val)
                          }
                        />
                        <label>{opt.label}</label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {validationError && <p className="text-red-500 text-sm">{validationError}</p>}

          <Button type="submit" className={activeTheme.button}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Card>
      </form>
    </div>
  );
}
