import { ThemeKey } from "@/types/theme";
import dynamic from "next/dynamic";

export const themeEffects: Partial<Record<ThemeKey, React.ComponentType>> = {
  "cherry-blossom": dynamic(() => import("./cherry-blossom"), { ssr: false }),
  "cyber-sunset": dynamic(() => import("./cyber-sunset"), { ssr: false }),
  "ocean-mist": dynamic(() => import("./ocean-mist"), { ssr: false }),
  "lavender-dream": dynamic(() => import("./lavender-dream"), { ssr: false }),
};