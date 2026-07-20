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
    <div className="relative overflow-hidden">
      {EffectComponent && <EffectComponent />}

      <div className={cn("relative z-10 p-6 sm:p-10", t.bodyCard)}>
        <h2 className={cn("text-2xl sm:text-3xl", t.title)} style={serif}>
          {title || "Untitled form"}
        </h2>

        {description && <p className={cn("mt-2", t.description)}>{description}</p>}

        <div className="mt-8 space-y-5">
          {fields.map((f) => (
            <div key={f.id} className="space-y-2">
              <Label required={f.required} className={t.label}>
                {f.label || "Untitled"}
              </Label>

              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  className={cn(t.input, "resize-none")}
                  placeholder={f.placeholder ?? undefined}
                />
              ) : f.type === "select" ? (
                <select className={cn("px-4", t.input)}>
                  <option value="">{f.placeholder || "Select..."}</option>

                  {(f.fieldOptions ?? []).map((o) => (
                    <option key={o.order} value={o.value}>
                      {o.value}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={
                    f.type === "number"
                      ? "number"
                      : f.type === "email"
                        ? "email"
                        : f.type === "date"
                          ? "date"
                          : "text"
                  }
                  className={cn("px-4", t.input)}
                  placeholder={f.placeholder ?? undefined}
                  maxLength={f.maxLength ?? undefined}
                />
              )}
            </div>
          ))}

          {fields.length === 0 && (
            <div className={cn("rounded-lg border border-dashed p-4 text-center", t.helperText)}>
              Add a field to see a preview.
            </div>
          )}

          <button
            type="button"
            className={cn(
              "mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2",
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
