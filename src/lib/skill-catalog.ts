import { registry, type TopicSlug } from "../data/registry";
import { skills, type Skill } from "../data/skills";

const skillsByPath = new Map(skills.map((skill) => [skill.pathSlug, skill]));
const registryByPath = new Map(
  registry.map((entry) => [entry.pathSlug, entry]),
);
const skillsBySlug = new Map<string, Skill[]>();
const skillsBySource = new Map<string, Skill[]>();
const skillsByTopic = new Map<TopicSlug, Skill[]>();

for (const skill of skills) {
  const slugMatches = skillsBySlug.get(skill.slug) ?? [];
  slugMatches.push(skill);
  skillsBySlug.set(skill.slug, slugMatches);

  if (skill.sourceKey) {
    const sourceMatches = skillsBySource.get(skill.sourceKey) ?? [];
    sourceMatches.push(skill);
    skillsBySource.set(skill.sourceKey, sourceMatches);
  }

  for (const topic of skill.topics ?? []) {
    const topicMatches = skillsByTopic.get(topic) ?? [];
    topicMatches.push(skill);
    skillsByTopic.set(topic, topicMatches);
  }
}

const getGroupPaths = () =>
  Array.from(
    new Set(
      skills.flatMap((skill) => {
        const segments = skill.pathSlug.split("/");
        if (segments.length <= 1) return [];

        return segments
          .slice(0, -1)
          .map((_, index) => segments.slice(0, index + 1).join("/"));
      }),
    ),
  );

const topicGroupPaths = Array.from(
  new Set(skills.flatMap((skill) => skill.topics ?? [])),
);
const groupPaths = getGroupPaths();
const routePaths = [
  ...topicGroupPaths,
  ...groupPaths,
  ...skills.map((skill) => skill.pathSlug),
  ...skills.map((skill) => `${skill.sourceKey}/${skill.slug}`),
];

export const getSkillByPath = (pathSlug: string) => skillsByPath.get(pathSlug);

export const getRegistryByPath = (pathSlug: string) =>
  registryByPath.get(pathSlug);

export const getSkillsBySlug = (slug: string) => skillsBySlug.get(slug) ?? [];

export const getSkillsBySource = (sourceKey: string) =>
  skillsBySource.get(sourceKey) ?? [];

export const getSkillsByTopic = (topic: TopicSlug) =>
  skillsByTopic.get(topic) ?? [];

export const getSkillBySourceAndSlug = (sourceKey: string, slug: string) =>
  getSkillsBySource(sourceKey).find((skill) => skill.slug === slug);

export const getSkillByTopicAndSlug = (topic: TopicSlug, slug: string) =>
  getSkillsByTopic(topic).find((skill) => skill.slug === slug);

export const getSkillRoutePaths = () =>
  Array.from(new Set(routePaths)).map((slug) => ({ params: { slug } }));

export const getCanonicalSkillPaths = () =>
  skills.map((skill) => ({ params: { slug: skill.pathSlug } }));
