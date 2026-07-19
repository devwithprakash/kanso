import { cn } from "@/lib/utils";

type FieldLabelProps = {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

export function Label({ children, required, className }: FieldLabelProps) {
  return (
    <label className={cn("mb-1.5 flex items-center gap-1 text-sm font-medium", className)}>
      {children}
      {required && <span className="text-[oklch(0.55_0.18_25)]">*</span>}
    </label>
  );
}
