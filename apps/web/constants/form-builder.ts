// ─── Form Builder Constants ───────────────────────────────────────────────────

import {
  Type,
  AlignLeft,
  Mail,
  Hash,
  Phone,
  ChevronDown,
  Radio,
  ListChecks,
  Calendar,
  FileUp,
  Globe,
  Link2,
  Lock,
} from "lucide-react";

import type {
  BackendFieldType,
  FormField,
  ThemeOption,
  VisibilityOption,
} from "@/types/form-builder";

// ─── Field Type Palette (left panel) ─────────────────────────────────────────

export const fieldTypes = [
  { type: "text", icon: Type, label: "Short Text", description: "Single line text input" },
  { type: "textarea", icon: AlignLeft, label: "Long Text", description: "Multi-line text area" },
  { type: "email", icon: Mail, label: "Email", description: "Email address field" },
  { type: "number", icon: Hash, label: "Number", description: "Numeric input field" },
  { type: "phone", icon: Phone, label: "Phone", description: "Contact number layout" },
  {
    type: "select",
    icon: ChevronDown,
    label: "Dropdown Select",
    description: "Dropdown choices selection menu",
  },
  {
    type: "radio",
    icon: Radio,
    label: "Single Choice Radio",
    description: "Select one option out of multiple choices",
  },
  {
    type: "checkbox",
    icon: ListChecks,
    label: "Checkbox Collection",
    description: "Multi-select option parameters",
  },
  {
    type: "date",
    icon: Calendar,
    label: "Date Selection",
    description: "Calendar appointment picking tool",
  },
  {
    type: "file",
    icon: FileUp,
    label: "File Upload",
    description: "Binary attachment uploader field",
  },
] as const;

// ─── Default field data seeded when adding a new field ───────────────────────

export const defaultFieldData: Record<BackendFieldType, Partial<FormField>> = {
  text: { label: "Short Text Field", placeholder: "Enter response text..." },
  textarea: { label: "Long Text Context", placeholder: "Provide comprehensive answers here..." },
  email: { label: "Email Address Input", placeholder: "username@example.com" },
  number: { label: "Numeric Parameter", placeholder: "0" },
  phone: { label: "Contact Number", placeholder: "+1 (555) 000-0000" },
  select: {
    label: "Dropdown Options Selector",
    options: [
      { label: "Choice A", value: "choice_a", order: 0 },
      { label: "Choice B", value: "choice_b", order: 1 },
    ],
  },
  radio: {
    label: "Radio Choice Selector",
    options: [
      { label: "Option 1", value: "option_1", order: 0 },
      { label: "Option 2", value: "option_2", order: 1 },
    ],
  },
  checkbox: {
    label: "Multiselect Parameters Box",
    options: [
      { label: "Accept Item 1", value: "accept_item_1", order: 0 },
      { label: "Accept Item 2", value: "accept_item_2", order: 1 },
    ],
  },
  date: { label: "Target Date Selection" },
  file: { label: "Document Workspace Upload" },
};

// ─── Visibility Options ───────────────────────────────────────────────────────

export const visibilityOptions: VisibilityOption[] = [
  { id: "public", label: "Public", icon: Globe },
  { id: "unlisted", label: "Unlisted", icon: Link2 },
  { id: "private", label: "Private", icon: Lock },
];

// ─── Theme Options ────────────────────────────────────────────────────────────

export const themeOptions: ThemeOption[] = [
  {
    id: "clean-zen",
    label: "Cherry Blossom",
    description: "Soft pink, warm and inviting",
    swatch: ["#FFD1DC", "#FF8FA3", "#C2185B"],
  },
  {
    id: "cyber-sunset",
    label: "Cyber Sunset",
    description: "Neon gradient, bold and modern",
    swatch: ["#FF6B6B", "#C44BC4", "#4834D4"],
  },
  {
    id: "cherry-blossom",
    label: "Clean & Zen",
    description: "Minimal, calm, distraction-free",
    swatch: ["#F5F5F0", "#D8D4C8", "#8A8578"],
  },
  {
    id: "ocean-mist",
    label: "Ocean Mist",
    description: "Deep greens, earthy and grounded",
    swatch: ["#A8D5A0", "#4F7942", "#2C4A2E"],
  },
  {
    id: "lavender-dream",
    label: "Lavender Dream",
    description: "Deep greens, earthy and grounded",
    swatch: ["#A8D5A0", "#4F7942", "#2C4A2E"],
  },
];

/** Field types that support multi-choice options (select / radio / checkbox) */
export const OPTION_FIELD_TYPES: BackendFieldType[] = ["select", "radio", "checkbox"];
