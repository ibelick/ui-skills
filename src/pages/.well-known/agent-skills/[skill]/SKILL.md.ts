import type { APIRoute } from "astro";

import {
  defaultSkillContentLoader,
  getRegistrySkillByDiscoveryName,
  prefetchPrerenderSkills,
  toDiscoveryName,
} from "../../../../lib/agent-skills-discovery";
import { registry } from "../../../../data/registry";

export const prerender = true;

export async function getStaticPaths() {
  await prefetchPrerenderSkills(registry);
  return registry.map((entry) => ({
    params: { skill: toDiscoveryName(entry.pathSlug) },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.skill;
  if (!slug) {
    return new Response("Skill not found", { status: 404 });
  }

  const entry = getRegistrySkillByDiscoveryName(slug);
  if (!entry) {
    return new Response("Skill not found", { status: 404 });
  }

  try {
    const content = await defaultSkillContentLoader(entry);
    return new Response(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response("Skill source unavailable", { status: 502 });
  }
};

export const HEAD: APIRoute = ({ params }) => {
  const slug = params.skill;
  if (!slug || !getRegistrySkillByDiscoveryName(slug)) {
    return new Response(null, { status: 404 });
  }
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
