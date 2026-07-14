type FieldLabelProps = {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

export function Label({ children, required, className}: FieldLabelProps) {
  return (
    <label className={`mb-1.5 flex items-center gap-1 text-sm text-foreground/80 ${className}`}>
      {children}
      {required && <span className="text-[oklch(0.55_0.18_25)]">*</span>}
    </label>
  );
}