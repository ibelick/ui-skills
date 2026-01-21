import type { APIRoute } from "astro";
import { skills } from "../../../data/skills";

const skillRawModules = import.meta.glob<string>("/skills/*/SKILL.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const skillRawEntries = Object.entries(skillRawModules).map(([path, raw]) => {
  const entrySlug = path.split("/").at(-2) ?? "";

  return { slug: entrySlug, raw };
});

export function getStaticPaths() {
  return skills.map((skill) => ({
    params: { slug: skill.slug },
  }));
}

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug ?? "";
  const skillRaw =
    skillRawEntries.find((entry) => entry.slug === slug)?.raw ?? "";

  if (!skillRaw) {
    return new Response("Skill not found", { status: 404 });
  }

  return new Response(skillRaw, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
