import type { APIRoute } from "astro";

export const prerender = true;
import { skills } from "../data/skills";

import { SEMI_STATIC_CACHE } from "../lib/cache-headers";

export const GET: APIRoute = () => {
  const navigation = [
    { label: "Home", path: "/" },
    { label: "Skills", path: "/skills" },
    { label: "Skills Registry", path: "/skills/registry.txt" },
    { label: "Design System", path: "/design.md" },
    { label: "CLI", path: "/cli" },
    { label: "Sponsor", path: "/sponsor" },
  ];

  const skillCatalog = skills
    .map((skill) => {
      const description = skill.description ?? "";

      return `- ${skill.label} (${skill.pathSlug})\n  page: /skills/${skill.pathSlug}\n  llms: /skills/${skill.pathSlug}/llms.txt\n  source: ${skill.sourceLabel ?? "Unknown"}\n  description: ${description}`;
    })
    .join("\n\n");

  const body = [
    "# UI Skills",
    "",
    "## Site Navigation",
    ...navigation.map((item) => `- ${item.label}: ${item.path}`),
    "",
    "## Skill Catalog",
    skillCatalog,
  ]
    .join("\n")
    .concat("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": SEMI_STATIC_CACHE,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
