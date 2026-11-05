import { readFile, readdir, realpath } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

const nameSchema = z.string().regex(/^[a-z0-9][a-z0-9_-]*$/);
const textSchema = z.string().refine((value) => value.trim().length > 0);
const sourceSchema = z.strictObject({
  name: nameSchema.refine((name) => name !== "public"),
  path: textSchema,
  skills: z
    .array(nameSchema)
    .refine((skills) => new Set(skills).size === skills.length)
    .optional(),
});
const configSchema = z.strictObject({
  localSources: z.array(sourceSchema).default([]),
});
const metadataSchema = z.object({ name: nameSchema, description: textSchema });

export type LocalSource = z.infer<typeof sourceSchema>;
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
  const parsed = configSchema.safeParse(config);
  if (!parsed.success)
    throw new Error(
      `Invalid local sources config at ${configPath}: ${parsed.error.message}`,
    );
  const result = parsed.data.localSources.map((source) => ({
    ...source,
    path: resolve(dirname(configPath), expandHome(source.path)),
  }));
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
      let metadata;
      try {
        metadata = metadataSchema.parse(match ? parseYaml(match[1]) : null);
      } catch {
        throw new Error(
          `Invalid skill frontmatter (requires name and description): ${candidate}`,
        );
      }
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
