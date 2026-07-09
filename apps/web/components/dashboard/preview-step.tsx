import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Field } from "@/types/form";
import { THEMES } from "@/constants/theme";
import { ThemeKey } from "@/types/theme";
import { serif } from "@/constants/form";

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
            {f.type === "textarea" ? (
              <textarea
                rows={3}
                className={cn(inputCls, "resize-none bg-card/80")}
                placeholder={f.placeholder}
              />
            ) : f.type === "select" ? (
              <select className={cn(inputCls, "bg-card/80")}>
                <option value="">{f.placeholder || "Select…"}</option>
                {(f.options ?? []).map((o) => (
                  <option key={o.order} value={o.value}>
                    {o.value}
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
