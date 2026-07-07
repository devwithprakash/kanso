import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Calendar, Check, Copy } from "lucide-react";

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

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export function ConfigureStep(props: {
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
  visibility: "public" | "unlisted";
  setVisibility: (v: "public" | "unlisted") => void;
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
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { k: "public" as const, label: "Public", desc: "Anyone with the link can access" },
            { k: "unlisted" as const, label: "Unlisted", desc: "Only people with the direct link" },
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
          Limits & security
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Set optional restrictions on your form.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Expiry date</Label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={props.expiry}
                onChange={(e) => props.setExpiry(e.target.value)}
                className="flex-1 bg-transparent py-2.5 text-sm outline-none"
              />
            </div>
          </div>
          <div>
            <Label>Response limit</Label>
            <input
              type="number"
              min={1}
              value={props.responseLimit}
              onChange={(e) => props.setResponseLimit(e.target.value)}
              className={inputCls}
              placeholder="No limit"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 pt-8">
        <h3 className="text-lg font-medium text-foreground" style={serif}>
          Share
        </h3>
        <div className="mt-4 flex items-stretch gap-2">
          {/* <div className="flex-1 truncate rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm text-foreground/80">
            {props.formUrl}
          </div> */}
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

const inputCls =
  "w-full rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10";
