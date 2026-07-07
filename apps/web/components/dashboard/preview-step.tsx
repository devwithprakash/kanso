import { cn } from "@/lib/utils";
import { Label } from "./label";

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

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export function PreviewStep({
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

const inputCls =
  "w-full rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10";
