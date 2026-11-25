import githubMetadata from "../data/github-metadata.json";
import { registry } from "../data/registry";

type RepositoryMetadata = {
  stars: number;
};

const repositories = (
  githubMetadata as {
    repositories: Record<string, RepositoryMetadata>;
  }
).repositories;

const repositoryByPathSlug = new Map(
  registry.map((skill) => [skill.pathSlug, `${skill.user}/${skill.repo}`]),
);

export const repositoryForSkillPath = (pathSlug: string) =>
  repositoryByPathSlug.get(pathSlug);

export const repositoryForSkillHref = (href: string) => {
  const path = href.split(/[?#]/, 1)[0]?.replace(/\/$/, "") ?? "";
  const prefix = "/skills/";

  if (!path.startsWith(prefix)) {
    return undefined;
  }

  return repositoryForSkillPath(decodeURIComponent(path.slice(prefix.length)));
};

export const starsForRepository = (repository: string | undefined) => {
  if (!repository) {
    return undefined;
  }

  const stars = repositories[repository.toLowerCase()]?.stars;
  return Number.isInteger(stars) ? stars : undefined;
};
