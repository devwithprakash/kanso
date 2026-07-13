// components/form-themes/clean-zen.tsx
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CleanZenBackground } from "@/components/backgrounds/clean-zen";
import { FormThemeKit } from "@/constants/theme";

export const cleanZenTheme: FormThemeKit = {
  Page: ({ children }) => (
    <div className="relative min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-20 bg-[#FAFAF8]">
      <CleanZenBackground />
      <div className="relative z-10 w-full max-w-xl">{children}</div>
    </div>
  ),

  HeaderCard: ({ children }) => (
    <div className="bg-white/90 backdrop-blur-sm border border-[#E5E2D9] shadow-sm rounded-2xl overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#A8B5A0] via-[#8A7F6A] to-[#A8B5A0] opacity-30" />
      <div className="px-8 py-7">{children}</div>
    </div>
  ),

  BodyCard: ({ children }) => (
    <div className="bg-white/90 backdrop-blur-sm border border-[#E5E2D9] shadow-sm rounded-2xl overflow-hidden px-8 py-7">
      {children}
    </div>
  ),

  Divider: () => <hr className="border-[#EDEAE0] border-t mb-7" />,

  OptionalBadge: () => (
    <span className="bg-[#F0EEE7] text-[#8A8578] text-[10px] font-semibold px-2 py-0.5 rounded-full">
      optional
    </span>
  ),

  FieldNumber: ({ children }) => (
    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#F0EEE7] text-[#8A8578] text-[10px] font-bold flex items-center justify-center">
      {children}
    </span>
  ),

  FieldLabel: ({ children }) => (
    <span className="text-xs font-semibold text-[#5B6558] uppercase tracking-wide">
      {children}
    </span>
  ),

  HelperText: ({ children }) => (
    <p className="text-xs text-[#A19B8C] mt-1">{children}</p>
  ),

  RequiredMark: () => (
    <span className="text-[#B5735A] text-xs font-bold leading-none">*</span>
  ),

  Input: ({ className, ...props }) => (
    <Input
      className={cn(
        "w-full text-sm h-10 bg-[#F7F6F2] border border-[#E5E2D9] rounded-lg focus-visible:ring-2 focus-visible:ring-[#A8B5A0]/30 placeholder:text-[#B5B0A2]",
        className
      )}
      {...props}
    />
  ),

  Textarea: ({ className, ...props }) => (
    <Textarea
      className={cn(
        "w-full text-sm bg-[#F7F6F2] border border-[#E5E2D9] rounded-lg h-auto min-h-[100px] py-2.5 resize-none placeholder:text-[#B5B0A2]",
        className
      )}
      {...props}
    />
  ),

  selectTriggerClassName:
    "w-full text-sm h-10 bg-[#F7F6F2] border border-[#E5E2D9] rounded-lg",

  RadioDot: ({ selected }) => (
    <span
      className={cn(
        "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
        selected ? "border-[#5B6558]" : "border-[#D4D0C4] group-hover:border-[#A8B5A0]"
      )}
    >
      {selected && <span className="w-2 h-2 rounded-full bg-[#5B6558]" />}
    </span>
  ),

  SubmitButton: ({ className, ...props }) => (
    <Button
      className={cn(
        "w-full text-sm font-semibold h-11 bg-[#5B6558] hover:bg-[#4A5348] text-white rounded-xl transition-colors",
        className
      )}
      {...props}
    />
  ),

  ErrorBox: ({ children }) => (
    <div className="flex items-start gap-2 text-[#A2543E] text-sm bg-[#FBF0EC] border border-[#F0DAD0] p-3 rounded-xl">
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  ),

  SuccessIcon: () => <CheckCircle2 className="w-8 h-8 text-[#7A9B6E]" />,
  successTitleClassName: "text-[#3D3D3A]",
  successSubtitleClassName: "text-[#8A8578]",
};