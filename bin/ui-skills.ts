#!/usr/bin/env -S node --experimental-strip-types

import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { localSources, localSkills } from "./local-catalog.ts";

type RemoteSkill = {
  slug: string;
  pathSlug: string;
  sourceKey: string;
  sourceLabel: string;
  name: string;
  description: string;
  topics?: string[];
};

type RemoteTopic = {
  slug: string;
  label: string;
};

type RegistryManifest = {
  registry: RemoteSkill[];
  topics: RemoteTopic[];
};

const argv = process.argv.slice(2);

const SITE_URL = process.env.UI_SKILLS_SITE_URL ?? "https://www.ui-skills.com";
const REGISTRY_URL = new URL("/skills/registry.json", SITE_URL);

const BANNER = [
  " ██╗   ██╗██╗      ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗",
  " ██║   ██║██║      ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝",
  " ██║   ██║██║█████╗███████╗█████╔╝ ██║██║     ██║     ███████╗",
  " ██║   ██║██║╚════╝╚════██║██╔═██╗ ██║██║     ██║     ╚════██║",
  " ╚██████╔╝██║      ███████║██║  ██╗██║███████╗███████╗███████║",
  "  ╚═════╝ ╚═╝      ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝",
].join("\n");

const HELP = [
  BANNER,
  "",
  "Skills for Design Engineers",
  "",
  "Usage:",
  "  ui-skills [command]",
  "",
  "Commands:",
  "  start                     Print the routing skill",
  "  categories                List categories",
  "  list [--category <topic>] List skills",
  "  get <slug> [--json]       Print skill Markdown or metadata and content",
  "  sources                   List the public and configured local sources",
  "",
  "Local catalog options:",
  "  list --source <name>       List one source (public or a local name)",
  "  list --json                Print catalog entries as JSON",
  "  get <source>:<skill>       Read an installed local skill",
  "",
  "Examples:",
  "  ui-skills start",
  "  ui-skills list --category motion",
  "  ui-skills get baseline-ui",
].join("\n");

const normalize = (value: string) => value.trim().toLowerCase();

const print = (value: string) => {
  process.stdout.write(`${value}\n`);
};

const failExtraArgs = (command: string) => {
  fail(`Too many arguments for ${command}`, 1);
};

const fail = (message: string, code = 1) => {
  process.stderr.write(`${message}\n`);
  process.exitCode = code;
};

const fetchRegistryManifest = async () => {
  const response = await fetch(REGISTRY_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${REGISTRY_URL} (${response.status} ${response.statusText})`,
    );
  }

  return (await response.json()) as RegistryManifest;
};

const fetchSkillContent = async (pathSlug: string) => {
  const skillUrl = new URL(
    `/skills/${pathSlug.split("/").map(encodeURIComponent).join("/")}/llms.txt`,
    SITE_URL,
  );
  const response = await fetch(skillUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${skillUrl} (${response.status} ${response.statusText})`,
    );
  }

  return response.text();
};

const formatTopic = (topic: RemoteTopic) => topic.slug;

const formatSkill = (skill: RemoteSkill) => {
  const categories = (skill.topics ?? []).join(", ");
  const description = skill.description.replace(/\s+/g, " ").trim();
  return `${skill.pathSlug}${categories ? ` — ${categories}` : ""} — ${description}`;
};

const resolveSkillCandidates = (registry: RemoteSkill[], input: string) => {
  const normalizedInput = normalize(input);
  const exactPath = registry.find(
    (entry) => normalize(entry.pathSlug) === normalizedInput,
  );
  if (exactPath) {
    return [exactPath];
  }

  const bySlug = registry.filter(
    (entry) => normalize(entry.slug) === normalizedInput,
  );
  return bySlug;
};

const printList = async (category?: string, source?: string, json = false) => {
  const selected =
    source && source !== "public"
      ? (await localSources()).filter((item) => item.name === source)
      : undefined;
  if (selected && !selected.length) {
    fail(`Unknown local source: ${source}`, 3);
    return;
  }
  const { registry, topics } = selected
    ? { registry: await localSkills(selected), topics: [] }
    : await fetchRegistryManifest();
  if (!source && !category)
    registry.push(...(await localSkills(await localSources())));
  const normalizedCategory = category ? normalize(category) : undefined;
  const topicSlugs = new Set(topics.map((topic) => topic.slug));
  const filtered = category
    ? registry.filter((skill) =>
        skill.topics?.includes(normalizedCategory ?? ""),
      )
    : registry;

  if (category && !topicSlugs.has(normalizedCategory ?? "")) {
    fail(`Unknown category: ${category}`, 3);
    return;
  }

  if (category && filtered.length === 0) {
    fail(`No skills found for category: ${category}`, 3);
    return;
  }

  print(json ? JSON.stringify(filtered) : filtered.map(formatSkill).join("\n"));
};

