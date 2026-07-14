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
  }
> = {
  "clean-zen": {
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
  },

  "cherry-blossom": {
    page: "min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-24 bg-[#fdf8f6]",
    headerCard:
      "bg-[#fffdfb] border border-rose-100 shadow-[0_1px_3px_rgba(190,80,110,0.05),0_12px_28px_-10px_rgba(225,140,160,0.25)] rounded-[28px] overflow-hidden",
    bodyCard:
      "bg-[#fffdfb] border border-rose-100 shadow-[0_1px_3px_rgba(190,80,110,0.05),0_12px_28px_-10px_rgba(225,140,160,0.25)] rounded-[28px] overflow-hidden",
    input:
      "w-full text-sm h-10 bg-rose-50/60 border border-rose-100 rounded-xl focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:border-rose-300 transition-shadow placeholder:text-rose-300/80",
    label: "text-xs font-semibold text-[#8a5a63] uppercase tracking-wide",
    helperText: "text-xs text-rose-300 mt-1",
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
  },
  "cyber-sunset": {
    page: "min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-24 bg-[#0d0217] bg-[radial-gradient(circle_at_50%_0%,rgba(255,45,196,0.09),transparent_60%)]",
    headerCard:
      "bg-[#170a26] border border-[#ff2dc4]/20 shadow-[0_1px_3px_rgba(255,45,196,0.08),0_10px_30px_-10px_rgba(166,59,255,0.4)] rounded-2xl overflow-hidden text-white/90",
    bodyCard:
      "bg-[#170a26] border border-[#ff2dc4]/20 shadow-[0_1px_3px_rgba(255,45,196,0.08),0_10px_30px_-10px_rgba(166,59,255,0.4)] rounded-2xl overflow-hidden text-white/90",
    input:
      "w-full text-sm h-10 bg-[#ff2dc4]/[0.06] border border-[#ff2dc4]/25 rounded-lg focus-visible:ring-2 focus-visible:ring-[#a63bff]/35 focus-visible:border-[#a63bff]/55 transition-shadow text-white placeholder:text-white/30",
    label: "text-xs font-semibold text-[#ff6de3] uppercase tracking-wide",
    helperText: "text-xs text-white/40 mt-1",
    divider: "border-[#ff2dc4]/15",
    btn: "w-full text-sm font-semibold h-11 bg-gradient-to-r from-[#ff2dc4] to-[#a63bff] hover:from-[#e620ae] hover:to-[#9026e6] active:from-[#c91794] active:to-[#7a1fc7] text-white rounded-xl transition-colors shadow-md shadow-[#a63bff]/35",
    errorBox:
      "flex items-start gap-2 text-[#ff6b81] text-sm bg-[#ff6b81]/10 border border-[#ff6b81]/25 p-3 rounded-xl",
    badge: "bg-[#ff2dc4]/15 text-[#ff6de3] text-[10px] font-semibold px-2 py-0.5 rounded-full",
    fieldNumber:
      "flex-shrink-0 w-5 h-5 rounded-full bg-[#a63bff]/15 text-[#c896ff] text-[10px] font-bold flex items-center justify-center",
    successIcon: "text-[#a63bff]",
    successTitle: "text-white/90",
    successSubtitle: "text-white/50",
  },

  "ocean-mist": {
    page: "min-h-screen w-full flex justify-center items-start py-10 px-4 sm:py-24 bg-[#0a1620] bg-[radial-gradient(circle_at_50%_0%,rgba(94,197,214,0.07),transparent_60%)]",
    headerCard:
      "bg-[#0f2331] border border-[#5ec5d6]/15 shadow-[0_1px_3px_rgba(94,197,214,0.06),0_10px_30px_-10px_rgba(94,197,214,0.25)] rounded-2xl overflow-hidden text-white/90",
    bodyCard:
      "bg-[#0f2331] border border-[#5ec5d6]/15 shadow-[0_1px_3px_rgba(94,197,214,0.06),0_10px_30px_-10px_rgba(94,197,214,0.25)] rounded-2xl overflow-hidden",
    input:
      "w-full text-sm h-10 bg-[#5ec5d6]/[0.06] border border-[#5ec5d6]/20 rounded-lg focus-visible:ring-2 focus-visible:ring-[#5ec5d6]/30 focus-visible:border-[#5ec5d6]/50 transition-shadow text-white/90 placeholder:text-white/30",
    label: "text-xs font-semibold text-[#7fd4e2] uppercase tracking-wide",
    helperText: "text-xs text-white/40 mt-1",
    divider: "border-[#5ec5d6]/10",
    btn: "w-full text-sm font-semibold h-11 bg-[#5ec5d6] hover:bg-[#4bb3c5] active:bg-[#3d9aab] text-[#0a1620] rounded-xl transition-colors shadow-md shadow-[#5ec5d6]/25",
    errorBox:
      "flex items-start gap-2 text-[#ff8a80] text-sm bg-[#ff8a80]/10 border border-[#ff8a80]/25 p-3 rounded-xl",
    badge: "bg-[#5ec5d6]/15 text-[#7fd4e2] text-[10px] font-semibold px-2 py-0.5 rounded-full",
    fieldNumber:
      "flex-shrink-0 w-5 h-5 rounded-full bg-[#5ec5d6]/15 text-[#7fd4e2] text-[10px] font-bold flex items-center justify-center",
    successIcon: "text-[#5ec5d6]",
    successTitle: "text-white/90",
    successSubtitle: "text-white/50",
  },

  "lavender-dream": {
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
