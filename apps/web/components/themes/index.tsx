// components/form-themes/index.tsx
import type { ThemeKey } from "@/types/theme";
import { cleanZenTheme } from "./clean-zen";
import { cherryBlossomTheme } from "./cherry-blossom";
import { cyberSunsetTheme } from "./cyber-sunset";
import { oceanMistTheme } from "./ocean-mist";
import { lavenderDreamTheme } from "./lavender-dream";
import { FormThemeKit } from "@/constants/theme";

export const formThemes: Record<ThemeKey, FormThemeKit> = {
  "clean-zen": cleanZenTheme,
  "cherry-blossom": cherryBlossomTheme,
  "cyber-sunset": cyberSunsetTheme,
  "ocean-mist": oceanMistTheme,
  "lavender-dream": lavenderDreamTheme,
};

export type { FormThemeKit } from "@/constants/theme";