const printGet = async (input: string, json = false) => {
  if (input.includes(":")) {
    const sourceName = input.split(":")[0];
    const sources = (await localSources()).filter(
      (source) => source.name === sourceName,
    );
    const skill = (await localSkills(sources)).find(
      (skill) => skill.pathSlug === input,
    );
    if (!skill) {
      fail(`Skill not found: ${input}`, 3);
      return;
    }
    const markdown = await readFile(skill.file, "utf8");
    if (json) print(JSON.stringify({ ...skill, markdown }));
    else process.stdout.write(markdown);
    return;
  }
  const { registry } = await fetchRegistryManifest();
  const candidates = resolveSkillCandidates(registry, input);

  if (candidates.length === 0) {
    fail(`Skill not found: ${input}`, 3);
    return;
  }

  if (candidates.length > 1) {
    process.stderr.write(`Ambiguous skill slug: ${input}\n`);
    process.stderr.write("Candidates:\n");
    for (const candidate of candidates) {
      process.stderr.write(`- ${candidate.pathSlug}\n`);
    }
    process.exitCode = 3;
    return;
  }

  const skill = candidates[0];
  const markdown = await fetchSkillContent(skill.pathSlug);
  if (json) print(JSON.stringify({ ...skill, markdown }));
  else process.stdout.write(markdown);
};

const main = async () => {
  const [command = ""] = argv;

  if (
    !command ||
    command === "--help" ||
    command === "-h" ||
    command === "help"
  ) {
    print(HELP);
    return;
  }

  if (command === "start") {
    if (argv.length > 1) {
      failExtraArgs("start");
      return;
    }

    const { registry } = await fetchRegistryManifest();
    const skill = resolveSkillCandidates(registry, "ui-skills-root")[0];
    if (!skill) {
      fail("Skill not found: ui-skills-root", 3);
      return;
    }

    process.stdout.write(await fetchSkillContent(skill.pathSlug));
    return;
  }

  if (command === "categories") {
    if (argv.length > 1) {
      failExtraArgs("categories");
      return;
    }

    const { topics } = await fetchRegistryManifest();
    print(topics.map(formatTopic).join("\n"));
    return;
  }

  if (command === "sources") {
    if (argv.length !== 1) {
      failExtraArgs("sources");
      return;
    }
    const sources = await localSources();
    print(
      [
        `public — ${SITE_URL}`,
        ...sources.map((source) => `${source.name} — ${source.path}`),
      ].join("\n"),
    );
    return;
  }

  if (command === "list" || command === "get") {
    let parsed;
    try {
      parsed = parseArgs({
        args: argv.slice(1),
        options: {
          json: { type: "boolean" },
          source: { type: "string" },
          category: { type: "string" },
        },
        allowPositionals: true,
        tokens: true,
      });
      const seen = new Set<string>();
      for (const token of parsed.tokens) {
        if (token.kind !== "option") continue;
        if (command === "get" && token.name !== "json")
          throw new Error(`Unknown option: --${token.name}`);
        if (seen.has(token.name))
          throw new Error(`Duplicate option: --${token.name}`);
        if (token.value === "")
          throw new Error(`Missing value for --${token.name}`);
        seen.add(token.name);
      }
    } catch (error) {
      fail(
        error instanceof Error
          ? error.message.replace(
              /Option '(--[a-z]+) <value>' argument missing/,
              "Missing value for $1",
            )
          : String(error),
      );
      return;
    }
    const { values: flags, positionals } = parsed;
    if (command === "list") {
      if (positionals.length) {
        failExtraArgs("list");
        return;
      }
      if (
        flags.category !== undefined &&
        flags.source !== undefined &&
        flags.source !== "public"
      ) {
        fail("Local sources have no categories; use list --source <name>");
        return;
      }
      await printList(flags.category, flags.source, flags.json);
    } else {
      if (positionals.length > 1) {
        failExtraArgs("get");
        return;
      }
      if (!positionals.length) {
        fail("Missing skill slug");
        return;
      }
      await printGet(positionals[0], flags.json);
    }
    return;
  }

  fail(`Unknown command: ${command}`, 2);
};

await main().catch((error) => {
  fail(
    `ui-skills: ${error instanceof Error ? error.message : String(error)}`,
    4,
  );
});
