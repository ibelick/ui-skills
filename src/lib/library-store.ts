import type { D1Database } from "@cloudflare/workers-types";
import { and, asc, count, desc, eq, inArray, max } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { parseSkillPath, parseStoredSkillPath } from "./library-skill";
import {
  LIBRARY_LIMITS,
  LibraryError,
  collectionSlug,
  suffixedCollectionSlug,
  type LibraryCollection,
  type LibrarySnapshot,
} from "./library-types";

const { savedSkill, userCollection, userCollectionSkill } = schema;

type LibraryDatabase = ReturnType<typeof drizzle<typeof schema>>;

export type LibraryStore = {
  snapshot(userId: string): Promise<LibrarySnapshot>;
  getBySlug(userId: string, slug: string): Promise<LibraryCollection | null>;
  saveSkill(userId: string, skillPath: string): Promise<LibrarySnapshot>;
  unsaveSkill(userId: string, skillPath: string): Promise<LibrarySnapshot>;
  createCollection(
    userId: string,
    input: { title: string; skillPath?: string },
  ): Promise<{ library: LibrarySnapshot; collection: LibraryCollection }>;
  updateCollection(
    userId: string,
    id: string,
    input: { title: string },
  ): Promise<LibrarySnapshot>;
  deleteCollection(userId: string, id: string): Promise<LibrarySnapshot>;
  addSkill(
    userId: string,
    id: string,
    skillPath: string,
  ): Promise<LibrarySnapshot>;
  removeSkill(
    userId: string,
    id: string,
    skillPath: string,
  ): Promise<LibrarySnapshot>;
};

function toCollection(
  row: {
    id: string;
    slug: string;
    title: string;
  },
  skillPaths: string[],
): LibraryCollection {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    skillPaths,
  };
}

async function skillPathsFor(
  db: LibraryDatabase,
  collectionIds: string[],
) {
  const grouped = new Map<string, string[]>();
  if (collectionIds.length === 0) return grouped;
  const rows = await db
    .select()
    .from(userCollectionSkill)
    .where(inArray(userCollectionSkill.collectionId, collectionIds))
    .orderBy(
      asc(userCollectionSkill.position),
      asc(userCollectionSkill.createdAt),
    );
  for (const row of rows) {
    const paths = grouped.get(row.collectionId) ?? [];
    paths.push(row.skillPath);
    grouped.set(row.collectionId, paths);
  }
  return grouped;
}

async function readSnapshot(
  db: LibraryDatabase,
  userId: string,
): Promise<LibrarySnapshot> {
  const [saved, collections] = await Promise.all([
    db
      .select({ skillPath: savedSkill.skillPath })
      .from(savedSkill)
      .where(eq(savedSkill.userId, userId))
      .orderBy(desc(savedSkill.createdAt)),
    db
      .select({
        id: userCollection.id,
        slug: userCollection.slug,
        title: userCollection.title,
      })
      .from(userCollection)
      .where(eq(userCollection.userId, userId))
      .orderBy(desc(userCollection.updatedAt)),
  ]);
  const skills = await skillPathsFor(
    db,
    collections.map((collection) => collection.id),
  );
  return {
    savedSkillPaths: saved.map((row) => row.skillPath),
    collections: collections.map((collection) =>
      toCollection(collection, skills.get(collection.id) ?? []),
    ),
  };
}

async function ownedCollection(
  db: LibraryDatabase,
  userId: string,
  id: string,
) {
  const [collection] = await db
    .select()
    .from(userCollection)
    .where(and(eq(userCollection.id, id), eq(userCollection.userId, userId)))
    .limit(1);
  if (!collection) {
    throw new LibraryError("That collection could not be found.", 404);
  }
  return collection;
}

async function uniqueSlug(db: LibraryDatabase, userId: string, title: string) {
  const base = collectionSlug(title);
  for (let suffix = 1; suffix <= 50; suffix += 1) {
    const slug = suffixedCollectionSlug(base, suffix);
    const [existing] = await db
      .select({ id: userCollection.id })
      .from(userCollection)
      .where(
        and(eq(userCollection.userId, userId), eq(userCollection.slug, slug)),
      )
      .limit(1);
    if (!existing) return slug;
  }
  throw new LibraryError("Use a different collection title.", 409);
}

