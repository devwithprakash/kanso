// components/form-themes/lavender-dream.tsx
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LavenderDreamBackground } from "@/components/backgrounds/lavender-dream";
import { FormThemeKit } from "@/constants/theme";

export const lavenderDreamTheme: FormThemeKit = {
  Page: ({ children }) => (
    <div className="relative min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-20 bg-[#f5f0fa]">
      <LavenderDreamBackground />
      <div className="relative z-10 w-full max-w-xl">{children}</div>
    </div>
  ),

  HeaderCard: ({ children }) => (
    <div className="bg-white/85 backdrop-blur-md border border-[#e0d0ef] shadow-sm rounded-2xl overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#c9b6e4] via-[#e8b4d8] to-[#c9b6e4] opacity-50" />
      <div className="px-8 py-7">{children}</div>
    </div>
  ),

  BodyCard: ({ children }) => (
    <div className="bg-white/85 backdrop-blur-md border border-[#e0d0ef] shadow-sm rounded-2xl overflow-hidden px-8 py-7">
      {children}
    </div>
  ),

  Divider: () => <hr className="border-[#ede0f5] border-t mb-7" />,

  OptionalBadge: () => (
    <span className="bg-[#f2e8fa] text-[#9679b0] text-[10px] font-semibold px-2 py-0.5 rounded-full">
      optional
    </span>
  ),

  FieldNumber: ({ children }) => (
    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#f2e8fa] text-[#9679b0] text-[10px] font-bold flex items-center justify-center">
      {children}
    </span>
  ),

  FieldLabel: ({ children }) => (
    <span className="text-xs font-semibold text-[#6b4d8a] uppercase tracking-wide">
      {children}
    </span>
  ),

  HelperText: ({ children }) => (
    <p className="text-xs text-[#b09dc7] mt-1">{children}</p>
  ),

  RequiredMark: () => (
    <span className="text-[#d17ba0] text-xs font-bold leading-none">*</span>
  ),

  Input: ({ className, ...props }) => (
    <Input
      className={cn(
        "w-full text-sm h-10 bg-white border border-[#e0d0ef] rounded-lg focus-visible:ring-2 focus-visible:ring-[#c9b6e4]/40 placeholder:text-[#c7b8dd]",
        className
      )}
      {...props}
    />
  ),

  Textarea: ({ className, ...props }) => (
    <Textarea
      className={cn(
        "w-full text-sm bg-white border border-[#e0d0ef] rounded-lg h-auto min-h-[100px] py-2.5 resize-none placeholder:text-[#c7b8dd]",
        className
      )}
      {...props}
    />
  ),

  selectTriggerClassName:
    "w-full text-sm h-10 bg-white border border-[#e0d0ef] rounded-lg",

  RadioDot: ({ selected }) => (
    <span
      className={cn(
        "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
        selected ? "border-[#8a5fb0]" : "border-[#e0d0ef] group-hover:border-[#c9b6e4]"
      )}
    >
      {selected && <span className="w-2 h-2 rounded-full bg-[#8a5fb0]" />}
    </span>
  ),

  SubmitButton: ({ className, ...props }) => (
    <Button
      className={cn(
        "w-full text-sm font-semibold h-11 bg-gradient-to-r from-[#a884c9] to-[#d896c0] hover:brightness-105 text-white rounded-xl transition-all",
        className
      )}
      {...props}
    />
  ),

  ErrorBox: ({ children }) => (
    <div className="flex items-start gap-2 text-[#b5507a] text-sm bg-[#fbeef5] border border-[#f0d0e2] p-3 rounded-xl">
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  ),

  SuccessIcon: () => <CheckCircle2 className="w-8 h-8 text-[#a884c9]" />,
  successTitleClassName: "text-[#4a3563]",
  successSubtitleClassName: "text-[#b09dc7]",
};