// ─── Frontend API / Hook Data Types ──────────────────────────────────────────

export interface FormFieldOption {
  label: string;
  value: string;
  order: number;
}

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "phone"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "file";

export type Field = {
  id: string;
  label: string;
  type: FieldType;
  order: number;
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  maxValue?: number;
  minValue?: number;
  options?: FormFieldOption[];
};

// ─── Hook / API Response Types ────────────────────────────────────────────────

export interface FormRecord {
  id: string;
  title: string;
  description: string | null;
  theme: "clean-zen" | "cyber-sunset" | "cherry-blossom" | "forest-state";
  visibility: "private" | "public" | "unlisted";
  slug: string;
  isPublished: boolean;
  createdBy: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  formFields?: any[];
}

export type FormFieldOptionData = {
  label: string;
  value: string;
  order: number;
};

export type FormFieldData = {
  label: string;
  type: FieldType;
  required: boolean;
  order: number;
  placeholder?: string | null;
  maxLength?: number | null;
  minValue?: number | null;
  maxValue?: number | null;
  options?: FormFieldOptionData[];
};
