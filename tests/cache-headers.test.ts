import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { getHtmlCacheControl } from "../src/lib/cache-headers.ts";

describe("cache header routing", () => {
  test("edge-caches the homepage and skill detail pages", () => {
    assert.match(getHtmlCacheControl("/") ?? "", /s-maxage=3600/);
    assert.match(
      getHtmlCacheControl("/skills/ibelick/improve-ui") ?? "",
      /s-maxage=3600/,
    );
  });

  test("uses longer edge cache for listing and docs pages", () => {
    assert.match(getHtmlCacheControl("/skills") ?? "", /s-maxage=86400/);
    assert.match(
      getHtmlCacheControl("/playbook/use-large-touch-targets") ?? "",
      /s-maxage=86400/,
    );
    assert.match(getHtmlCacheControl("/cli") ?? "", /s-maxage=86400/);
    assert.match(getHtmlCacheControl("/sponsor") ?? "", /s-maxage=86400/);
    assert.match(getHtmlCacheControl("/jobs") ?? "", /s-maxage=3600/);
  });

  test("skips cache headers for machine-readable skill routes", () => {
    assert.equal(getHtmlCacheControl("/skills/registry.txt"), null);
    assert.equal(
      getHtmlCacheControl("/skills/ibelick/improve-ui/llms.txt"),
      null,
    );
  });
});
