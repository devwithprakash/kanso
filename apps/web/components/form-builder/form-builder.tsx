"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, Reorder } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  GripVertical,
  Type,
  Mail,
  Hash,
  AlignLeft,
  ChevronDown,
  ListChecks,
  FileText,
  SlidersHorizontal,
  Phone,
  Radio,
  Calendar,
  FileUp,
  Globe,
  Link2,
  Lock,
  Eye,
  UploadCloud,
  Copy,
  Check,
  QrCode,
  Settings2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useGetForm, useUpdateForm } from "@/hooks/form/use-forms";
import { useSyncFormFields } from "@/hooks/form/use-form-field";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

import type {
  FormFieldOption,
  BackendFieldType,
  VisibilityType,
  FormField,
  VisibilityOption,
  ThemeType,
  ThemeOption,
} from "@/types/form-builder";

import {
  fieldTypes,
  defaultFieldData,
  visibilityOptions,
  themeOptions,
} from "@/constants/form-builder";

export function FormBuilder() {
  const params = useParams();
  const formId = params.formId as string;

  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [theme, setTheme] = useState<ThemeType>("clean-zen");
  const [isThemePopoverOpen, setIsThemePopoverOpen] = useState(false);
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const pointerDownRef = useRef<{ x: number; y: number } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);
  const [isMobileAddFieldsOpen, setIsMobileAddFieldsOpen] = useState(false);
  const [visibility, setVisibility] = useState<VisibilityType>("private");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { form, isLoading } = useGetForm(formId);
  const { syncFieldsMutation } = useSyncFormFields();
  const { updateFormMutation } = useUpdateForm();

  const publicFormUrl =
    typeof window !== "undefined" ? `${window.location.origin}/form/${formId}` : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicFormUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  useEffect(() => {
    if (form) {
      setFormName(form.title);
      setFormDescription(form.description || "");
      setIsPublished(form.isPublished);
      setTheme(form.theme as ThemeType);
      if (form.formFields) {
        setFields(form.formFields as FormField[]);
      }
      setVisibility(form.visibility as VisibilityType);
    }
  }, [form]);

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const handleSelectField = (id: string) => {
    setSelectedFieldId(id);
    if (window.innerWidth < 1024) {
      setIsMobileSettingsOpen(true);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleClickWithDragCheck = (e: React.MouseEvent, fieldId: string) => {
    if (pointerDownRef.current) {
      const dx = Math.abs(e.clientX - pointerDownRef.current.x);
      const dy = Math.abs(e.clientY - pointerDownRef.current.y);
      if (dx > 5 || dy > 5) {
        // Drag occurred, ignore click
        return;
      }
    }
    handleSelectField(fieldId);
  };

  const addField = useCallback(
    (type: BackendFieldType) => {
      const newField: FormField = {
        id: `field-${Date.now()}`,
        formId,
        type,
        label: defaultFieldData[type]?.label || "Custom Data Input Field",
        placeholder: defaultFieldData[type]?.placeholder,
        required: false,
        order: fields.length,
        options: defaultFieldData[type]?.options
          ? (JSON.parse(JSON.stringify(defaultFieldData[type].options)) as FormFieldOption[])
          : undefined,
      };

      setFields((prev) => [...prev, newField]);
      setSelectedFieldId(newField.id);
      setIsMobileAddFieldsOpen(false);

      setTimeout(() => {
        if (window.innerWidth < 1024) {
          setIsMobileSettingsOpen(true);
        }
      }, 300);
    },
    [fields.length, formId],
  );

  const updateField = useCallback((id: string, updates: Partial<FormField>) => {
    setFields((prev) => prev.map((field) => (field.id === id ? { ...field, ...updates } : field)));
  }, []);

  const deleteField = useCallback(
    (id: string) => {
      setFields((prev) => {
        const remaining = prev.filter((field) => field.id !== id);
        return remaining.map((field, index) => ({ ...field, order: index }));
      });
      if (selectedFieldId === id) {
        setSelectedFieldId(null);
        setIsMobileSettingsOpen(false);
      }
    },
    [selectedFieldId],
  );

  const handleReorder = (reorderedFields: FormField[]) => {
    setFields(reorderedFields.map((field, index) => ({ ...field, order: index })));
  };

  const handleSave = async (options?: { publish?: boolean }) => {
    setIsSaving(true);
    const nextIsPublished = options?.publish ?? isPublished;
    try {
      const payload = fields.map((field) => ({
        id: field.id,
        formId: field.formId,
        label: field.label,
        type: field.type,
        order: field.order,
        required: field.required,
        placeholder: field.placeholder || undefined,
        helperText: field.helperText || undefined,
        minLength: field.minLength != null ? Number(field.minLength) : undefined,
        maxLength: field.maxLength != null ? Number(field.maxLength) : undefined,
        minValue: field.minValue != null ? Number(field.minValue) : undefined,
        maxValue: field.maxValue != null ? Number(field.maxValue) : undefined,
        options:
          field.options && ["select", "radio", "checkbox"].includes(field.type)
            ? field.options.map((opt, idx) => ({
                label: opt.label,
                value: opt.value,
                order: opt.order ?? idx,
              }))
            : undefined,
      }));

      await syncFieldsMutation.mutateAsync(payload);

      await Promise.all([
        updateFormMutation.mutateAsync({
          formId,
          title: formName,
          theme,
          description: formDescription,
          isPublished: nextIsPublished,
          visibility,
        }),
        syncFieldsMutation.mutateAsync(payload),
      ]);

      if (options?.publish) {
        setIsPublished(true);
      }
    } catch (err) {
      console.error("Failed to compile layout parameters configurations payload structure:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    window.open(`/form/${formId}`, "_blank", "noopener,noreferrer");
  };

  const getFieldIcon = (type: BackendFieldType) => {
    return fieldTypes.find((f) => f.type === type)?.icon || Type;
  };

  const renderFieldSettingsContent = (field: FormField) => {
    return (
      <div className="space-y-4 text-left">
        <div>
          <Label className="text-xs text-muted-foreground">Field Type Parameter</Label>
          <div className="mt-1.5 flex items-center gap-2 p-2 rounded-lg bg-secondary/50 capitalize font-mono text-xs">
            {field.type}
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Label</Label>
          <Input
            value={field.label}
            onChange={(e) => updateField(field.id, { label: e.target.value })}
            className="mt-1.5 bg-background"
            maxLength={100}
          />
        </div>

        {!["select", "radio", "checkbox", "date", "file"].includes(field.type) && (
          <div>
            <Label className="text-xs text-muted-foreground">Placeholder Text</Label>
            <Input
              value={field.placeholder || ""}
              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
              className="mt-1.5 bg-background"
              maxLength={100}
            />
          </div>
        )}

        <div>
          <Label className="text-xs text-muted-foreground">Helper Descriptive Subtext</Label>
          <Input
            value={field.helperText || ""}
            onChange={(e) => updateField(field.id, { helperText: e.target.value })}
            className="mt-1.5 bg-background"
            maxLength={200}
          />
        </div>

        {field.type === "number" && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Min Value</Label>
              <Input
                type="number"
                value={field.minValue ?? ""}
                onChange={(e) =>
                  updateField(field.id, {
                    minValue: e.target.value !== "" ? Number(e.target.value) : undefined,
                  })
                }
                className="mt-1.5 bg-background"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Max Value</Label>
              <Input
                type="number"
                value={field.maxValue ?? ""}
                onChange={(e) =>
                  updateField(field.id, {
                    maxValue: e.target.value !== "" ? Number(e.target.value) : undefined,
                  })
                }
                className="mt-1.5 bg-background"
              />
            </div>
          </div>
        )}

        {["text", "textarea", "email", "phone"].includes(field.type) && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Min String Length</Label>
              <Input
                type="number"
                value={field.minLength ?? ""}
                onChange={(e) =>
                  updateField(field.id, {
                    minLength: e.target.value !== "" ? parseInt(e.target.value, 10) : undefined,
                  })
                }
                className="mt-1.5 bg-background"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Max String Length</Label>
              <Input
                type="number"
                value={field.maxLength ?? ""}
                onChange={(e) =>
                  updateField(field.id, {
                    maxLength: e.target.value !== "" ? parseInt(e.target.value, 10) : undefined,
                  })
                }
                className="mt-1.5 bg-background"
              />
            </div>
          </div>
        )}

        {["select", "radio", "checkbox"].includes(field.type) &&
          (() => {
            const fieldOptions: FormFieldOption[] = field.options ?? field.fieldOptions ?? [];

            return (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Configure Options
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[11px] text-primary hover:bg-primary/10 px-2 gap-1"
                    onClick={() => {
                      const nextIndex = fieldOptions.length;
                      const newOption: FormFieldOption = {
                        label: `Option ${nextIndex + 1}`,
                        value: `option_${nextIndex + 1}`,
                        order: nextIndex,
                      };
                      updateField(field.id, { options: [...fieldOptions, newOption] });
                    }}
                  >
                    <Plus className="h-3 w-3" />
                    Add Option
                  </Button>
                </div>

                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 pb-1">
                  {fieldOptions.length > 0 ? (
                    fieldOptions.map((option: FormFieldOption, idx: number) => (
                      <div key={idx} className="flex items-center gap-1.5 group/option">
                        <div className="text-[10px] text-muted-foreground font-mono w-4 text-right select-none">
                          {idx + 1}.
                        </div>
                        <Input
                          value={option.label}
                          placeholder={`Option ${idx + 1}`}
                          className="h-8 text-xs bg-background flex-1"
                          onChange={(e) => {
                            const updatedOptions = [...fieldOptions];
                            const cleanValue = e.target.value
                              .trim()
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "_");

                            updatedOptions[idx] = {
                              ...option,
                              label: e.target.value,
                              value: cleanValue || `option_${idx + 1}`,
                              order: idx,
                            };
                            updateField(field.id, { options: updatedOptions });
                          }}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0 opacity-60 group-hover/option:opacity-100 transition-opacity"
                          disabled={fieldOptions.length <= 1}
                          onClick={() => {
                            const updatedOptions = fieldOptions.filter(
                              (_: FormFieldOption, i: number) => i !== idx,
                            );
                            updateField(field.id, {
                              options: updatedOptions.map((opt: FormFieldOption, i: number) => ({
                                ...opt,
                                order: i,
                              })),
                            });
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 border border-dashed rounded-lg bg-muted/20">
                      <p className="text-[11px] text-muted-foreground">
                        No options configured yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <p className="text-sm font-medium text-foreground">Required Constraint</p>
            <p className="text-xs text-muted-foreground">
              Force form tracking validators onto submission inputs
            </p>
          </div>
          <Switch
            checked={field.required}
            onCheckedChange={(checked) => updateField(field.id, { required: checked })}
          />
        </div>

        <Button
          variant="outline"
          className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 mt-4"
          onClick={() => deleteField(field.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Field
        </Button>
      </div>
    );
  };

  const renderFormSettingsContent = () => {
    return (
      <div className="space-y-6 text-left">
        <div>
          <Label className="text-xs text-muted-foreground">Form Title</Label>
          <Input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Untitled form"
            className="mt-1.5 bg-background"
            maxLength={100}
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Description</Label>
          <Textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="What is this form for?"
            className="mt-1.5 bg-background text-sm h-20 resize-none"
            maxLength={300}
          />
        </div>

        <div className="pt-4 border-t border-border/50">
          <Label className="text-xs text-muted-foreground">Share Link</Label>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Input value={publicFormUrl} readOnly className="bg-background text-xs h-9 truncate" />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={handleCopyLink}
            >
              {isCopied ? (
                <Check className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
          {!isPublished && (
            <p className="text-[11px] text-muted-foreground mt-1.5">
              Publish this form to make the link live.
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-border/50">
          <Label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
            <QrCode className="h-3.5 w-3.5" />
            QR Code
          </Label>
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 bg-secondary/20">
            {publicFormUrl && (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                  publicFormUrl,
                )}`}
                alt="QR code linking to this form"
                width={140}
                height={140}
                className="rounded-lg bg-white p-2"
              />
            )}
            <p className="text-[11px] text-muted-foreground text-center">
              Scan to open the form on any device.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <Label className="text-xs text-muted-foreground mb-2 block">Theme</Label>
          <div className="grid grid-cols-2 gap-2.5">
            {themeOptions.map((opt) => {
              const isActive = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  className={cn(
                    "relative flex flex-col items-center gap-2.5 pt-4 pb-3 px-3 rounded-2xl border bg-background transition-all",
                    isActive
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-border/50 hover:border-border",
                  )}
                >
                  {isActive && (
                    <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-primary-foreground fill-primary" />
                    </span>
                  )}

                  <span
                    className="h-6 w-14 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${opt.swatch.join(", ")})` }}
                  />

                  <span className="text-[11px] font-medium text-foreground leading-tight text-center">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <p className="animate-pulse text-sm text-zinc-500 font-mono">
          Syncing system interfaces...
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/forms">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="font-serif text-lg text-foreground truncate max-w-[120px] sm:max-w-xs">
            {formName || "Workspace Form Builder"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* in the header, replace the old conditional button with: */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden h-8 w-8 p-0"
            onClick={() => setIsMobileSettingsOpen(true)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="sr-only">Settings</span>
          </Button>


          {/* Visibility: Public / Unlisted / Private */}
          <div className="flex items-center gap-0.5 p-0.5 bg-muted/50 rounded-md border border-border/40 h-8">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 px-3 h-7 text-xs font-medium rounded transition-all duration-150 native-focus-accent",
                    visibility !== "private"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background text-foreground shadow-sm",
                  )}
                >
                  {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                  <ChevronDown className="h-3 w-3 opacity-70 ml-1" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-40 p-1" align="end">
                {visibilityOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setVisibility(item.id);
                      setIsPopoverOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm hover:bg-muted transition-colors",
                      visibility === item.id && "bg-muted font-medium",
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    {item.label}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {/* Preview */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 px-3 text-xs font-medium"
            onClick={handlePreview}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </Button>

          {/* Save draft */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 px-3 text-xs font-medium"
            onClick={() => handleSave()}
            disabled={isSaving || !formName}
          >
            <Save className="h-3.5 w-3.5" />
            {isSaving ? "Saving…" : "Save"}
          </Button>

          {/* Publish */}
          <Button
            size="sm"
            className="h-8 gap-1.5 px-3 text-xs font-medium"
            onClick={() => handleSave({ publish: true })}
            disabled={isSaving || !formName}
          >
            <UploadCloud className="h-3.5 w-3.5" />
            {isPublished ? "Published" : "Publish"}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-72 border-r border-border bg-card overflow-y-auto hidden lg:block shrink-0">
          <div className="p-5">
            <h3 className="font-semibold text-foreground text-sm mb-1">Add Dynamic Elements</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Inject fields into your custom layouts context arrays
            </p>

            <div className="space-y-1.5">
              {fieldTypes.map((fieldType) => {
                const Icon = fieldType.icon;
                return (
                  <button
                    key={fieldType.type}
                    onClick={() => addField(fieldType.type as BackendFieldType)}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl border border-border/50 text-left hover:border-primary/50 hover:bg-secondary/50 transition-all group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-xs text-foreground mt-0.5">
                        {fieldType.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {fieldType.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-secondary/30 p-4 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-border/50 bg-secondary/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    <span>Canvas Workspace</span>
                  </div>
                  <h1 className="font-serif text-2xl text-foreground font-semibold tracking-tight">
                    {formName || "Untitled Core Survey Template"}
                  </h1>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {formDescription || "No custom target description configured yet."}
                  </p>
                </div>
              </div>

              <div className="p-6">
                {fields.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                    <h3 className="font-medium text-sm text-foreground">
                      Workspace canvas is completely empty
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                      Select inputs options directly inside side control panels to initialize form
                      objects.
                    </p>
                  </div>
                ) : (
                  <Reorder.Group
                    axis="y"
                    values={fields}
                    onReorder={handleReorder}
                    className="flex flex-col gap-3"
                  >
                    {fields.map((field) => {
                      const Icon = getFieldIcon(field.type);
                      return (
                        <Reorder.Item key={field.id} value={field}>
                          <div
                            className={cn(
                              "group relative bg-secondary/20 rounded-xl p-4 border-2 transition-all cursor-pointer pl-10",
                              selectedFieldId === field.id
                                ? "border-primary"
                                : "border-transparent hover:border-border",
                            )}
                            onPointerDown={handlePointerDown}
                            onClick={(e) => handleClickWithDragCheck(e, field.id)}
                          >
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 cursor-grab">
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs text-foreground font-semibold flex items-center gap-1.5">
                                <Icon className="h-3.5 w-3.5 text-primary" />
                                <span>{field.label}</span>
                                {field.required && <span className="text-destructive">*</span>}
                              </Label>

                              {field.helperText && (
                                <p className="text-[11px] text-muted-foreground italic">
                                  {field.helperText}
                                </p>
                              )}

                              <div className="pt-1.5">
                                {field.type === "textarea" ? (
                                  <Textarea
                                    placeholder={field.placeholder}
                                    className="bg-card text-xs h-16"
                                    disabled
                                  />
                                ) : ["select", "radio", "checkbox"].includes(field.type) ? (
                                  <div className="flex flex-wrap gap-2 p-2 rounded-lg bg-background/50 border border-border/40">
                                    {field.options?.length ? (
                                      field.options.map((opt, i) => (
                                        <span
                                          key={i}
                                          className="text-[11px] font-mono bg-secondary px-2 py-0.5 rounded border"
                                        >
                                          {opt.label}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-[10px] text-muted-foreground italic">
                                        No options loaded.
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <Input
                                    type={field.type === "phone" ? "text" : field.type}
                                    placeholder={field.placeholder}
                                    className="bg-card text-xs h-8"
                                    disabled
                                  />
                                )}
                              </div>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteField(field.id);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                )}
              </div>
            </motion.div>
          </div>
        </main>

        <aside className="w-72 xl:w-80 border-l border-border bg-card overflow-y-auto hidden lg:block shrink-0">
          {selectedField ? (
            <div className="p-5">
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <button
                  onClick={() => setSelectedFieldId(null)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Field Options
                </button>
              </div>
              {renderFieldSettingsContent(selectedField)}
            </div>
          ) : (
            <div className="p-5">
              <div className="flex items-center gap-1.5 mb-4 border-b pb-2 text-foreground text-xs font-semibold uppercase tracking-wider">
                <Settings2 className="h-3.5 w-3.5 text-primary" />
                Form Settings
              </div>
              {renderFormSettingsContent()}
            </div>
          )}
        </aside>
      </div>

      <Sheet open={isMobileAddFieldsOpen} onOpenChange={setIsMobileAddFieldsOpen}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="text-left font-semibold text-sm">Add Elements</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-1 gap-1.5 mt-3 overflow-y-auto max-h-[60vh] pb-6">
            {fieldTypes.map((fieldType) => {
              const Icon = fieldType.icon;
              return (
                <button
                  key={fieldType.type}
                  onClick={() => addField(fieldType.type as BackendFieldType)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:bg-secondary/30 text-left"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-xs text-foreground">{fieldType.label}</p>
                    <p className="text-[10px] text-muted-foreground">{fieldType.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isMobileSettingsOpen} onOpenChange={setIsMobileSettingsOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
          <SheetHeader className="text-left border-b pb-2 mb-3">
            <SheetTitle className="text-xs font-semibold flex items-center gap-1.5">
              {selectedField ? (
                <>
                  <SlidersHorizontal className="h-3.5 w-3.5 text-primary" /> Field Options
                </>
              ) : (
                <>
                  <Settings2 className="h-3.5 w-3.5 text-primary" /> Form Settings
                </>
              )}
            </SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[72vh] pb-8">
            {selectedField
              ? renderFieldSettingsContent(selectedField)
              : renderFormSettingsContent()}
          </div>
        </SheetContent>
      </Sheet>

      {/* add just before the closing </div> of the outer "fixed inset-0" wrapper, after the two <Sheet> blocks */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 border-t border-border bg-card/95 backdrop-blur-sm px-4 py-3 flex gap-2 z-20">
        <Button
          variant="outline"
          className="flex-1 h-10 gap-1.5 text-xs font-medium"
          onClick={() => setIsMobileAddFieldsOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Field
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-10 gap-1.5 text-xs font-medium"
          onClick={() => setIsMobileSettingsOpen(true)}
        >
          <Settings2 className="h-4 w-4" />
          {selectedField ? "Field Options" : "Form Settings"}
        </Button>
      </div>
    </div>
  );
}
