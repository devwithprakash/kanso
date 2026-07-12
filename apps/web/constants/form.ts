import { FieldType } from "@/types/form";
import {
  AlignLeft,
  Calendar,
  CheckSquare,
  CircleDot,
  Hash,
  ListChecks,
  Mail,
  Notebook,
  Phone,
  Type,
} from "lucide-react";

export const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export const STEPS = ["Details", "Fields", "Configure", "Preview"] as const;

export const FIELD_META: Record<
  FieldType,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  text: {
    label: "Text",
    icon: Type,
  },
  textarea: {
    label: "Textarea",
    icon: AlignLeft,
  },
  email: {
    label: "Email",
    icon: Mail,
  },
  number: {
    label: "Number",
    icon: Hash,
  },
  phone: {
    label: "Phone",
    icon: Phone,
  },
  select: {
    label: "Select",
    icon: ListChecks,
  },
  radio: {
    label: "Radio",
    icon: CircleDot,
  },
  checkbox: {
    label: "Checkbox",
    icon: CheckSquare,
  },
  date: {
    label: "Date",
    icon: Calendar,
  },
  file: {
    label: "File",
    icon: Notebook,
  },
};


export const CONFETTI_COLORS = [
  "oklch(0.75_0.15_50)",
  "oklch(0.72_0.14_150)",
  "oklch(0.72_0.14_230)",
  "oklch(0.78_0.14_20)",
  "oklch(0.8_0.14_95)",
  "oklch(0.7_0.15_310)",
];