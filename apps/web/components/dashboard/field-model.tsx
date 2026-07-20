"use client";

import { FIELD_META, serif } from "@/constants/form";
import { Field, FieldType } from "@/types/form";
import { X } from "lucide-react";
import React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputCls =
  "w-full rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10";

export function FieldModal({
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


  const [optionsText, setOptionsText] = React.useState(
    existing?.fieldOptions?.map((option) => option.label).join("\n") ?? "",
  );

  const save = () => {
    if (!label.trim()) return;

    const f: Field = {
      id: existing?.id ?? `field-${Date.now()}`,
      formId: existing?.formId ?? "", // Set the actual form ID if available
      label: label.trim(),
      type,
      order: existing?.order ?? 0,
      required,

      placeholder: placeholder.trim() || null,
      maxLength: maxLength ? Number(maxLength) : null,
      minValue: null,
      maxValue: null,

      fieldOptions:
        type === "select" || type === "radio" || type === "checkbox"
          ? optionsText
              .split("\n")
              .map((option, index) => ({
                label: option.trim(),
                value: option.trim().toLowerCase().replace(/\s+/g, "-"),
                order: index,
              }))
              .filter((option) => option.label.length > 0)
          : [],
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

            <Select value={type} onValueChange={(value) => setType(value as FieldType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>

              <SelectContent>
                {(Object.keys(FIELD_META) as FieldType[]).map((key) => {
                  const Icon = FIELD_META[key].icon;

                  return (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{FIELD_META[key].label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
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
              onClick={() => setRequired((prev) => !prev)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
                required ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "absolute left-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform duration-200",
                  required ? "translate-x-5" : "translate-x-0",
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

          {type === "radio" && (
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
          {type === "checkbox" && (
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
            className="rounded-full cursor-pointer px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={!label.trim()}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all",
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
