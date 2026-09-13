import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  symlink,
  readdir,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";

const exec = promisify(execFile);
const cli = resolve("bin/ui-skills.js");

test("local catalog through the real CLI", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "ui-skills local-"));
  const path = join(root, "config.json");
  const installed = join(root, "installed");
  const shared = join(root, "shared");
  await mkdir(join(installed, "design"), { recursive: true });
  await mkdir(shared);
  const markdown =
    "---\nname: design\ndescription: >-\n  Build UI with\n  local guidelines.\n---\n\nRead [guidelines](./guidelines.md).\n";
  await writeFile(join(installed, "design", "SKILL.md"), markdown);
  await writeFile(
    join(installed, "design", "guidelines.md"),
    "Design guidelines\n",
  );
  await writeFile(
    join(shared, "SKILL.md"),
    '---\nname: forms\ndescription: "Forms: accessible controls."\n---\n\nLocal forms\n',
  );
  await symlink(shared, join(installed, "forms"));
  await mkdir(join(installed, "unrelated"));
  await writeFile(
    join(installed, "unrelated", "SKILL.md"),
    "---\nname: unrelated\ndescription: Unrelated guidance\n---\n",
  );
  const source = {
    name: "team",
    path: "./installed",
    skills: ["design", "forms"],
  };
  const config = (localSources: unknown = [source]) =>
    writeFile(path, JSON.stringify({ localSources }));
  let requests = 0;
  const server = createServer((req, res) => {
    requests++;
    res.end(
      req.url?.endsWith("registry.json")
        ? JSON.stringify({
            registry: [
              {
                slug: "forms",
                pathSlug: "team/forms",
                sourceKey: "team",
                sourceLabel: "Team",
                name: "Forms",
                description: "Public forms",
                topics: ["accessibility"],
              },
              {
                slug: "ui-skills-root",
                pathSlug: "ui-skills-root",
                sourceKey: "ibelick",
                sourceLabel: "UI Skills",
                name: "UI Skills",
                description: "Routing guide",
                topics: [],
              },
            ],
            topics: [{ slug: "accessibility", label: "Accessibility" }],
          })
        : `# Public ${req.url}\n`,
    );
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}`;
  t.after(async () => {
    server.close();
    await rm(root, { recursive: true, force: true });
  });
  const run = async (args: string[], env: Record<string, string> = {}) => {
    try {
      const result = await exec(process.execPath, [cli, ...args], {
        cwd: tmpdir(),
        env: {
          ...process.env,
          UI_SKILLS_SITE_URL: url,
          UI_SKILLS_CONFIG: path,
          XDG_CONFIG_HOME: root,
          ...env,
        },
      });
      return { code: 0, ...result };
    } catch (error) {
      const result = error as { code: number; stdout: string; stderr: string };
      return {
        code: result.code,
        stdout: result.stdout,
        stderr: result.stderr,
      };
    }
  };
  const success = (r: { code: number; stderr: string }) => {
    assert.equal(r.code, 0, r.stderr);
    assert.equal(r.stderr, "");
  };
  await config();

  await t.test(
    "merges public and local catalogs while preserving publisher paths",
    async () => {
      const list = await run(["list", "--json"]);
      success(list);
      assert.deepEqual(
        JSON.parse(list.stdout).map(
          (row: { pathSlug: string }) => row.pathSlug,
        ),
        ["team/forms", "ui-skills-root", "team:design", "team:forms"],
      );
      const publicSkill = await run(["get", "team/forms"]);
      success(publicSkill);
      assert.match(publicSkill.stdout, /^# Public/);
      const bare = await run(["get", "forms"]);
      success(bare);
      assert.equal(bare.stdout, publicSkill.stdout);
      const local = await run(["get", "team:forms"]);
      success(local);
      assert.match(local.stdout, /Local forms/);
      const category = await run([
        "list",
        "--category",
        "accessibility",
        "--json",
      ]);
      success(category);
      assert.equal(JSON.parse(category.stdout).length, 1);
    },
  );

  await t.test(
    "local get/list work offline, resolve symlinks and relative resources, and reflect edits",
    async () => {
      const offline = { UI_SKILLS_SITE_URL: "http://127.0.0.1:1" };
      const before = requests;
      const list = await run(["list", "--source", "team", "--json"], offline);
      success(list);
      const rows = JSON.parse(list.stdout);
      assert.equal(rows.length, 2);
      assert.equal(rows[0].description, "Build UI with local guidelines.");
      assert.equal(rows[1].file, join(shared, "SKILL.md"));
      const get = await run(["get", "team:design", "--json"], offline);
      success(get);
      const skill = JSON.parse(get.stdout);
      assert.equal(skill.markdown, markdown);
      assert.equal(
        await readFile(resolve(dirname(skill.file), "guidelines.md"), "utf8"),
        "Design guidelines\n",
      );
      await writeFile(
        join(installed, "design", "SKILL.md"),
        markdown + "Updated instructions\n",
      );
      const updated = await run(["get", "team:design"], offline);
      success(updated);
      assert.match(updated.stdout, /Updated instructions/);
      assert.equal(requests, before);
      assert.deepEqual((await readdir(root)).sort(), [
        "config.json",
        "installed",
        "shared",
      ]);
    },
  );

  await t.test(
    "optional folder selection and multiple local sources keep distinct identities",
    async () => {
      await config([{ name: "all", path: "./installed" }]);
      const discovered = await run(["list", "--source", "all", "--json"]);
      success(discovered);
      assert.equal(JSON.parse(discovered.stdout).length, 3);
      await config([source, { ...source, name: "second" }]);
      success(await run(["get", "second:design"]));
      const sources = await run(["sources"]);
      success(sources);
      assert.match(sources.stdout, /public/);
      assert.match(sources.stdout, /second/);
      await config([source, { name: "missing", path: "./absent" }]);
      success(await run(["get", "team:design"]));
      success(await run(["list", "--source", "public"]));
      const all = await run(["list"]);
      assert.equal(all.code, 4);
      assert.equal(all.stdout, "");
    },
  );

  await t.test(
    "invalid config, missing skills, duplicate names, and malformed frontmatter fail visibly",
    async () => {
      for (const value of [
        "not JSON",
        "null",
        JSON.stringify({ sources: [] }),
        JSON.stringify({ localSources: {} }),
      ]) {
        await writeFile(path, value);
        const result = await run(["sources"]);
        assert.equal(result.code, 4);
        assert.equal(result.stdout, "");
      }
      for (const sources of [
        [source, source],
        [{ ...source, name: "public" }],
        [{ ...source, skills: ["../shared"] }],
        [{ ...source, skills: ["missing"] }],
      ]) {
        await config(sources);
        const result = await run(["list"]);
        assert.equal(result.code, 4);
        assert.equal(result.stdout, "");
      }
      await config([source]);
      await writeFile(
        join(shared, "SKILL.md"),
        "---\nname: design\ndescription: Duplicate name\n---\n",
      );
      assert.equal((await run(["list", "--source", "team"])).code, 4);
      await writeFile(join(shared, "SKILL.md"), "missing frontmatter");
      const invalid = await run(["get", "team:forms"]);
      assert.equal(invalid.code, 4);
      assert.match(invalid.stderr, /frontmatter/);
      await config([]);
      assert.equal((await run(["list", "--source", "unknown"])).code, 3);
      assert.equal((await run(["get", "unknown:skill"])).code, 3);
      const omitted = await run(["sources"], { UI_SKILLS_CONFIG: "" });
      success(omitted);
      assert.equal(omitted.stdout, `public — ${url}\n`);
      assert.equal(
        (
          await run(["sources"], {
            UI_SKILLS_CONFIG: join(root, "missing.json"),
          })
        ).code,
        4,
      );
    },
  );

  await t.test(
    "original start behavior and argument validation remain intact",
    async () => {
      const start = await run(["start"]);
      success(start);
      assert.equal(start.stdout, "# Public /skills/ui-skills-root/llms.txt\n");
      for (const args of [
        ["get"],
        ["list", "--source"],
        ["get", "team:design", "--source", "team"],
        ["list", "--json", "--json"],
        ["list", "--source", "team", "--category", "motion"],
      ]) {
        const result = await run(args);
        assert.equal(result.code, 1);
        assert.equal(result.stdout, "");
      }
    },
  );
});
