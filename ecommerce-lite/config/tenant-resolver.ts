import { DEFAULT_CLIENT, isClientKey, isDemoKey, type ClientKey } from "./active-client";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TENANT RESOLVER — pure host → tenant logic.  [FROZEN v1]
 *
 * The single, stable resolution path:
 *   1. production host (exact domain, or leading subdomain of a multi-label host)
 *   2. ACTIVE_CLIENT env — explicit override
 *   3. DEFAULT_CLIENT fallback
 *
 * Environment separation (no routing overlap):
 *   • PRODUCTION stores (client-a/-b/-c) are the ONLY tenants reachable by host.
 *   • DEMO stores are showcase-only and are NEVER host-routed. Serve one
 *     explicitly via ACTIVE_CLIENT (e.g. `ACTIVE_CLIENT=demo-lumen`), or edit it
 *     in /admin. See the INTERNAL note below.
 *   • /admin is a separate route and plays no part in tenant resolution.
 *
 * Pure (no Next.js / request APIs) → unit-testable and reusable.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/** PRODUCTION exact hostname → real store. Map live domains (and www) here. */
const PRODUCTION_DOMAINS: Record<string, ClientKey> = {
  "maisonnoir.com": "client-a",
  "www.maisonnoir.com": "client-a",
  "lumen.watch": "client-b",
  "www.lumen.watch": "client-b",
  "terraandash.com": "client-c",
  "www.terraandash.com": "client-c",
};

/**
 * PRODUCTION leading subdomain → real store, for wildcard hosting such as
 * `maison-noir.your-platform.app`. Canonical brand subdomains only — terse
 * dev shortcuts and key-as-subdomain aliases were removed at freeze.
 */
const PRODUCTION_SUBDOMAINS: Record<string, ClientKey> = {
  "maison-noir": "client-a",
  "lumen": "client-b",
  "terra-ash": "client-c",
};

/*
 * INTERNAL — Demo Store Pack (showcase only)
 * ------------------------------------------
 * The demo tenants ("demo-maison-noir" | "demo-lumen" | "demo-terra-ash") are
 * intentionally NOT in the host tables above, so they can never be served on a
 * production domain. To present one, run an instance with, e.g.:
 *     ACTIVE_CLIENT=demo-lumen
 * (resolved by step 2 below), or open/edit it from the /admin dashboard. This
 * keeps production and demo routing fully separated.
 */

/** Normalise a Host / X-Forwarded-Host value: strip port, trim, lowercase. */
function normaliseHost(host: string): string {
  return host.split(":")[0].trim().toLowerCase();
}

/**
 * Map a request host to a PRODUCTION store: exact domain first, then the leading
 * subdomain of a multi-label host (e.g. `lumen.factory.app`). Single-label hosts
 * are deliberately NOT matched, so routing stays unambiguous.
 */
export function matchHostToClient(host: string | undefined | null): ClientKey | null {
  if (!host) return null;
  const hostname = normaliseHost(host);
  if (!hostname) return null;

  if (hostname in PRODUCTION_DOMAINS) return PRODUCTION_DOMAINS[hostname];

  const labels = hostname.split(".");
  if (labels.length >= 2) {
    const subdomain = labels[0];
    if (subdomain in PRODUCTION_SUBDOMAINS) return PRODUCTION_SUBDOMAINS[subdomain];
  }

  return null;
}

/** PRODUCT MODE — "demo" only when explicitly enabled; "production" otherwise. */
function isDemoMode(): boolean {
  return process.env.PRODUCT_MODE === "demo";
}

/** Resolve the tenant key for a request host, applying the full priority order. */
export function resolveClientKey(host?: string | null): ClientKey {
  // 1. production host (domain / subdomain)
  const fromHost = matchHostToClient(host);
  if (fromHost) return fromHost;

  // 2. explicit override. A demo store is honoured ONLY in demo mode, so demo
  //    data can never leak into a production deployment via a stray env var.
  const fromEnv = process.env.ACTIVE_CLIENT ?? process.env.NEXT_PUBLIC_ACTIVE_CLIENT;
  if (isClientKey(fromEnv) && (!isDemoKey(fromEnv) || isDemoMode())) {
    return fromEnv;
  }

  // 3. default
  return DEFAULT_CLIENT;
}
