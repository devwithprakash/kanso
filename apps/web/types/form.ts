export type FieldValue = string | number | boolean | string[] | null;

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

export type FormTheme =
  | "clean-zen"
  | "cyber-sunset"
  | "cherry-blossom"
  | "ocean-mist"
  | "lavender-dream";

export type FormVisibility = "public" | "private" | "unlisted";

//-------------- common form fields -----------------

export interface FieldOptions {
  label: string;
  value: string;
  order: number;
}

export type Field = {
  id: string;
  formId: string;
  label: string;
  type: FieldType;
  order: number;
  required: boolean;

  placeholder: string | null;
  maxLength: number | null;
  maxValue: number | null;
  minValue: number | null;
  fieldOptions: FieldOptions[];
};

export interface FormRecord {
  id: string;
  title: string;
  description: string;

  theme: FormTheme;
  visibility: FormVisibility;
  slug: string;

  createdBy: string;
  createdAt: Date;
  updatedAt: Date | null;

  formFields: Field[];
}
