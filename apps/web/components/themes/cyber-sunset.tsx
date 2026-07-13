// components/form-themes/cyber-sunset.tsx
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CyberSunsetBackground } from "@/components/backgrounds/cyber-sunset";
import { FormThemeKit } from "@/constants/theme";

export const cyberSunsetTheme: FormThemeKit = {
  Page: ({ children }) => (
    <div className="relative min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-20 bg-[#1a0b2e]">
      <CyberSunsetBackground />
      <div className="relative z-10 w-full max-w-xl text-white">{children}</div>
    </div>
  ),

  HeaderCard: ({ children }) => (
    <div className="bg-[#2a1440]/80 backdrop-blur-md border border-[#ff8c42]/30 shadow-lg shadow-[#ff5f8f]/10 rounded-2xl overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#ffd66b] via-[#ff8c42] to-[#ff5f8f]" />
      <div className="px-8 py-7">{children}</div>
    </div>
  ),

  BodyCard: ({ children }) => (
    <div className="bg-[#2a1440]/80 backdrop-blur-md border border-[#ff8c42]/30 shadow-lg shadow-[#ff5f8f]/10 rounded-2xl overflow-hidden px-8 py-7">
      {children}
    </div>
  ),

  Divider: () => <hr className="border-[#ff8c42]/15 border-t mb-7" />,

  OptionalBadge: () => (
    <span className="bg-[#ff8c42]/10 text-[#ff8c42] text-[10px] font-semibold px-2 py-0.5 rounded-full">
      optional
    </span>
  ),

  FieldNumber: ({ children }) => (
    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#ff5f8f]/15 text-[#ff8c9f] text-[10px] font-bold flex items-center justify-center">
      {children}
    </span>
  ),

  FieldLabel: ({ children }) => (
    <span className="text-xs font-semibold text-[#ffd6e0] uppercase tracking-wide">
      {children}
    </span>
  ),

  HelperText: ({ children }) => (
    <p className="text-xs text-[#c9a8d4] mt-1">{children}</p>
  ),

  RequiredMark: () => (
    <span className="text-[#ff8c42] text-xs font-bold leading-none">*</span>
  ),

  Input: ({ className, ...props }) => (
    <Input
      className={cn(
        "w-full text-sm h-10 bg-[#1a0b2e] border border-[#ff8c42]/25 text-white rounded-lg focus-visible:ring-2 focus-visible:ring-[#ff5f8f]/40 placeholder:text-[#7a6690]",
        className
      )}
      {...props}
    />
  ),

  Textarea: ({ className, ...props }) => (
    <Textarea
      className={cn(
        "w-full text-sm bg-[#1a0b2e] border border-[#ff8c42]/25 text-white rounded-lg h-auto min-h-[100px] py-2.5 resize-none placeholder:text-[#7a6690]",
        className
      )}
      {...props}
    />
  ),

  selectTriggerClassName:
    "w-full text-sm h-10 bg-[#1a0b2e] border border-[#ff8c42]/25 text-white rounded-lg",

  RadioDot: ({ selected }) => (
    <span
      className={cn(
        "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
        selected ? "border-[#ff8c42]" : "border-[#ff8c42]/25 group-hover:border-[#ff8c42]/60"
      )}
    >
      {selected && <span className="w-2 h-2 rounded-full bg-[#ff8c42]" />}
    </span>
  ),

  SubmitButton: ({ className, ...props }) => (
    <Button
      className={cn(
        "w-full text-sm font-semibold h-11 bg-gradient-to-r from-[#ff8c42] to-[#ff5f8f] hover:brightness-110 text-white rounded-xl transition-all",
        className
      )}
      {...props}
    />
  ),

  ErrorBox: ({ children }) => (
    <div className="flex items-start gap-2 text-[#ff9d9d] text-sm bg-[#3a1030]/60 border border-[#ff5f8f]/30 p-3 rounded-xl">
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  ),

  SuccessIcon: () => <CheckCircle2 className="w-8 h-8 text-[#ffd66b]" />,
  successTitleClassName: "text-white",
  successSubtitleClassName: "text-[#c9a8d4]",
};