import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { registry, type RegistrySkill } from "../data/registry";
import digestsManifest from "../data/agent-skills-digests.json";
import { getRemoteSkill } from "./remote-skill";

const SCHEMA = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";
const PACKAGE_VERSION = "0.2.4";

export type DiscoveredSkill = {
  name: string;
  type: "skill-md";
  description: string;
  url: string;
  digest: string;
  /** Same pathSlug the CLI and /skills registry use. */
  pathSlug: string;
};

export type SkillContentLoader = (entry: RegistrySkill) => Promise<string>;

function loadSkillsFromFs(): Record<string, string> {
  const root = join(process.cwd(), "skills");
  const modules: Record<string, string> = {};
  if (!existsSync(root)) return modules;

  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(root, entry.name, "SKILL.md");
    if (!existsSync(path)) continue;
    modules[`/skills/${entry.name}/SKILL.md`] = readFileSync(path, "utf8");
  }
  return modules;
}

function loadSkillModules(): Record<string, string> {
  try {
    return import.meta.glob("../../skills/*/SKILL.md", {
      query: "?raw",
      import: "default",
      eager: true,
    });
  } catch {
    // Node-based tests do not provide Vite's import.meta.glob helper.
    return loadSkillsFromFs();
  }
}

const localSkillModules = loadSkillModules();

function slugFromModulePath(path: string): string | null {
  const segments = path.replaceAll("\\", "/").split("/");
  const skillsIndex = segments.lastIndexOf("skills");
  return skillsIndex >= 0 && segments[skillsIndex + 2] === "SKILL.md"
    ? (segments[skillsIndex + 1] ?? null)
    : null;
}

const localSkillMarkdownBySlug = new Map(
  Object.entries(localSkillModules).flatMap(([path, markdown]) => {
    const slug = slugFromModulePath(path);
    return slug ? ([[slug, markdown]] as const) : [];
  }),
);

const precomputedDigests = new Map(
  Object.entries(
    (digestsManifest as { digests?: Record<string, string> }).digests ?? {},
  ),
);

/** Discovery-safe name derived from the catalog pathSlug (CLI-compatible identity). */
export function toDiscoveryName(pathSlug: string): string {
  return pathSlug
    .toLowerCase()
    .replaceAll("/", "-")
    .replaceAll(/[^a-z0-9-]+/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "")
    .slice(0, 64);
}

/** Artifact path shared with the CLI (`ui-skills get` fetches the same URL). */
export function skillArtifactPath(pathSlug: string): string {
  return `/skills/${pathSlug
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}/llms.txt`;
}

export function getRegistrySkillByDiscoveryName(
  name: string,
): RegistrySkill | undefined {
  const normalized = name.trim().toLowerCase();
  return registry.find(
    (entry) =>
      toDiscoveryName(entry.pathSlug) === normalized ||
      entry.slug === normalized ||
      entry.pathSlug === normalized ||
      entry.pathSlug.endsWith(`/${normalized}`),
  );
}

export function readLocalSkillMarkdown(slug: string): string | null {
  return localSkillMarkdownBySlug.get(slug) ?? null;
}

async function sha256Digest(content: string): Promise<string> {
  const bytes = new TextEncoder().encode(content);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  const hex = [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `sha256:${hex}`;
}

/**
 * Prefer locally bundled SKILL.md for this repo's skills; otherwise reuse the
 * same remote fetch/cache path as /skills/.../llms.txt and the CLI.
 */
export const defaultSkillContentLoader: SkillContentLoader = async (entry) => {
  if (entry.user.toLowerCase() === "ibelick" && entry.repo === "ui-skills") {
    const local = readLocalSkillMarkdown(entry.slug);
    if (local) return local;
  }
  const prefetched = prerenderSkillContent.get(entry.rawUrl);
  if (prefetched !== undefined) return prefetched;
  const { content } = await getRemoteSkill(entry.rawUrl);
  return content;
};

// Populated only by the prerender route during a build. Runtime requests keep
// using the existing edge-cache and stale-content behavior.
const prerenderSkillContent = new Map<string, string>();

export async function prefetchPrerenderSkills(
  entries: readonly RegistrySkill[],
  loadContent: SkillContentLoader = defaultSkillContentLoader,
  concurrency = 16,
): Promise<void> {
  const uniqueEntries = [...new Map(entries.map((entry) => [entry.rawUrl, entry])).values()];
  await mapPool(uniqueEntries, concurrency, async (entry) => {
    try {
      const content = await loadContent(entry);
      prerenderSkillContent.set(entry.rawUrl, content);
    } catch {
      // Leave failures uncached so individual routes can retry and retain
      // their existing error/fallback behavior.
    }
  });
}

async function mapPool<T, R>(
  items: readonly T[],
  concurrency: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (nextIndex < items.length) {
        const index = nextIndex;
        nextIndex += 1;
        results[index] = await mapper(items[index]!);
      }
    },
  );

  await Promise.all(workers);
  return results;
}

