import type { BrandTheme } from "./types";

/**
 * Build a CSS string that overrides the shared design-system colour tokens for a
 * single tenant, from admin-editable `brand.theme`. Returns `null` when no
 * overrides are set, so the storefront emits nothing and the shared theme in
 * app/globals.css is used unchanged (existing stores look identical).
 *
 * This does NOT modify the design system — it sets the same CSS variables the
 * system already reads, scoped to one request, only when an admin opts in.
 */
export function buildThemeCss(theme?: BrandTheme): string | null {
  if (!theme) return null;

  const decls: string[] = [];
  const preset = presetTheme(theme.stylePreset);

  for (const [key, value] of Object.entries(preset)) {
    decls.push(`${key}:${value}`);
  }

  if (theme.accent) {
    decls.push(`--color-gold:${theme.accent}`);
    decls.push(`--color-gold-bright:${theme.accent}`);
    decls.push(`--color-gold-dim:${hexToRgba(theme.accent, 0.14)}`);
  }
  if (theme.accent2) decls.push(`--color-sale:${theme.accent2}`);
  if (theme.background) decls.push(`--color-background:${theme.background}`);
  if (theme.surface) decls.push(`--color-surface:${theme.surface}`);
  if (theme.foreground) decls.push(`--color-foreground:${theme.foreground}`);
  if (theme.muted) decls.push(`--color-muted:${theme.muted}`);
  if (theme.border) decls.push(`--color-border:${theme.border}`);
  if (theme.radius) decls.push(`--radius-card:${theme.radius}`);
  if (theme.headingFont) decls.push(`--font-serif:${fontStack(theme.headingFont, "serif")}`);
  if (theme.bodyFont) decls.push(`--font-sans:${fontStack(theme.bodyFont, "sans")}`);

  if (decls.length === 0) return null;
  return `:root{${decls.join(";")};}`;
}

function presetTheme(preset?: BrandTheme["stylePreset"]): Record<string, string> {
  if (preset === "tech") {
    return {
      "--color-background": "#05070d",
      "--color-surface": "#101827",
      "--color-surface-2": "#162033",
      "--color-foreground": "#eef6ff",
      "--color-muted": "#9fb3c8",
      "--color-gold": "#72e4ff",
      "--color-gold-bright": "#b9f4ff",
      "--color-gold-dim": "rgba(114, 228, 255, 0.14)",
      "--radius-card": "4px",
    };
  }

  if (preset === "lifestyle") {
    return {
      "--color-background": "#11100d",
      "--color-surface": "#1c1914",
      "--color-surface-2": "#282217",
      "--color-foreground": "#fbf3e4",
      "--color-muted": "#b9aa91",
      "--color-gold": "#d6b46d",
      "--color-gold-bright": "#f0d69b",
      "--color-gold-dim": "rgba(214, 180, 109, 0.16)",
      "--radius-card": "12px",
    };
  }

  if (preset === "beauty") {
    return {
      "--color-background": "#12090f",
      "--color-surface": "#1f111a",
      "--color-surface-2": "#2d1724",
      "--color-foreground": "#fff2f8",
      "--color-muted": "#d2aebb",
      "--color-gold": "#f0a7c2",
      "--color-gold-bright": "#ffd2e2",
      "--color-gold-dim": "rgba(240, 167, 194, 0.16)",
      "--radius-card": "16px",
    };
  }

  return {};
}

function fontStack(value: string, family: "sans" | "serif"): string {
  const stacks: Record<string, string> = {
    inter: 'var(--font-inter), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    playfair: 'var(--font-playfair), "Playfair Display", ui-serif, Georgia, serif',
    shabnam: '"Shabnam", "Vazirmatn", Tahoma, Arial, sans-serif',
    diodrum: '"Diodrum Arabic", "Diodrum", "Vazirmatn", Tahoma, Arial, sans-serif',
    vazirmatn: '"Vazirmatn", Tahoma, Arial, sans-serif',
    editorial: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    geometric: '"Space Grotesk", "Inter", ui-sans-serif, system-ui, sans-serif',
  };

  return stacks[value] ?? (family === "serif" ? stacks.playfair : stacks.inter);
}

function hexToRgba(hex: string, alpha: number): string {
  const raw = hex.replace("#", "");
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(raw)) return `rgba(199, 169, 107, ${alpha})`;
  const full = raw.length === 3 ? raw.split("").map((x) => x + x).join("") : raw;
  const n = Number.parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
