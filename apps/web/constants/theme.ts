import { ThemeKey } from "@/types/theme";

export const THEMES: Record<ThemeKey, { name: string; swatch: string; bg: string; accent: string }> = {
  "clean-zen": {
    name: "Clean Zen",
    swatch: "bg-[oklch(0.42_0.045_150)]",
    bg: "bg-[oklch(0.97_0.012_120)]",
    accent: "text-[oklch(0.42_0.045_150)]",
  },
  "cherry-blossom": {
    name: "Cherry-Blossom",
    swatch: "bg-[oklch(0.85_0.04_75)]",
    bg: "bg-[oklch(0.98_0.02_85)]",
    accent: "text-[oklch(0.45_0.06_60)]",
  },
  "cyber-sunset": {
    name: "Cyber Sunset",
    swatch: "bg-[oklch(0.78_0.08_15)]",
    bg: "bg-[oklch(0.97_0.015_20)]",
    accent: "text-[oklch(0.45_0.08_15)]",
  },
  "forest-slate": {
    name: "Forest Slate",
    swatch: "bg-[oklch(0.72_0.09_230)]",
    bg: "bg-[oklch(0.97_0.015_230)]",
    accent: "text-[oklch(0.42_0.08_240)]",
  },
};