import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  highlightCode,
  highlightFencedCode,
  highlightPlainCode,
  highlightShellCommand,
  prepareShellForHighlight,
  SKILL_CODE_FOREGROUND,
} from "../src/lib/code-highlighter.ts";
import { UI_SKILLS_AGENT_START_COPY } from "../src/lib/ui-skills-cli.ts";

describe("code highlighter", () => {
  test("quotes shell placeholders before highlighting", () => {
    assert.equal(
      prepareShellForHighlight("npx ui-skills get <skill>"),
      "npx ui-skills get '<skill>'",
    );
  });

  test("highlights shell commands with token spans", async () => {
    const html = await highlightShellCommand("npx ui-skills start");
    assert.match(html, /npx/);
    assert.match(html, /style="color:#/i);
    assert.match(html, /ui-skills/);
  });

  test("highlights install commands", async () => {
    const html = await highlightShellCommand(
      "npx skills add https://github.com/ibelick/ui-skills --skill ui-skills-root",
    );
    assert.match(html, /npx/);
    assert.match(html, /https:\/\/github.com\/ibelick\/ui-skills/);
    assert.match(html, /ui-skills-root/);
  });

  test("renders plain URLs with readable default foreground", async () => {
    const html = await highlightPlainCode("https://www.ui-skills.com/mcp");
    assert.match(html, /https:\/\/www\.ui-skills\.com\/mcp/);
    assert.match(html, /style="color:#0E1116;--shiki-dark:#e6edf3"/i);
  });

  test("highlights MCP endpoint URLs with the active theme", async () => {
    const html = await highlightShellCommand("https://www.ui-skills.com/mcp");
    assert.match(html, /https:\/\/www\.ui-skills\.com\/mcp/);
    assert.match(html, /style="color:#/i);
  });

  test("emits GitHub dark token colors alongside the light ones", async () => {
    const html = await highlightShellCommand("npx ui-skills start");
    assert.match(html, /style="color:#[0-9a-f]+;--shiki-dark:#[0-9a-f]+"/i);
  });

  test("highlights multi-line ui-skills CLI copy", async () => {
    const html = await highlightCode(UI_SKILLS_AGENT_START_COPY, "bash");
    assert.match(html, /class="line"/);
    assert.match(html, /ui-skills.*categories/);
    assert.match(html, /&#x3C;category>|&lt;category&gt;/);
  });

  test("highlights fenced skill code with the dark theme", async () => {
    const html = await highlightFencedCode("const value = true;", "typescript");
    assert.match(html, /const/);
    assert.match(html, /style="color:#/i);
    assert.match(
      html,
      new RegExp(
        `<span style="color:(?!${SKILL_CODE_FOREGROUND})[^\"]+">(?:const|value|true)</span>`,
        "i",
      ),
      "typed tokens should keep theme colors instead of the plain foreground",
    );
  });
});
