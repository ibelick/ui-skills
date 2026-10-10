import { once } from "node:events";
import { createServer, type Server } from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";

const execFileAsync = promisify(execFile);
const cliPath = resolve("bin/ui-skills.js");

const manifest = {
  registry: [
    {
      slug: "ui-skills-root",
      pathSlug: "ui-skills-root",
      sourceKey: "ui-skills",
      sourceLabel: "UI Skills",
      name: "ui-skills-root",
      description: "Route UI work to the right skill.",
      topics: ["systems"],
    },
    {
      slug: "shared-skill",
      pathSlug: "alice/shared-skill",
      sourceKey: "alice",
      sourceLabel: "Alice",
      name: "shared-skill",
      description: "Alice's shared skill.",
      topics: ["motion"],
    },
    {
      slug: "shared-skill",
      pathSlug: "bob/shared-skill",
      sourceKey: "bob",
      sourceLabel: "Bob",
      name: "shared-skill",
      description: "Bob's shared skill.",
      topics: ["motion"],
    },
  ],
  topics: [
    { slug: "systems", label: "Systems" },
    { slug: "motion", label: "Motion" },
  ],
};

let server: Server;
let siteUrl: string;
let configHome: string;

before(async () => {
  configHome = await mkdtemp(resolve(tmpdir(), "ui-skills-legacy-"));
  server = createServer((request, response) => {
    if (request.url === "/skills/registry.json") {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(manifest));
      return;
    }

    const match = request.url?.match(/^\/skills\/(.+)\/llms\.txt$/);
    if (match) {
      response.setHeader("Content-Type", "text/plain");
      response.end(`# ${decodeURIComponent(match[1])}\n`);
      return;
    }

    response.statusCode = 404;
    response.end("not found");
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  siteUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  server.close();
  await rm(configHome, { recursive: true, force: true });
});

const runCli = async (...args: string[]) => {
  try {
    const result = await execFileAsync(process.execPath, [cliPath, ...args], {
      env: {
        ...process.env,
        UI_SKILLS_SITE_URL: siteUrl,
        UI_SKILLS_CONFIG: "",
        XDG_CONFIG_HOME: configHome,
      },
    });
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    const result = error as {
      code?: number;
      stdout?: string;
      stderr?: string;
    };
    return {
      code: result.code ?? 1,
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
    };
  }
};

describe("CLI", () => {
  test("prints help by default", async () => {
    const result = await runCli();

    assert.equal(result.code, 0);
    assert.match(result.stdout, /Skills for Design Engineers/);
    assert.match(result.stdout, /get <slug>/);
  });

  test("lists categories and filters skills", async () => {
    const categories = await runCli("categories");
    assert.equal(categories.code, 0);
    assert.equal(categories.stdout, "systems\nmotion\n");

    const filtered = await runCli("list", "--category", "motion");
    assert.equal(filtered.code, 0);
    assert.match(filtered.stdout, /alice\/shared-skill/);
    assert.match(filtered.stdout, /bob\/shared-skill/);
    assert.doesNotMatch(filtered.stdout, /ui-skills-root/);
  });

  test("gets a unique skill and resolves start", async () => {
    const skill = await runCli("get", "alice/shared-skill");
    assert.equal(skill.code, 0);
    assert.equal(skill.stdout, "# alice/shared-skill\n");

    const start = await runCli("start");
    assert.equal(start.code, 0);
    assert.equal(start.stdout, "# ui-skills-root\n");
  });

  test("reports invalid arguments and ambiguous slugs with stable exit codes", async () => {
    const missingCategory = await runCli("list", "--category");
    assert.equal(missingCategory.code, 1);
    assert.match(missingCategory.stderr, /Missing value for --category/);

    const ambiguous = await runCli("get", "shared-skill");
    assert.equal(ambiguous.code, 3);
    assert.match(ambiguous.stderr, /alice\/shared-skill/);
    assert.match(ambiguous.stderr, /bob\/shared-skill/);

    const unknown = await runCli("get", "missing");
    assert.equal(unknown.code, 3);
    assert.match(unknown.stderr, /Skill not found: missing/);
  });
});
