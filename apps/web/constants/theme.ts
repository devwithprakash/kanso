import { ThemeKey } from "@/types/theme";
import type { ReactNode, ComponentProps } from "react";
import type { Input } from "@/components/ui/input";
import type { Textarea } from "@/components/ui/textarea";
import type { Button } from "@/components/ui/button";

export const THEMES: Record<
  ThemeKey,
  { name: string; swatch: string; bg: string; accent: string }
> = {
  "clean-zen": {
    name: "Clean Zen",
    swatch: "bg-[oklch(0.42_0.045_150)]",
    bg: "bg-[oklch(0.97_0.012_120)]",
    accent: "text-[oklch(0.42_0.045_150)]",
  },
  "cyber-sunset": {
    name: "Cyber Sunset",
    swatch: "bg-[oklch(0.85_0.04_75)]",
    bg: "bg-[oklch(0.98_0.02_85)]",
    accent: "text-[oklch(0.45_0.06_60)]",
  },
  "cherry-blossom": {
    name: "Cherry Blossom",
    swatch: "bg-[oklch(0.78_0.08_15)]",
    bg: "bg-[oklch(0.97_0.015_20)]",
    accent: "text-[oklch(0.45_0.08_15)]",
  },
  "ocean-mist": {
    name: "Ocean Mist",
    swatch: "bg-[oklch(0.56_0.06_225)]",
    bg: "bg-[oklch(0.98_0.01_220)]",
    accent: "text-[oklch(0.46_0.06_225)]",
  },
  "lavender-dream": {
    name: "Lavender Dream",
    swatch: "bg-[oklch(0.68_0.07_300)]",
    bg: "bg-[oklch(0.98_0.012_300)]",
    accent: "text-[oklch(0.48_0.07_300)]",
  },
};

export const themeStyles: Record<
  ThemeKey,
  {
    title: string;
    page: string;
    headerCard: string;
    bodyCard: string;
    input: string;
    label: string;
    helperText: string;
    divider: string;
    btn: string;
    errorBox: string;
    badge: string;
    fieldNumber: string;
    successIcon: string;
    successTitle: string;
    successSubtitle: string;
    radio: string;
    checkbox: string;
    radioDot: string;
    description: string;
    emptyIconWrapper: string;
    emptyIcon: string;
    emptyTitle: string;
    emptyDescription: string;
    emptyDivider: string;
    emptyFooter: string;
    optionText: string;
  }
