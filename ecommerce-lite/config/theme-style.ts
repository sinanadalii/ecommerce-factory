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
  if (theme.accent) {
    decls.push(`--color-gold:${theme.accent}`);
    decls.push(`--color-gold-bright:${theme.accent}`);
  }
  if (theme.background) decls.push(`--color-background:${theme.background}`);
  if (theme.surface) decls.push(`--color-surface:${theme.surface}`);
  if (theme.foreground) decls.push(`--color-foreground:${theme.foreground}`);

  if (decls.length === 0) return null;
  return `:root{${decls.join(";")};}`;
}
