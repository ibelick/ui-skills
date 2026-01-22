import type { APIRoute } from "astro";
import { skills } from "../data/skills";

const skillRawModules = import.meta.glob<string>("/skills/*/SKILL.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const skillRawEntries = new Map(
  Object.entries(skillRawModules).map(([path, raw]) => [
    path.split("/").at(-2) ?? "",
    raw,
  ]),
);

export const GET: APIRoute = () => {
  const body = skills
    .map((skill) => skillRawEntries.get(skill.slug))
    .filter((raw): raw is string => Boolean(raw))
    .map((raw) => raw.trim())
    .join("\n\n")
    .concat("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