> = {
  "clean-zen": {
    title: "text-[#243428] font-semibold",
    description: "text-sm leading-7 font-normal text-[#64786d] max-w-prose",
    radio:
      "border-[#5f7d68]/20 group-hover:border-[#5f7d68]/50 data-[checked=true]:border-[#5f7d68]",
    radioDot: "bg-[#5f7d68]",
    checkbox:
      "border-[#5f7d68]/30 data-[state=checked]:bg-[#5f7d68] data-[state=checked]:border-[#5f7d68]",
    optionText: "text-sm font-medium text-[#36463c]",
    page: "min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-24 bg-[#fafaf9]",
    headerCard:
      "bg-white border border-[#5f7d68]/15 shadow-[0_1px_3px_rgba(95,125,104,0.06),0_10px_28px_-10px_rgba(95,125,104,0.18)] rounded-2xl overflow-hidden",
    bodyCard:
      "bg-white border border-[#5f7d68]/15 shadow-[0_1px_3px_rgba(95,125,104,0.06),0_10px_28px_-10px_rgba(95,125,104,0.18)] rounded-2xl overflow-hidden",
    input:
      "w-full text-sm h-10 bg-[#5f7d68]/[0.04] border border-[#5f7d68]/20 rounded-lg focus-visible:ring-2 focus-visible:ring-[#5f7d68]/25 focus-visible:border-[#5f7d68]/40 transition-shadow placeholder:text-slate-400",
    label: "text-xs font-semibold text-[#4a6153] uppercase tracking-wide",
    helperText: "text-xs text-slate-400 mt-1",
    divider: "border-[#5f7d68]/10",
    btn: "w-full text-sm font-semibold h-11 bg-[#5f7d68] hover:bg-[#4e6a58] active:bg-[#3f5747] text-white rounded-xl transition-colors shadow-md shadow-[#5f7d68]/25",
    errorBox:
      "flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-100 p-3 rounded-xl",
    badge: "bg-[#5f7d68]/10 text-[#4a6153] text-[10px] font-semibold px-2 py-0.5 rounded-full",
    fieldNumber:
      "flex-shrink-0 w-5 h-5 rounded-full bg-[#5f7d68]/10 text-[#4a6153] text-[10px] font-bold flex items-center justify-center",
    successIcon: "text-[#5f7d68]",
    successTitle: "text-slate-800",
    successSubtitle: "text-slate-500",
    emptyIconWrapper: "border border-[#5f7d68]/15 bg-[#5f7d68]/10",
    emptyIcon: "text-[#5f7d68]",
    emptyTitle: "text-[#243428]",
    emptyDescription: "text-[#64786d]",
    emptyDivider: "bg-[#5f7d68]/10",
    emptyFooter: "text-[#8a968d]",
  },

  "cherry-blossom": {
    title: "text-[#5c3a41] font-semibold",
    description: "text-sm leading-7 font-normal text-[#5A2E38] max-w-prose",
    radioDot: "bg-rose-400",
    radio: "border-rose-200 group-hover:border-rose-400 data-[checked=true]:border-rose-400",
    checkbox:
      "border-rose-200 data-[state=checked]:bg-rose-400 data-[state=checked]:border-rose-400",
    optionText: "text-sm font-medium text-[#5A2E38]",
    page: "min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-24 bg-[#fdf8f6]",
    headerCard:
      "bg-[#fffdfb] border border-rose-100 shadow-[0_1px_3px_rgba(190,80,110,0.05),0_12px_28px_-10px_rgba(225,140,160,0.25)] rounded-[28px] overflow-hidden",
    bodyCard:
      "bg-[#fffdfb] border border-rose-100 shadow-[0_1px_3px_rgba(190,80,110,0.05),0_12px_28px_-10px_rgba(225,140,160,0.25)] rounded-[28px] overflow-hidden",
    input:
      "w-full text-sm h-10 bg-rose-50/60 border border-rose-100 rounded-xl focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:border-rose-300 transition-shadow placeholder:text-rose-800/40",
    label: "text-xs font-semibold text-[#8a5a63] uppercase tracking-wide",
    helperText: "text-xs text-red-300 mt-1",
    divider: "border-rose-50",
    btn: "w-full text-sm font-semibold h-11 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 hover:brightness-105 text-white rounded-xl transition-all shadow-md shadow-rose-200/60",
    errorBox:
      "flex items-start gap-2 text-rose-600 text-sm bg-rose-50 border border-rose-200 p-3 rounded-xl",
    badge: "bg-rose-50 text-rose-400 text-[10px] font-semibold px-2 py-0.5 rounded-full",
    fieldNumber:
      "flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-400 text-[10px] font-bold flex items-center justify-center",
    successIcon: "text-rose-400",
    successTitle: "text-[#5c3a41]",
    successSubtitle: "text-[#a9838a]",
    emptyIconWrapper: "border border-rose-200 bg-rose-50",
    emptyIcon: "text-rose-500",
    emptyTitle: "text-[#5A2E38]",
    emptyDescription: "text-[#6B3F48]",
    emptyDivider: "bg-rose-100",
    emptyFooter: "text-[#8F6770]",
  },
  "cyber-sunset": {
    title:
      "font-bold text-[28px] tracking-tight bg-gradient-to-r from-[#FFD36E] via-[#FF7A18] to-[#FF4D8D] bg-clip-text text-transparent",

    description: "text-[15px] leading-7 font-normal text-[#FFE0D2] max-w-2xl",

    radioDot: "bg-[#FF7A18]",

    radio: "border-[#FF7A18]/35 group-hover:border-[#FF9A4D] data-[checked=true]:border-[#FF7A18]",

    checkbox:
      "border-[#FF7A18]/35 data-[state=checked]:bg-[#FF7A18] data-[state=checked]:border-[#FF7A18]",
    optionText: "text-sm font-medium text-[#E5C7B8]",
    page: "min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-24 bg-[#090A12] bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,77,141,0.16),transparent_40%),linear-gradient(to_bottom,#090A12,#10131D)]",

    headerCard:
      "bg-[#14151E]/90 backdrop-blur-xl border border-[#FF7A18]/15 rounded-2xl shadow-[0_0_40px_rgba(255,122,24,0.12)] overflow-hidden",

    bodyCard:
      "bg-[#14151E]/90 backdrop-blur-xl border border-[#FF7A18]/15 rounded-2xl shadow-[0_0_40px_rgba(255,122,24,0.12)] overflow-hidden",

    input:
      "w-full h-10 rounded-lg bg-[#1D202B] border border-[#FF7A18]/20 text-[#FFF4EC] placeholder:text-[#C9A89B] focus-visible:ring-2 focus-visible:ring-[#FF7A18]/25 focus-visible:border-[#FF7A18] transition-all",

    label: "text-xs font-bold uppercase tracking-[0.16em] text-[#FF9950]",

    helperText: "text-xs text-[#D4B7A8] mt-1",

    divider: "border-[#FF7A18]/12",

    btn: "w-full h-11 rounded-xl bg-gradient-to-r from-[#FF7A18] via-[#FF914D] to-[#FF4D8D] hover:brightness-110 active:brightness-95 text-white text-sm font-semibold shadow-[0_0_22px_rgba(255,122,24,0.35)] transition-all",

    errorBox:
      "flex items-start gap-2 rounded-xl border border-[#FF6B6B]/25 bg-[#FF6B6B]/10 p-3 text-sm text-[#FF8A8A]",

    badge: "rounded-full bg-[#FF7A18]/12 text-[#FFB15C] text-[10px] font-semibold px-2 py-0.5",

    fieldNumber:
      "flex-shrink-0 w-5 h-5 rounded-full bg-[#FF7A18]/15 text-[#FFC56E] text-[10px] font-bold flex items-center justify-center",

    successIcon: "text-[#FF7A18]",

    successTitle: "text-[#FFF7F2]",

    successSubtitle: "text-[#D9BDB1]",

    emptyIconWrapper: "border border-[#FF7A18]/20 bg-[#FF7A18]/10",

    emptyIcon: "text-[#FF914D]",

    emptyTitle:
      "font-bold bg-gradient-to-r from-[#FFD36E] via-[#FF7A18] to-[#FF4D8D] bg-clip-text text-transparent",

    emptyDescription: "text-[#FFE0D2]",

    emptyDivider: "bg-[#FF7A18]/12",

    emptyFooter: "text-[#D9BDB1]",
  },

  "ocean-mist": {
    title:
      "font-bold text-[28px] tracking-tight bg-gradient-to-r from-[#F7FEFF] via-[#C5F4F7] to-[#65D4E2] bg-clip-text text-transparent",

    description: "text-[15px] leading-7 text-[#D8F2F5] max-w-2xl",

    radioDot: "bg-[#4FD1C5]",

    optionText: "text-sm font-medium text-[#EAFBFD]",

    radio: "border-[#4FD1C5]/40 group-hover:border-[#7DE6DB] data-[checked=true]:border-[#4FD1C5]",

    checkbox:
      "border-[#4FD1C5]/40 data-[state=checked]:bg-[#4FD1C5] data-[state=checked]:border-[#4FD1C5]",

    page: "min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-24 bg-[#071923] bg-[radial-gradient(circle_at_top,rgba(79,209,197,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(102,205,255,0.10),transparent_45%)]",

    headerCard:
      "bg-[#102736]/85 backdrop-blur-xl border border-[#4FD1C5]/15 rounded-2xl shadow-[0_0_35px_rgba(79,209,197,0.10)] overflow-hidden",

    bodyCard:
      "bg-[#102736]/85 backdrop-blur-xl border border-[#4FD1C5]/15 rounded-2xl shadow-[0_0_35px_rgba(79,209,197,0.10)] overflow-hidden",

    input:
      "w-full h-10 rounded-lg bg-[#183445] border border-[#4FD1C5]/20 text-[#F3FDFF] placeholder:text-[#92C7CF] focus-visible:border-[#4FD1C5] focus-visible:ring-2 focus-visible:ring-[#4FD1C5]/20 transition-all",

    label: "text-xs font-bold uppercase tracking-[0.16em] text-[#8BE7E0]",

    helperText: "text-xs text-[#A7CDD3] mt-1",

    divider: "border-[#4FD1C5]/10",

    btn: "w-full h-11 rounded-xl bg-gradient-to-r from-[#4FD1C5] via-[#63D8E3] to-[#8AE6FF] text-[#08202B] font-semibold hover:brightness-105 shadow-[0_0_22px_rgba(79,209,197,0.30)] transition-all",

    errorBox:
      "flex items-start gap-2 rounded-xl border border-[#FF8A80]/20 bg-[#FF8A80]/8 p-3 text-sm text-[#FFB3AB]",

    badge: "rounded-full bg-[#4FD1C5]/12 text-[#A6F3EA] text-[10px] font-semibold px-2 py-0.5",

    fieldNumber:
      "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#4FD1C5]/15 text-[#C8FBF6] text-[10px] font-bold",

    successIcon: "text-[#63D8E3]",

    successTitle: "text-[#F7FEFF]",

    successSubtitle: "text-[#B8E6EC]",

    emptyIconWrapper: "border border-[#4FD1C5]/20 bg-[#4FD1C5]/10",

    emptyIcon: "text-[#63D8E3]",

    emptyTitle:
      "font-bold bg-gradient-to-r from-[#F7FEFF] via-[#C5F4F7] to-[#65D4E2] bg-clip-text text-transparent",

    emptyDescription: "text-[#D8F2F5]",

    emptyDivider: "bg-[#4FD1C5]/12",

    emptyFooter: "text-[#B8E6EC]",
  },

  "lavender-dream": {
    title: "text-[#4f4187] font-semibold",
    description: "text-sm leading-7 font-normal text-[#7d70b3] tracking-[0.01em] max-w-prose",
    radioDot: "bg-[#8b7cc9]",
    radio: "border-[#8b7cc9]/30 group-hover:border-[#8b7cc9] data-[checked=true]:border-[#8b7cc9]",
    checkbox:
      "border-[#8b7cc9]/40 data-[state=checked]:bg-[#8b7cc9] data-[state=checked]:border-[#8b7cc9]",
    optionText: "text-sm font-medium text-[#4F4187]",
    page: "min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-24 bg-[#f9f7fd]",
    headerCard:
      "bg-white border border-[#8b7cc9]/15 shadow-[0_1px_3px_rgba(139,124,201,0.06),0_10px_28px_-10px_rgba(139,124,201,0.18)] rounded-2xl overflow-hidden",
    bodyCard:
      "bg-white border border-[#8b7cc9]/15 shadow-[0_1px_3px_rgba(139,124,201,0.06),0_10px_28px_-10px_rgba(139,124,201,0.18)] rounded-2xl overflow-hidden",
    input:
      "w-full text-sm h-10 bg-[#8b7cc9]/[0.05] border border-[#8b7cc9]/20 rounded-lg focus-visible:ring-2 focus-visible:ring-[#8b7cc9]/25 focus-visible:border-[#8b7cc9]/40 transition-shadow placeholder:text-slate-400",
    label: "text-xs font-semibold text-[#6d5cab] uppercase tracking-wide",
    helperText: "text-xs text-slate-400 mt-1",
    divider: "border-[#8b7cc9]/10",
    btn: "w-full text-sm font-semibold h-11 bg-[#8b7cc9] hover:bg-[#7a68bb] active:bg-[#6957a5] text-white rounded-xl transition-colors shadow-md shadow-[#8b7cc9]/25",
    errorBox:
      "flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-100 p-3 rounded-xl",
    badge: "bg-[#8b7cc9]/10 text-[#6d5cab] text-[10px] font-semibold px-2 py-0.5 rounded-full",
    fieldNumber:
      "flex-shrink-0 w-5 h-5 rounded-full bg-[#8b7cc9]/10 text-[#6d5cab] text-[10px] font-bold flex items-center justify-center",
    successIcon: "text-[#8b7cc9]",
    successTitle: "text-slate-800",
    successSubtitle: "text-slate-500",
    emptyIconWrapper: "border border-[#8b7cc9]/20 bg-[#8b7cc9]/10",
    emptyIcon: "text-[#8b7cc9]",
    emptyTitle: "text-[#4F4187]",
    emptyDescription: "text-[#7264A8]",
    emptyDivider: "bg-[#8b7cc9]/15",
    emptyFooter: "text-[#9487C3]",
  },
};

export interface FormThemeKit {
  Page: React.FC<{ children: ReactNode }>;
  HeaderCard: React.FC<{ children: ReactNode }>;
  BodyCard: React.FC<{ children: ReactNode }>;
  Divider: React.FC;
  OptionalBadge: React.FC;
  FieldNumber: React.FC<{ children: ReactNode }>;
  FieldLabel: React.FC<{ children: ReactNode }>;
  HelperText: React.FC<{ children: ReactNode }>;
  RequiredMark: React.FC;
  Input: React.FC<ComponentProps<typeof Input>>;
  Textarea: React.FC<ComponentProps<typeof Textarea>>;
  selectTriggerClassName: string;
  RadioDot: React.FC<{ selected: boolean }>;
  SubmitButton: React.FC<ComponentProps<typeof Button>>;
  ErrorBox: React.FC<{ children: ReactNode }>;
  SuccessIcon: React.FC;
  successTitleClassName: string;
  successSubtitleClassName: string;
}
