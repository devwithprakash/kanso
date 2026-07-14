// ─── Frontend API / Hook Data Types ──────────────────────────────────────────
export type FieldValue = string | number | boolean | string[] | null;

export interface FormFieldOption {
  label: string;
  value: string;
  order: number;
}

export interface FieldOption {
  id: string;
  fieldId: string;
  value: string;
  label: string;
  order: number;
}

export interface FormField {
  id: string;
  formId: string;
  label: string;
  type:
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
  order: number;
  required: boolean;
  placeholder?: string | null;
  helperText?: string | null;
  fieldOptions: FieldOption[];
}

export type FormData = Record<string, FieldValue>;

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
  description: string;
  theme: "clean-zen" | "cyber-sunset" | "cherry-blossom" | "ocean-mist" | "lavender-dream";
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
  id: string;
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

export interface FormConfigData {
  id: string;
  title: string;
  description: string | null;
  theme: string;
  visibility: "public" | "unlisted" | "private";
  slug: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string | null;
}
