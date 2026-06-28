import {
  Layers,
  Sparkles,
  SlidersHorizontal,
  Store,
  TerminalSquare,
  Zap,
  Smartphone,
  Server,
  type LucideIcon,
} from "lucide-react";

/** String-key → lucide icon, so content data stays free of JSX. */
export const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  sparkles: Sparkles,
  sliders: SlidersHorizontal,
  store: Store,
  terminal: TerminalSquare,
  zap: Zap,
  smartphone: Smartphone,
  server: Server,
};
