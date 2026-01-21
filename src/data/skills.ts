import type { MarkdownInstance } from "astro";

type SkillFrontmatter = {
  name?: string;
  description?: string;
  label?: string;
};

export type Skill = {
  slug: string;
  name: string;
  label: string;
  description?: string;
};

const skillOrder = [
  "baseline-ui",
  "fixing-motion-performance",
  "fixing-accessibility",
  "fixing-metadata",
];

const skillModules = import.meta.glob<MarkdownInstance<SkillFrontmatter>>(
  "/skills/*/SKILL.md",
  { eager: true },
);

const titleize = (value: string) =>
  value
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "ui") {
        return "UI";
      }

      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");

export const skills: Skill[] = Object.entries(skillModules)
  .map(([path, module]) => {
    const slug = path.split("/").at(-2) ?? "";
    const name = module.frontmatter.name ?? slug;

    return {
      slug,
      name,
      label: module.frontmatter.label ?? titleize(name),
      description: module.frontmatter.description,
    };
  })
  .sort(
    (a, b) =>
      skillOrder.indexOf(a.slug) - skillOrder.indexOf(b.slug),
  );
