import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OceanMistBackground } from "@/components/backgrounds/ocean-mist";
import { FormThemeKit } from "@/constants/theme";

export const oceanMistTheme: FormThemeKit = {
  Page: ({ children }) => (
    <div className="relative min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-20 bg-[#eef6f7]">
      <OceanMistBackground />
      <div className="relative z-10 w-full max-w-xl">{children}</div>
    </div>
  ),

  HeaderCard: ({ children }) => (
    <div className="bg-white/80 backdrop-blur-md border border-[#bfe0e4] shadow-sm rounded-2xl overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#6fa8b5] via-[#8fc0c9] to-[#6fa8b5] opacity-50" />
      <div className="px-8 py-7">{children}</div>
    </div>
  ),

  BodyCard: ({ children }) => (
    <div className="bg-white/80 backdrop-blur-md border border-[#bfe0e4] shadow-sm rounded-2xl overflow-hidden px-8 py-7">
      {children}
    </div>
  ),

  Divider: () => <hr className="border-[#d9eef1] border-t mb-7" />,

  OptionalBadge: () => (
    <span className="bg-[#e3f3f5] text-[#5f95a1] text-[10px] font-semibold px-2 py-0.5 rounded-full">
      optional
    </span>
  ),

  FieldNumber: ({ children }) => (
    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#e3f3f5] text-[#5f95a1] text-[10px] font-bold flex items-center justify-center">
      {children}
    </span>
  ),

  FieldLabel: ({ children }) => (
    <span className="text-xs font-semibold text-[#3d6a75] uppercase tracking-wide">
      {children}
    </span>
  ),

  HelperText: ({ children }) => (
    <p className="text-xs text-[#7fa8b0] mt-1">{children}</p>
  ),

  RequiredMark: () => (
    <span className="text-[#d97a6c] text-xs font-bold leading-none">*</span>
  ),

  Input: ({ className, ...props }) => (
    <Input
      className={cn(
        "w-full text-sm h-10 bg-white border border-[#bfe0e4] rounded-lg focus-visible:ring-2 focus-visible:ring-[#6fa8b5]/30 placeholder:text-[#a9c8ce]",
        className
      )}
      {...props}
    />
  ),

  Textarea: ({ className, ...props }) => (
    <Textarea
      className={cn(
        "w-full text-sm bg-white border border-[#bfe0e4] rounded-lg h-auto min-h-[100px] py-2.5 resize-none placeholder:text-[#a9c8ce]",
        className
      )}
      {...props}
    />
  ),

  selectTriggerClassName:
    "w-full text-sm h-10 bg-white border border-[#bfe0e4] rounded-lg",

  RadioDot: ({ selected }) => (
    <span
      className={cn(
        "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
        selected ? "border-[#3d6a75]" : "border-[#bfe0e4] group-hover:border-[#6fa8b5]"
      )}
    >
      {selected && <span className="w-2 h-2 rounded-full bg-[#3d6a75]" />}
    </span>
  ),

  SubmitButton: ({ className, ...props }) => (
    <Button
      className={cn(
        "w-full text-sm font-semibold h-11 bg-[#3d6a75] hover:bg-[#335a63] text-white rounded-xl transition-colors",
        className
      )}
      {...props}
    />
  ),

  ErrorBox: ({ children }) => (
    <div className="flex items-start gap-2 text-[#b5583f] text-sm bg-[#fbf0ec] border border-[#f0dad0] p-3 rounded-xl">
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  ),

  SuccessIcon: () => <CheckCircle2 className="w-8 h-8 text-[#6fa8b5]" />,
  successTitleClassName: "text-[#2d4d55]",
  successSubtitleClassName: "text-[#7fa8b0]",
};