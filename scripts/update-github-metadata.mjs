import { writeFile } from "node:fs/promises";
import { githubResources } from "../src/data/github-resources.ts";
import { registry } from "../src/data/registry.ts";

const metadataFile = new URL(
  "../src/data/github-metadata.json",
  import.meta.url,
);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "ui-skills-github-metadata",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const requiredRepositories = new Map();
for (const resource of githubResources) {
  if (!resource.githubRepo) continue;
  const normalizedRepo = resource.githubRepo.toLowerCase();
  if (!requiredRepositories.has(normalizedRepo)) {
    requiredRepositories.set(normalizedRepo, resource.githubRepo);
  }
}

const skillRepositories = new Map();
for (const skill of registry) {
  const githubRepo = `${skill.user}/${skill.repo}`;
  const normalizedRepo = githubRepo.toLowerCase();
  if (
    requiredRepositories.has(normalizedRepo) ||
    skillRepositories.has(normalizedRepo)
  ) {
    continue;
  }
  skillRepositories.set(normalizedRepo, githubRepo);
}

const readRepository = async (githubRepo) => {
  const response = await fetch(`https://api.github.com/repos/${githubRepo}`, {
    headers,
    signal: AbortSignal.timeout(10000),
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status} for ${githubRepo}`);
  }

  const repository = await response.json();
  if (
    !Number.isInteger(repository.stargazers_count) ||
    !Number.isInteger(repository.forks_count)
  ) {
    throw new Error(`GitHub returned invalid counts for ${githubRepo}`);
  }

  const license = repository.license?.spdx_id;
  return {
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    license: license && license !== "NOASSERTION" ? license : null,
    pushedAt: repository.pushed_at,
    updatedAt: repository.updated_at,
    archived: Boolean(repository.archived),
  };
};

const metadata = {};
for (const githubRepo of requiredRepositories.values()) {
  const repository = await readRepository(githubRepo);
  if (!repository) {
    throw new Error(`GitHub returned 404 for ${githubRepo}`);
  }
  metadata[githubRepo.toLowerCase()] = repository;
}

for (const githubRepo of skillRepositories.values()) {
  const repository = await readRepository(githubRepo);
  if (!repository) {
    console.warn(`Skipping ${githubRepo}; GitHub returned 404.`);
    continue;
  }
  metadata[githubRepo.toLowerCase()] = repository;
}

const sortedRepositories = Object.fromEntries(
  Object.entries(metadata).sort(([a], [b]) => a.localeCompare(b)),
);

await writeFile(
  metadataFile,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      repositories: sortedRepositories,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(
  `Updated GitHub metadata for ${Object.keys(sortedRepositories).length} repositories.`,
);
