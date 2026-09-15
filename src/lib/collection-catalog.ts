import { collectionBySlug, collections } from "../data/collections.ts";
import { playbookBySlug } from "../data/playbook.ts";
import { getSkillByPath, getSkillsBySlug } from "./skill-catalog.ts";

for (const collection of collections) {
  for (const playbookSlug of collection.playbook) {
    if (!playbookBySlug.has(playbookSlug)) {
      throw new Error(
        `Unknown Playbook entry for collection ${collection.slug}: ${playbookSlug}`,
      );
    }
  }

  for (const skill of collection.skills) {
    const matches = skill.pathSlug
      ? getSkillByPath(skill.pathSlug)
      : getSkillsBySlug(skill.slug);
    if (!matches || (Array.isArray(matches) && matches.length === 0)) {
      throw new Error(
        `Unknown skill for collection ${collection.slug}: ${skill.slug}`,
      );
    }
    if (Array.isArray(matches) && matches.length > 1) {
      throw new Error(
        `Ambiguous skill for collection ${collection.slug}: ${skill.slug}`,
      );
    }
  }
}

export const getCollectionBySlug = (slug: string) => collectionBySlug.get(slug);

export const getCollectionRoutePaths = () =>
  collections.map((collection) => ({ params: { slug: collection.slug } }));
