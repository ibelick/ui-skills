import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { getPlatformProxy } from "wrangler";
import type { AuthEnv } from "../src/lib/auth-config.ts";
import { LibraryError } from "../src/lib/library-types.ts";
import { createLibraryStore } from "../src/lib/library-store.ts";

test("saved skills and collections stay private to each account", async () => {
  const platform = await getPlatformProxy<AuthEnv>({
    configPath: "tests/fixtures/auth.wrangler.jsonc",
    persist: false,
    remoteBindings: false,
    envFiles: [],
  });

  try {
    const db = platform.env.AUTH_DB!;
    for (const file of ["0001_auth.sql", "0002_library.sql"]) {
      const migration = await readFile(
        new URL(`../migrations/${file}`, import.meta.url),
        "utf8",
      );
      const statements = migration
        .split(";")
        .map((statement) => statement.trim())
        .filter(Boolean);
      await db.batch(statements.map((statement) => db.prepare(statement)));
    }

    const now = Date.now();
    await db
      .prepare(
        "INSERT INTO auth_user (id, name, email, email_verified, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)",
      )
      .bind(
        "user-1",
        "One",
        "one@example.com",
        1,
        now,
        now,
        "user-2",
        "Two",
        "two@example.com",
        1,
        now,
        now,
      )
      .run();

    const library = createLibraryStore(db);
    await library.saveSkill("user-1", "ibelick/ui-skills-root");
    await library.saveSkill("user-1", "ibelick/ui-skills-root");
    const created = await library.createCollection("user-1", {
      title: "Mobile review",
      skillPath: "ibelick/ui-skills-root",
    });
    const again = await library.createCollection("user-1", {
      title: "Mobile review",
    });

    assert.equal(created.collection.slug, "mobile-review");
    assert.deepEqual(created.collection.skillPaths, ["ibelick/ui-skills-root"]);
    assert.equal(again.collection.slug, "mobile-review-2");

    const first = await library.snapshot("user-1");
    assert.deepEqual(first.savedSkillPaths, ["ibelick/ui-skills-root"]);
    assert.equal(first.collections.length, 2);

    const second = await library.snapshot("user-2");
    assert.deepEqual(second, { savedSkillPaths: [], collections: [] });
    assert.equal(
      await library.getBySlug("user-2", created.collection.slug),
      null,
    );

    await assert.rejects(
      () => library.saveSkill("user-1", "not/a-skill"),
      LibraryError,
    );
    await library.deleteCollection("user-1", created.collection.id);
    const afterDelete = await library.getBySlug("user-1", "mobile-review");
    assert.equal(afterDelete, null);
    const stillSaved = await library.snapshot("user-1");
    assert.deepEqual(stillSaved.savedSkillPaths, ["ibelick/ui-skills-root"]);
  } finally {
    await platform.dispose();
  }
});

test("skills that left the directory can still be removed", async () => {
  const platform = await getPlatformProxy<AuthEnv>({
    configPath: "tests/fixtures/auth.wrangler.jsonc",
    persist: false,
    remoteBindings: false,
    envFiles: [],
  });

  try {
    const db = platform.env.AUTH_DB!;
    for (const file of ["0001_auth.sql", "0002_library.sql"]) {
      const migration = await readFile(
        new URL(`../migrations/${file}`, import.meta.url),
        "utf8",
      );
      const statements = migration
        .split(";")
        .map((statement) => statement.trim())
        .filter(Boolean);
      await db.batch(statements.map((statement) => db.prepare(statement)));
    }

    const now = Date.now();
    await db
      .prepare(
        "INSERT INTO auth_user (id, name, email, email_verified, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      )
      .bind("user-1", "One", "one@example.com", 1, now, now)
      .run();

    const library = createLibraryStore(db);
    const { collection } = await library.createCollection("user-1", {
      title: "Archive",
    });
    // Rows saved while the skill was listed, before it left the registry.
    await db.batch([
      db
        .prepare(
          "INSERT INTO saved_skill (user_id, skill_path, created_at) VALUES (?, ?, ?)",
        )
        .bind("user-1", "someone/retired-skill", now),
      db
        .prepare(
          "INSERT INTO user_collection_skill (collection_id, skill_path, position, created_at) VALUES (?, ?, ?, ?)",
        )
        .bind(collection.id, "someone/retired-skill", 1, now),
    ]);

    await library.unsaveSkill("user-1", "someone/retired-skill");
    await library.removeSkill("user-1", collection.id, "someone/retired-skill");

    const after = await library.snapshot("user-1");
    assert.deepEqual(after.savedSkillPaths, []);
    assert.deepEqual(after.collections[0]?.skillPaths, []);
    await assert.rejects(
      () => library.saveSkill("user-1", "someone/retired-skill"),
      LibraryError,
    );
  } finally {
    await platform.dispose();
  }
});