export function createLibraryStore(database: D1Database): LibraryStore {
  const db = drizzle(database, { schema });

  return {
    snapshot(userId) {
      return readSnapshot(db, userId);
    },

    async getBySlug(userId, slug) {
      const [collection] = await db
        .select()
        .from(userCollection)
        .where(
          and(eq(userCollection.userId, userId), eq(userCollection.slug, slug)),
        )
        .limit(1);
      if (!collection) return null;
      const skills = await skillPathsFor(db, [collection.id]);
      return toCollection(collection, skills.get(collection.id) ?? []);
    },

    async saveSkill(userId, skillPath) {
      const path = parseSkillPath(skillPath);
      const [existing] = await db
        .select({ skillPath: savedSkill.skillPath })
        .from(savedSkill)
        .where(
          and(eq(savedSkill.userId, userId), eq(savedSkill.skillPath, path)),
        )
        .limit(1);
      if (!existing) {
        const [saved] = await db
          .select({ value: count() })
          .from(savedSkill)
          .where(eq(savedSkill.userId, userId));
        if (saved.value >= LIBRARY_LIMITS.savedSkills) {
          throw new LibraryError("You can save up to 200 skills.");
        }
        await db.insert(savedSkill).values({
          userId,
          skillPath: path,
          createdAt: new Date(),
        });
      }
      return readSnapshot(db, userId);
    },

    async unsaveSkill(userId, skillPath) {
      const path = parseStoredSkillPath(skillPath);
      await db
        .delete(savedSkill)
        .where(
          and(eq(savedSkill.userId, userId), eq(savedSkill.skillPath, path)),
        );
      return readSnapshot(db, userId);
    },

    async createCollection(userId, input) {
      const skillPath = input.skillPath
        ? parseSkillPath(input.skillPath)
        : undefined;
      const [existing] = await db
        .select({ value: count() })
        .from(userCollection)
        .where(eq(userCollection.userId, userId));
      if (existing.value >= LIBRARY_LIMITS.collections) {
        throw new LibraryError("You can create up to 30 collections.");
      }
      const now = new Date();
      const slug = await uniqueSlug(db, userId, input.title);
      const id = crypto.randomUUID();
      try {
        await db.insert(userCollection).values({
          id,
          userId,
          slug,
          title: input.title,
          description: "",
          createdAt: now,
          updatedAt: now,
        });
      } catch {
        throw new LibraryError(
          "That collection could not be created. Try a different title.",
          409,
        );
      }
      if (skillPath) {
        await db.insert(userCollectionSkill).values({
          collectionId: id,
          skillPath,
          position: 1,
          createdAt: now,
        });
      }
      const library = await readSnapshot(db, userId);
      const collection = library.collections.find((entry) => entry.id === id);
      if (!collection) {
        throw new LibraryError("That collection could not be created.", 500);
      }
      return { library, collection };
    },

    async updateCollection(userId, id, input) {
      await ownedCollection(db, userId, id);
      await db
        .update(userCollection)
        .set({
          title: input.title,
          updatedAt: new Date(),
        })
        .where(
          and(eq(userCollection.id, id), eq(userCollection.userId, userId)),
        );
      return readSnapshot(db, userId);
    },

    async deleteCollection(userId, id) {
      await ownedCollection(db, userId, id);
      await db
        .delete(userCollectionSkill)
        .where(eq(userCollectionSkill.collectionId, id));
      await db
        .delete(userCollection)
        .where(
          and(eq(userCollection.id, id), eq(userCollection.userId, userId)),
        );
      return readSnapshot(db, userId);
    },

    async addSkill(userId, id, skillPath) {
      const path = parseSkillPath(skillPath);
      await ownedCollection(db, userId, id);
      const [alreadyAdded] = await db
        .select({ skillPath: userCollectionSkill.skillPath })
        .from(userCollectionSkill)
        .where(
          and(
            eq(userCollectionSkill.collectionId, id),
            eq(userCollectionSkill.skillPath, path),
          ),
        )
        .limit(1);
      if (!alreadyAdded) {
        const [skills] = await db
          .select({ value: count() })
          .from(userCollectionSkill)
          .where(eq(userCollectionSkill.collectionId, id));
        if (skills.value >= LIBRARY_LIMITS.skillsPerCollection) {
          throw new LibraryError("A collection can include up to 40 skills.");
        }
        const [latest] = await db
          .select({ value: max(userCollectionSkill.position) })
          .from(userCollectionSkill)
          .where(eq(userCollectionSkill.collectionId, id));
        const now = new Date();
        await db.insert(userCollectionSkill).values({
          collectionId: id,
          skillPath: path,
          position: (latest?.value ?? 0) + 1,
          createdAt: now,
        });
        await db
          .update(userCollection)
          .set({ updatedAt: now })
          .where(eq(userCollection.id, id));
      }
      return readSnapshot(db, userId);
    },

    async removeSkill(userId, id, skillPath) {
      const path = parseStoredSkillPath(skillPath);
      await ownedCollection(db, userId, id);
      await db
        .delete(userCollectionSkill)
        .where(
          and(
            eq(userCollectionSkill.collectionId, id),
            eq(userCollectionSkill.skillPath, path),
          ),
        );
      await db
        .update(userCollection)
        .set({ updatedAt: new Date() })
        .where(eq(userCollection.id, id));
      return readSnapshot(db, userId);
    },
  };
}
