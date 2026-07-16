import { FormField } from "@/types/form";
import { z } from "zod";

function buildTypeSchema(field: FormField): z.ZodTypeAny {
  switch (field.type) {
    case "email":
      return z.string().trim().email("Enter a valid email address");

    case "phone":
      return z
        .string()
        .trim()
        .regex(/^(?:\+91[\s-]?|91[\s-]?|0)?[6-9]\d{9}$/, "Enter a valid Indian mobile number");

    case "number": {
      let num = z.coerce.number({ error: "Enter a valid number" });
      if (field.minValue != null)
        num = num.min(field.minValue, `Must be at least ${field.minValue}`);
      if (field.maxValue != null)
        num = num.max(field.maxValue, `Must be at most ${field.maxValue}`);
      return num;
    }

    case "date":
      return z
        .string()
        .trim()
        .refine((val) => !Number.isNaN(Date.parse(val)), {
          message: "Enter a valid date",
        });

    case "select":
    case "radio": {
      const allowed = field.fieldOptions?.map((o) => o.value) ?? [];
      return allowed.length
        ? z.enum(allowed as [string, ...string[]], { error: "Select a valid option" })
        : z.string();
    }

    case "checkbox":
      return z.boolean();

    case "text":
    case "textarea":
    default: {
      let str = z.string().trim();
      if (field.maxLength != null)
        str = str.max(field.maxLength, `Must be at most ${field.maxLength} characters`);
      return str;
    }
  }
}

function isEmptyValue(val: unknown): boolean {
  return (
    val === undefined ||
    val === null ||
    val === "" ||
    (Array.isArray(val) && val.length === 0) ||
    val === false
  );
}

export function buildFieldSchema(field: FormField): z.ZodTypeAny {
  const typeSchema = buildTypeSchema(field);

  if (field.type === "checkbox") {
    return field.required
      ? typeSchema.refine((val) => val === true, {
          message: `Please complete the required field: "${field.label}"`,
        })
      : typeSchema.optional();
  }

  return z.any().superRefine((val, ctx) => {
    const empty = isEmptyValue(val);

    if (empty) {
      if (field.required) {
        ctx.addIssue({
          code: "custom",
          message: `"${field.label}" is required`,
        });
      }
      return;
    }

    const result = typeSchema.safeParse(val);
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({
          code: "custom",
          message: issue.message,
          path: issue.path,
        });
      }
    }
  });
}

export function buildFormSchema(fields: FormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    shape[field.id] = buildFieldSchema(field);
  }
  return z.object(shape);
}
