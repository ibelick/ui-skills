import { readFile, readdir, realpath } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { parse as parseYaml } from "yaml";

export type LocalSource = { name: string; path: string; skills?: string[] };
export type LocalSkill = {
  slug: string;
  pathSlug: string;
  sourceKey: string;
  sourceLabel: string;
  name: string;
  description: string;
  topics: string[];
  file: string;
};

const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const validName = (value: unknown): value is string =>
  typeof value === "string" && /^[a-z0-9][a-z0-9_-]*$/.test(value);
const errorCode = (error: unknown) =>
  error instanceof Error && "code" in error ? error.code : undefined;
const expandHome = (path: string) =>
  path.startsWith("~/") ? join(homedir(), path.slice(2)) : path;

export async function localSources(): Promise<LocalSource[]> {
  const configPath = resolve(
    expandHome(
      process.env.UI_SKILLS_CONFIG ||
        join(
          process.env.XDG_CONFIG_HOME || join(homedir(), ".config"),
          "ui-skills",
          "config.json",
        ),
    ),
  );
  let config: unknown;
  try {
    config = JSON.parse(await readFile(configPath, "utf8"));
  } catch (error) {
    if (errorCode(error) === "ENOENT" && !process.env.UI_SKILLS_CONFIG)
      return [];
    throw new Error(`Cannot read valid config at ${configPath}`);
  }
  if (
    !object(config) ||
    Object.keys(config).some((key) => key !== "localSources") ||
    (config.localSources !== undefined && !Array.isArray(config.localSources))
  )
    throw new Error("Config must contain only a localSources array");
  const sources: unknown[] = config.localSources ?? [];
  const result = sources.map((source) => {
    if (
      !object(source) ||
      !validName(source.name) ||
      source.name === "public" ||
      typeof source.path !== "string" ||
      !source.path.trim() ||
      Object.keys(source).some(
        (key) => !["name", "path", "skills"].includes(key),
      )
    )
      throw new Error(
        "Local sources need a unique name other than public and a directory path",
      );
    const { skills } = source;
    if (
      skills !== undefined &&
      (!Array.isArray(skills) ||
        !skills.every(validName) ||
        new Set(skills).size !== skills.length)
    )
      throw new Error(
        `Source ${source.name} skills must be unique skill folder names`,
      );
    return {
      name: source.name,
      path: resolve(dirname(configPath), expandHome(source.path)),
      skills,
    };
  });
  if (new Set(result.map((source) => source.name)).size !== result.length)
    throw new Error("Local source names must be unique");
  return result;
}

export async function localSkills(
  sources: LocalSource[],
): Promise<LocalSkill[]> {
  const skills: LocalSkill[] = [];
  for (const source of sources) {
    const folders =
      source.skills ??
      (await readdir(source.path, { withFileTypes: true }))
        .filter(
          (entry) =>
            !entry.name.startsWith(".") &&
            (entry.isDirectory() || entry.isSymbolicLink()),
        )
        .map((entry) => entry.name)
        .sort();
    for (const folder of folders) {
      const candidate = join(source.path, folder, "SKILL.md");
      let text: string;
      try {
        text = await readFile(candidate, "utf8");
      } catch (error) {
        if (
          !source.skills &&
          ["ENOENT", "ENOTDIR"].includes(String(errorCode(error)))
        )
          continue;
        throw new Error(`Cannot read installed skill: ${candidate}`);
      }
      const match = text.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      let metadata: unknown;
      try {
        metadata = match ? parseYaml(match[1]) : null;
      } catch {
        throw new Error(`Invalid skill frontmatter: ${candidate}`);
      }
      if (
        !object(metadata) ||
        !validName(metadata.name) ||
        typeof metadata.description !== "string" ||
        !metadata.description.trim()
      )
        throw new Error(
          `Skill needs name and description frontmatter: ${candidate}`,
        );
      skills.push({
        slug: metadata.name,
        pathSlug: `${source.name}:${metadata.name}`,
        sourceKey: source.name,
        sourceLabel: source.name,
        name: metadata.name,
        description: metadata.description,
        topics: [],
        file: await realpath(candidate),
      });
    }
  }
  if (new Set(skills.map((skill) => skill.pathSlug)).size !== skills.length)
    throw new Error("Duplicate skill names in local source");
  return skills;
}
