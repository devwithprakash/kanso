"use client";

import { Reorder, useDragControls } from "framer-motion";
import { FIELD_META } from "@/constants/form";
import { Field } from "@/types/form";
import { ChevronDown, ChevronUp, GripVertical, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { container, item } from "@/constants/form-builder";

export function FieldRow({
  field,
  index,
  total,
  onEdit,
  onRemove,
  onMove,
}: {
  field: Field;
  index: number;
  total: number;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
}) {
  const dragControls = useDragControls();
  const Icon = FIELD_META[field.type].icon;


  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <Reorder.Item
          value={field}
          as="div"
          dragListener={false}
          dragControls={dragControls}
          whileDrag={{
            scale: 1.02,
            boxShadow: "0 12px 32px -8px oklch(0.42 0.045 150 / 0.35)",
            zIndex: 10,
          }}
          className="group grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card/70 px-3 py-3 shadow-sm transition-colors hover:border-primary/40"
        >
          <div
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab touch-none p-1 text-muted-foreground/60 hover:text-foreground active:cursor-grabbing outline-none"
            aria-label="Drag to reorder"
          >
            <GripVertical className="h-4 w-4 shrink-0 pointer-events-none" />
          </div>

          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>

          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-foreground">
              {field.label || "Untitled"}
              {field.required && <span className="ml-1 text-[oklch(0.55_0.18_25)]">*</span>}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {FIELD_META[field.type].label}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-0.5">
            <div className="flex flex-col">
              <button
                onClick={() => onMove(field.id, -1)}
                disabled={index === 0}
                className="p-1 text-muted-foreground/70 hover:text-foreground disabled:opacity-30"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onMove(field.id, 1)}
                disabled={index === total - 1}
                className="p-1 text-muted-foreground/70 hover:text-foreground disabled:opacity-30"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={() => onEdit(field.id)}
              className="rounded-full cursor-pointer p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onRemove(field.id)}
              className="rounded-full cursor-pointer p-2 text-muted-foreground hover:bg-[oklch(0.95_0.03_25)] hover:text-[oklch(0.5_0.18_25)] transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </Reorder.Item>
      </motion.div>
    </motion.div>
  );
}
