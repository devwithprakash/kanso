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