/** Browser revalidates often; edge caches longer to cut Worker invocations. */
export const EDGE_HTML_CACHE =
  "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400" as const;

/** Mostly-static listing and docs pages. */
export const LISTING_HTML_CACHE =
  "public, max-age=300, s-maxage=86400, stale-while-revalidate=86400" as const;

/** Frequently changing jobs listing — keep new postings visible sooner. */
export const JOBS_HTML_CACHE =
  "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" as const;

/** Semi-static discovery and text routes. */
export const SEMI_STATIC_CACHE =
  "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" as const;

/** Registry manifest — fresh enough for agents, cacheable at the edge. */
export const REGISTRY_JSON_CACHE =
  "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400" as const;

/** OAuth and discovery JSON — edge cache with hourly browser revalidation. */
export const DISCOVERY_JSON_CACHE =
  "public, max-age=3600, s-maxage=86400" as const;

const LISTING_PATH_PREFIXES = [
  "/cli",
  "/mcp/docs",
  "/playbook",
  "/agents",
  "/skills/topics",
] as const;

const LISTING_EXACT_PATHS = new Set(["/skills", "/sponsor"]);

export function getHtmlCacheControl(pathname: string): string | null {
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (normalized === "/jobs") {
    return JOBS_HTML_CACHE;
  }

  if (LISTING_EXACT_PATHS.has(normalized)) {
    return LISTING_HTML_CACHE;
  }

  if (
    LISTING_PATH_PREFIXES.some(
      (prefix) =>
        normalized === prefix || normalized.startsWith(`${prefix}/`),
    )
  ) {
    return LISTING_HTML_CACHE;
  }

  if (normalized === "/" || normalized.startsWith("/skills/")) {
    if (
      normalized.endsWith("/llms.txt") ||
      normalized === "/skills/registry.txt"
    ) {
      return null;
    }
    return EDGE_HTML_CACHE;
  }

  return null;
}