export async function buildAgentSkillsIndex(
  origin: string,
  options: {
    loadContent?: SkillContentLoader;
    concurrency?: number;
    /** Prefer build-time digests (default true). */
    usePrecomputedDigests?: boolean;
  } = {},
): Promise<{
  $schema: string;
  skills: DiscoveredSkill[];
}> {
  const loadContent = options.loadContent ?? defaultSkillContentLoader;
  const concurrency = options.concurrency ?? 8;
  const usePrecomputedDigests = options.usePrecomputedDigests ?? true;
  const digestCatalogReady =
    usePrecomputedDigests &&
    !options.loadContent &&
    precomputedDigests.size > 0;

  const skills = (
    await mapPool(registry, concurrency, async (entry) => {
      try {
        if (digestCatalogReady) {
          const digest = precomputedDigests.get(entry.pathSlug);
          // Omit unreachable upstream skills until the next digest refresh.
          if (!digest) return null;
          return {
            name: toDiscoveryName(entry.pathSlug),
            type: "skill-md" as const,
            description: entry.description.slice(0, 1024),
            url: `${origin}${skillArtifactPath(entry.pathSlug)}`,
            digest,
            pathSlug: entry.pathSlug,
          } satisfies DiscoveredSkill;
        }

        const content = await loadContent(entry);
        return {
          name: toDiscoveryName(entry.pathSlug),
          type: "skill-md" as const,
          description: entry.description.slice(0, 1024),
          url: `${origin}${skillArtifactPath(entry.pathSlug)}`,
          digest: await sha256Digest(content),
          pathSlug: entry.pathSlug,
        } satisfies DiscoveredSkill;
      } catch {
        // Keep the index available even if one upstream skill is temporarily down.
        return null;
      }
    })
  ).filter((skill): skill is DiscoveredSkill => skill !== null);

  skills.sort((a, b) => a.pathSlug.localeCompare(b.pathSlug));

  return {
    $schema: SCHEMA,
    skills,
  };
}

/** Public discovery document (RFC fields only). */
export function toPublicAgentSkillsIndex(index: {
  $schema: string;
  skills: DiscoveredSkill[];
}) {
  return {
    $schema: index.$schema,
    skills: index.skills.map(({ name, type, description, url, digest }) => ({
      name,
      type,
      description,
      url,
      digest,
    })),
  };
}

export function buildMcpServerCard(origin: string) {
  return {
    serverInfo: {
      name: "UI Skills",
      version: PACKAGE_VERSION,
    },
    description:
      "Browse and fetch design-engineering UI skills from the UI Skills catalog (same registry as the ui-skills CLI).",
    url: `${origin}/mcp`,
    transport: {
      type: "streamable-http",
      endpoint: `${origin}/mcp`,
    },
    capabilities: {
      tools: true,
    },
    tools: [
      {
        name: "list_skills",
        description:
          "List skills from the UI Skills registry (same catalog as ui-skills list).",
      },
      {
        name: "get_skill",
        description:
          "Fetch skill markdown by discovery name, slug, or pathSlug (same content as ui-skills get).",
      },
    ],
  };
}

export const discoveryJsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400",
  "Access-Control-Allow-Origin": "*",
} as const;
