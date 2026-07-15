import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Field } from "@/types/form";
import { themeStyles } from "@/constants/theme";
import { ThemeKey } from "@/types/theme";
import { serif } from "@/constants/form";
import { themeEffects } from "../effects/registry";

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
  const themeKey = theme ?? "clean-zen";
  const EffectComponent = themeEffects[themeKey];
  const t = themeStyles[themeKey];

  return (
    <div className={cn("relative overflow-hidden")}>
      {EffectComponent && <EffectComponent />}
      <div className={cn("relative z-10 p-6 sm:p-10", t.bodyCard)}>
        <h2 className="text-2xl sm:text-3xl font-medium" style={serif}>
          {title || "Untitled form"}
        </h2>
        {description && <p className="mt-2 text-sm opacity-60">{description}</p>}
        <div className="mt-6 space-y-4">
          {fields.map((f) => (
            <div key={f.id}>
              <Label required={f.required} className={t.label}>
                {f.label || "Untitled"}
              </Label>
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  className={cn(t.input, "resize-none")}
                  placeholder={f.placeholder}
                />
              ) : f.type === "select" ? (
                <select className={cn("px-4", t.input)}>
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
                  className={cn("px-4", t.input)}
                  placeholder={f.placeholder}
                  maxLength={f.maxLength}
                />
              )}
            </div>
          ))}
          {fields.length === 0 && (
            <div className="text-sm opacity-50">Add a field to see a preview.</div>
          )}
          <button
            className={cn(
              "mt-2 inline-flex justify-center cursor-pointer items-center gap-2",
              t.btn,
            )}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
