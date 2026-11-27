import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { safeReturnTo } from "../src/lib/auth-config.ts";
import { handleLibraryRequest } from "../src/lib/library-http.ts";
import { parseSkillPath } from "../src/lib/library-skill.ts";
import type { LibraryStore } from "../src/lib/library-store.ts";
import {
  LibraryError,
  collectionSlug,
  isCollectionSlug,
  isLibraryPath,
  parseCollectionTitle,
  suffixedCollectionSlug,
  type LibrarySnapshot,
} from "../src/lib/library-types.ts";

const emptyLibrary: LibrarySnapshot = {
  savedSkillPaths: [],
  collections: [],
};

function store(overrides: Partial<LibraryStore> = {}): LibraryStore {
  return {
    async snapshot() {
      return emptyLibrary;
    },
    async getBySlug() {
      return null;
    },
    async saveSkill() {
      return emptyLibrary;
    },
    async unsaveSkill() {
      return emptyLibrary;
    },
    async createCollection() {
      return {
        library: emptyLibrary,
        collection: {
          id: "11111111-1111-4111-8111-111111111111",
          slug: "mobile-review",
          title: "Mobile review",
          skillPaths: [],
        },
      };
    },
    async updateCollection() {
      return emptyLibrary;
    },
    async deleteCollection() {
      return emptyLibrary;
    },
    async addSkill() {
      return emptyLibrary;
    },
    async removeSkill() {
      return emptyLibrary;
    },
    ...overrides,
  };
}

function request(
  path: string,
  method: string,
  body?: unknown,
  origin = "https://www.ui-skills.com",
) {
  return new Request(`https://www.ui-skills.com${path}`, {
    method,
    headers: {
      origin,
      ...(body ? { "content-type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

describe("personal library", () => {
  test("keeps library pages private without blocking post-login return", () => {
    for (const path of ["/library", "/library/mobile-review", "/api/library"]) {
      assert.equal(isLibraryPath(path), true);
    }
    for (const path of ["/", "/skills", "/collections", "/library-notes"]) {
      assert.equal(isLibraryPath(path), false);
    }
    assert.equal(safeReturnTo("/library"), "/library");
    assert.equal(
      safeReturnTo("/library/mobile-review"),
      "/library/mobile-review",
    );
  });

  test("builds stable collection slugs", () => {
    assert.equal(collectionSlug("Mobile App Design"), "mobile-app-design");
    assert.equal(collectionSlug("  Café layout  "), "cafe-layout");
    assert.equal(collectionSlug("!!!"), "");
    assert.equal(isCollectionSlug("mobile-app-design"), true);
    assert.equal(isCollectionSlug("../account"), false);
    assert.equal(suffixedCollectionSlug("mobile-review", 2), "mobile-review-2");
  });

  test("rejects empty, symbolic, and oversized collection copy", () => {
    assert.equal(parseCollectionTitle("  Audit checklist  "), "Audit checklist");
    assert.throws(() => parseCollectionTitle("   "), LibraryError);
    assert.throws(() => parseCollectionTitle("***"), LibraryError);
    assert.throws(
      () => parseCollectionTitle("a".repeat(81)),
      LibraryError,
    );
  });

  test("accepts only skills that exist in the directory", () => {
    assert.equal(parseSkillPath("ibelick/ui-skills-root"), "ibelick/ui-skills-root");
    assert.throws(() => parseSkillPath("../account"), LibraryError);
    assert.throws(() => parseSkillPath("not/a-skill"), LibraryError);
  });

  test("requires a signed-in user before reading the library", async () => {
    let called = false;
    const response = await handleLibraryRequest(
      request("/api/library", "GET"),
      null,
      store({
        async snapshot() {
          called = true;
          return emptyLibrary;
        },
      }),
    );
    assert.equal(response.status, 401);
    assert.equal(called, false);
    assert.deepEqual(await response.json(), {
      error: "Sign in to use your library.",
    });
  });

  test("rejects cross-origin changes before they reach the database", async () => {
    let called = false;
    const response = await handleLibraryRequest(
      request(
        "/api/library/saved",
        "POST",
        { skillPath: "ibelick/ui-skills-root" },
        "https://evil.example",
      ),
      "user-1",
      store({
        async saveSkill() {
          called = true;
          return emptyLibrary;
        },
      }),
    );
    assert.equal(response.status, 403);
    assert.equal(called, false);
  });

  test("saves a known skill and refuses a skill outside the directory", async () => {
    const saved: string[] = [];
    const ok = await handleLibraryRequest(
      request("/api/library/saved", "POST", {
        skillPath: "ibelick/ui-skills-root",
      }),
      "user-1",
      store({
        async saveSkill(_userId, skillPath) {
          saved.push(skillPath);
          return { ...emptyLibrary, savedSkillPaths: [skillPath] };
        },
      }),
    );
    assert.equal(ok.status, 200);
    assert.deepEqual(saved, ["ibelick/ui-skills-root"]);

    const rejected = await handleLibraryRequest(
      request("/api/library/saved", "POST", { skillPath: "not/a-skill" }),
      "user-1",
      store(),
    );
    assert.equal(rejected.status, 400);
  });

  test("removes a saved skill that is no longer in the directory", async () => {
    const removed: string[] = [];
    const unsaved = await handleLibraryRequest(
      request("/api/library/saved", "DELETE", {
        skillPath: "someone/retired-skill",
      }),
      "user-1",
      store({
        async unsaveSkill(_userId, skillPath) {
          removed.push(skillPath);
          return emptyLibrary;
        },
      }),
    );
    assert.equal(unsaved.status, 200);

    const fromCollection = await handleLibraryRequest(
      request(
        "/api/library/collections/11111111-1111-4111-8111-111111111111/skills",
        "DELETE",
        { skillPath: "someone/retired-skill" },
      ),
      "user-1",
      store({
        async removeSkill(_userId, _id, skillPath) {
          removed.push(skillPath);
          return emptyLibrary;
        },
      }),
    );
    assert.equal(fromCollection.status, 200);
    assert.deepEqual(removed, [
      "someone/retired-skill",
      "someone/retired-skill",
    ]);
  });

  test("creates a collection for the signed-in user", async () => {
    const response = await handleLibraryRequest(
      request("/api/library/collections", "POST", {
        title: "  Mobile review  ",
        skillPath: "ibelick/ui-skills-root",
      }),
      "user-1",
      store({
        async createCollection(_userId, input) {
          assert.equal(input.title, "Mobile review");
          assert.equal(input.skillPath, "ibelick/ui-skills-root");
          return {
            library: emptyLibrary,
            collection: {
              id: "11111111-1111-4111-8111-111111111111",
              slug: "mobile-review",
              title: input.title,
              skillPaths: [input.skillPath ?? ""],
            },
          };
        },
      }),
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.collection.slug, "mobile-review");
  });

  test("does not update another user's collection id", async () => {
    const response = await handleLibraryRequest(
      request("/api/library/collections/not-a-uuid", "PATCH", {
        title: "Renamed",
      }),
      "user-1",
      store({
        async updateCollection() {
          throw new Error("should not update");
        },
      }),
    );
    assert.equal(response.status, 404);
  });
});
