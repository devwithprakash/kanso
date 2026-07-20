"use client";

import { Reorder } from "framer-motion";
import { Field } from "@/types/form";
import { Plus } from "lucide-react";
import { FieldRow } from "./field-row";

export function FieldsStep({
  fields,
  onAdd,
  onEdit,
  onRemove,
  onMove,
  onReorder,
}: {
  fields: Field[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onReorder: (fields: Field[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Reorder.Group axis="y" values={fields} onReorder={onReorder} className="flex flex-col gap-3">
        {fields.map((f, i) => (
          <FieldRow
            key={f.id}
            field={f}
            index={i}
            total={fields.length}
            onEdit={onEdit}
            onRemove={onRemove}
            onMove={onMove}
          />
        ))}
      </Reorder.Group>

      <button 
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/50 cursor-pointer bg-transparent px-4 py-4 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
      >
        <Plus className="h-4 w-4" /> Add field
      </button>
    </div>
  );
}
