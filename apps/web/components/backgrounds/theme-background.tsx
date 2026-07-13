import { ThemeKey } from "@/types/theme";
import { CherryBlossomBackground } from "./cherry-blossom";
import { CyberSunsetBackground } from "./cyber-sunset";
import { OceanMistBackground } from "./ocean-mist";
import { LavenderDreamBackground } from "./lavender-dream";
import { CleanZenBackground } from "./clean-zen";

interface Props {
  theme: ThemeKey;
}

export function ThemeBackground({ theme }: Props) {
  switch (theme) {
    case "cherry-blossom":
      return <CherryBlossomBackground />;
    case "cyber-sunset":
      return <CyberSunsetBackground />;
    case "ocean-mist":
      return <OceanMistBackground />;
    case "lavender-dream":
      return <LavenderDreamBackground />;
    case "clean-zen":
    default:
      return <CleanZenBackground />;
  }
}
