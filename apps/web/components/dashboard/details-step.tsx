import { cn } from "@/lib/utils";
import { FormRecord } from "@/types/form";

const inputCls =
  "w-full rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10";

export function DetailsStep(props: {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label required>Form title</Label>
        <input
          className={inputCls}
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          placeholder="e.g. Customer feedback"
        />
      </div>
      <div>
        <Label>Description</Label>
        <textarea
          rows={4}
          className={cn(inputCls, "resize-none")}
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          placeholder="Optional description or instructions…"
        />
      </div>
    </div>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 flex items-center gap-1 text-sm text-foreground/80">
      {children}
      {required && <span className="text-[oklch(0.55_0.18_25)]">*</span>}
    </label>
  );
}
