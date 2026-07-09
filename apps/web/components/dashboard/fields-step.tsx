import { FIELD_META } from "@/constants/form";
import { Field } from "@/types/form";
import { ChevronDown, ChevronUp, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";

export function FieldsStep({
  fields,
  onAdd,
  onEdit,
  onRemove,
  onMove,
}: {
  fields: Field[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
}) {
  return (
    <div className="space-y-3">
      {fields.map((f, i) => {
        const Icon = FIELD_META[f.type].icon;
        return (
          <div
            key={f.id}
            className="group grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card/70 px-3 py-3 shadow-sm transition-all hover:border-primary/40 hover:shadow-[0_8px_24px_-16px_oklch(0.42_0.045_150/0.4)]"
          >
            <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/60" />
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-foreground">
                {f.label || "Untitled"}
                {f.required && <span className="ml-1 text-[oklch(0.55_0.18_25)]">*</span>}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {FIELD_META[f.type].label}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              <div className="flex flex-col">
                <button
                  onClick={() => onMove(f.id, -1)}
                  disabled={i === 0}
                  className="p-1 text-muted-foreground/70 hover:text-foreground disabled:opacity-30"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onMove(f.id, 1)}
                  disabled={i === fields.length - 1}
                  className="p-1 text-muted-foreground/70 hover:text-foreground disabled:opacity-30"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={() => onEdit(f.id)}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => onRemove(f.id)}
                className="rounded-full p-2 text-muted-foreground hover:bg-[oklch(0.95_0.03_25)] hover:text-[oklch(0.5_0.18_25)] transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}

      <button
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-transparent px-4 py-4 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
      >
        <Plus className="h-4 w-4" /> Add field
      </button>
    </div>
  );
}
