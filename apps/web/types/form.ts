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
