// ─── Form Builder TypeScript Types ───────────────────────────────────────────

export interface FormFieldOption {
  label: string;
  value: string;
  order: number;
}

export type BackendFieldType =
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

export type VisibilityType = "public" | "unlisted" | "private";

export interface FormField {
  id: string;
  formId: string;
  label: string;
  type: BackendFieldType;
  order: number;
  required: boolean;
  placeholder?: string;
  helperText?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  options?: FormFieldOption[];
  /** Backend alias for options returned from DB */
  fieldOptions?: FormFieldOption[];
}

export interface VisibilityOption {
  id: VisibilityType;
  label: string;
  icon: React.ElementType;
}

export type ThemeType =
  | "cherry-blossom"
  | "cyber-sunset"
  | "clean-zen"
  | "forest-state";

export interface ThemeOption {
  id: ThemeType;
  label: string;
  description: string;
  /** Gradient stops used for the preview swatch */
  swatch: string[];
}
