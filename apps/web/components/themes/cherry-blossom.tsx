// components/form-themes/cherry-blossom.tsx
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CherryBlossomBackground } from "@/components/backgrounds/cherry-blossom";
import { FormThemeKit } from "@/constants/theme";

export const cherryBlossomTheme: FormThemeKit = {
  Page: ({ children }) => (
    <div className="relative min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-20 bg-[#fafafa]">
      <CherryBlossomBackground />
      <div className="relative z-10 w-full max-w-xl">{children}</div>
    </div>
  ),

  HeaderCard: ({ children }) => (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 opacity-40" />
      <div className="px-8 py-7">{children}</div>
    </div>
  ),

  BodyCard: ({ children }) => (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden px-8 py-7">
      {children}
    </div>
  ),

  Divider: () => <hr className="border-slate-100 border-t mb-7" />,

  OptionalBadge: () => (
    <span className="bg-slate-100 text-slate-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
      optional
    </span>
  ),

  FieldNumber: ({ children }) => (
    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-bold flex items-center justify-center">
      {children}
    </span>
  ),

  FieldLabel: ({ children }) => (
    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
      {children}
    </span>
  ),

  HelperText: ({ children }) => (
    <p className="text-xs text-slate-400 mt-1">{children}</p>
  ),

  RequiredMark: () => (
    <span className="text-red-400 text-xs font-bold leading-none">*</span>
  ),

  Input: ({ className, ...props }) => (
    <Input
      className={cn(
        "w-full text-sm h-10 bg-slate-50 border border-slate-200 rounded-lg focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-slate-400",
        className
      )}
      {...props}
    />
  ),

  Textarea: ({ className, ...props }) => (
    <Textarea
      className={cn(
        "w-full text-sm bg-slate-50 border border-slate-200 rounded-lg h-auto min-h-[100px] py-2.5 resize-none placeholder:text-slate-400",
        className
      )}
      {...props}
    />
  ),

  selectTriggerClassName:
    "w-full text-sm h-10 bg-slate-50 border border-slate-200 rounded-lg",

  RadioDot: ({ selected }) => (
    <span
      className={cn(
        "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
        selected ? "border-current" : "border-current/20 group-hover:border-current/50"
      )}
    >
      {selected && <span className="w-2 h-2 rounded-full bg-current" />}
    </span>
  ),

  SubmitButton: ({ className, ...props }) => (
    <Button
      className={cn(
        "w-full text-sm font-semibold h-11 bg-slate-900 hover:bg-slate-700 text-white rounded-xl transition-colors",
        className
      )}
      {...props}
    />
  ),

  ErrorBox: ({ children }) => (
    <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-100 p-3 rounded-xl">
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  ),

  SuccessIcon: () => <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
  successTitleClassName: "text-slate-800",
  successSubtitleClassName: "text-slate-500",
};