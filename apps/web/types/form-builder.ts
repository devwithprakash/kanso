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


export interface VisibilityOption {
  id: VisibilityType;
  label: string;
  icon: React.ElementType;
}

export type ThemeType =
  | "cherry-blossom"
  | "cyber-sunset"
  | "clean-zen"
  | "ocean-mist"
  | "lavender-dream";

export interface ThemeOption {
  id: ThemeType;
  label: string;
  description: string;
  /** Gradient stops used for the preview swatch */
  swatch: string[];
}
