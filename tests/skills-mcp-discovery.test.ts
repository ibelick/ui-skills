import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { registry } from "../src/data/registry.ts";
import {
  buildAgentSkillsIndex,
  buildMcpServerCard,
  defaultSkillContentLoader,
  getRegistrySkillByDiscoveryName,
  prefetchPrerenderSkills,
  skillArtifactPath,
  toDiscoveryName,
  toPublicAgentSkillsIndex,
} from "../src/lib/agent-skills-discovery.ts";
import { GET as getSkillsIndex } from "../src/pages/.well-known/agent-skills/index.json.ts";
import { GET as getServerCard } from "../src/pages/.well-known/mcp/server-card.json.ts";

const origin = "https://www.ui-skills.com";

describe("skills and MCP discovery", () => {
  test("prefetches unique skill sources concurrently and reuses their content", async () => {
    const entries = Array.from({ length: 5 }, (_, index) => ({
      ...registry[0]!,
      user: "prefetch-test",
      rawUrl: `https://example.com/prefetch-${index}`,
    }));
    let active = 0;
    let peak = 0;
    let calls = 0;
    await prefetchPrerenderSkills([...entries, entries[0]!], async (entry) => {
      calls++;
      active++;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, 5));
      active--;
      return `# ${entry.rawUrl}`;
    }, 2);

    assert.equal(calls, entries.length);
    assert.equal(peak, 2);
    assert.equal(await defaultSkillContentLoader(entries[0]!), `# ${entries[0]!.rawUrl}`);
  });

  test("does not cache failed prerender fetches", async () => {
    const entry = {
      ...registry[0]!,
      user: "prefetch-test",
      rawUrl: "https://example.com/prefetch-failure",
    };
    await prefetchPrerenderSkills([entry], async () => {
      throw new Error("temporary failure");
    });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => new Response("# recovered")) as typeof fetch;
    try {
      assert.equal(await defaultSkillContentLoader(entry), "# recovered");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("discovery names are unique and RFC-safe for the full registry", () => {
    const names = registry.map((entry) => toDiscoveryName(entry.pathSlug));
    assert.equal(names.length, registry.length);
    assert.equal(new Set(names).size, registry.length);
    for (const name of names) {
      assert.match(name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(name.length <= 64);
    }
  });

  test("indexes the full registry using CLI artifact URLs", async () => {
    const index = await buildAgentSkillsIndex(origin, {
      loadContent: async (entry) => `# ${entry.pathSlug}\n\n${entry.description}\n`,
      usePrecomputedDigests: false,
    });

    assert.equal(
      index.$schema,
      "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    );
    assert.equal(index.skills.length, registry.length);

    const baseline = index.skills.find(
      (skill) => skill.pathSlug === "ibelick/baseline-ui",
    );
    assert.ok(baseline);
    assert.equal(baseline.name, "ibelick-baseline-ui");
    assert.equal(
      baseline.url,
      `${origin}${skillArtifactPath("ibelick/baseline-ui")}`,
    );
    assert.match(baseline.url, /\/skills\/ibelick\/baseline-ui\/llms\.txt$/);
    assert.match(baseline.digest, /^sha256:[a-f0-9]{64}$/);

    const published = toPublicAgentSkillsIndex(index);
    assert.equal(published.skills.length, registry.length);
    assert.equal(
      Object.keys(published.skills[0]!).sort().join(","),
      "description,digest,name,type,url",
    );
  });

  test("resolves discovery names the same way as CLI path/slug lookups", () => {
    assert.equal(
      getRegistrySkillByDiscoveryName("ibelick-baseline-ui")?.pathSlug,
      "ibelick/baseline-ui",
    );
    assert.equal(
      getRegistrySkillByDiscoveryName("baseline-ui")?.slug,
      "baseline-ui",
    );
    assert.equal(
      getRegistrySkillByDiscoveryName("ibelick/baseline-ui")?.pathSlug,
      "ibelick/baseline-ui",
    );
  });

  test("MCP server card points at the shared /mcp endpoint", () => {
    const card = buildMcpServerCard(origin);
    assert.equal(card.serverInfo.name, "UI Skills");
    assert.equal(card.transport.endpoint, `${origin}/mcp`);
    assert.equal(card.capabilities.tools, true);
  });

  test("well-known routes return discovery documents", async () => {
    const siteCtx = { site: new URL(origin) } as never;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("raw.githubusercontent.com")) {
        return new Response("# remote skill\n", { status: 200 });
      }
      return originalFetch(input);
    }) as typeof fetch;

    try {
      const skills = await getSkillsIndex(siteCtx);
      const card = await getServerCard(siteCtx);

      assert.equal(skills.status, 200);
      const body = (await skills.json()) as {
        skills: Array<Record<string, unknown>>;
      };
      // Digests are precomputed at build time; unreachable upstream skills are omitted.
      assert.ok(body.skills.length >= Math.floor(registry.length * 0.75));
      assert.ok(!("pathSlug" in (body.skills[0] ?? {})));
      assert.match(String(body.skills[0]?.digest ?? ""), /^sha256:[a-f0-9]{64}$/);

      assert.equal(card.status, 200);
      assert.equal((await card.json()).serverInfo.name, "UI Skills");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
