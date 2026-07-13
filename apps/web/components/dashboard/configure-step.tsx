import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { ThemeKey } from "@/types/theme";
import { THEMES } from "@/constants/theme";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export function ConfigureStep(props: {
  slug: string;
  formUrl: string
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
  visibility: "public" | "unlisted" | "private";
  setVisibility: (v: "public" | "unlisted" | "private") => void;
  responseLimit: string;
  setResponseLimit: (v: string) => void;
  expiry: string;
  setExpiry: (v: string) => void;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-medium text-foreground" style={serif}>
          Theme
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Choose a calm visual palette for your form.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(Object.keys(THEMES) as ThemeKey[]).map((k) => {
            const t = THEMES[k];
            const active = props.theme === k;
            return (
              <button
                key={k}
                onClick={() => props.setTheme(k)}
                className={cn(
                  "group flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all",
                  active
                    ? "border-primary bg-primary/5 shadow-[0_0_0_4px_oklch(0.42_0.045_150/0.12)]"
                    : "border-border bg-card/60 hover:border-primary/40",
                )}
              >
                <div className={cn("h-14 w-full rounded-xl", t.bg, "grid place-items-center")}>
                  <div className={cn("h-2 w-8 rounded-full", t.swatch)} />
                </div>
                <span className="text-xs font-medium text-foreground">{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border/60 pt-8">
        <h3 className="text-lg font-medium text-foreground" style={serif}>
          Visibility
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">Control who can access your form.</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { k: "public" as const, label: "Public", desc: "Anyone with the link can access" },
            { k: "unlisted" as const, label: "Unlisted", desc: "Only people with the direct link" },
            { k: "private" as const, label: "Private", desc: "Nobody can access" },
          ].map((o) => {
            const active = props.visibility === o.k;
            return (
              <button
                key={o.k}
                onClick={() => props.setVisibility(o.k)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all",
                  active
                    ? "border-primary bg-primary/5 shadow-[0_0_0_4px_oklch(0.42_0.045_150/0.12)]"
                    : "border-border bg-card/60 hover:border-primary/40",
                )}
              >
                <div className="text-sm font-medium text-foreground">{o.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{o.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border/60 pt-8">
        <h3 className="text-lg font-medium text-foreground" style={serif}>
          Share
        </h3>
        <div className="mt-4 flex items-stretch gap-2">
          <div className="flex-1 truncate rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm text-foreground/80">
            {props.formUrl}
          </div>
          <button
            onClick={props.onCopy}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-sm text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            {props.copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {props.copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
