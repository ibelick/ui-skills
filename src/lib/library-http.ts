import { parseSkillPath, parseStoredSkillPath } from "./library-skill";
import type { LibraryStore } from "./library-store";
import {
  LibraryError,
  parseCollectionTitle,
  type LibrarySnapshot,
} from "./library-types";

const COLLECTION_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

function libraryResponse(library: LibrarySnapshot, extra?: unknown) {
  return json({ library, ...(extra ? { collection: extra } : {}) });
}

function asRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new LibraryError("Send a valid request.");
  }
  return value as Record<string, unknown>;
}

async function readBody(request: Request) {
  const type = request.headers.get("content-type") ?? "";
  if (!type.startsWith("application/json")) {
    throw new LibraryError("Send a valid request.");
  }
  const text = await request.text();
  if (text.length > 4000) throw new LibraryError("That request is too large.", 413);
  if (!text) return {};
  try {
    return asRecord(JSON.parse(text));
  } catch (error) {
    if (error instanceof LibraryError) throw error;
    throw new LibraryError("Send a valid request.");
  }
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return Boolean(origin) && origin === new URL(request.url).origin;
}

function collectionId(value: string | undefined) {
  if (!value || !COLLECTION_ID.test(value)) {
    throw new LibraryError("That collection could not be found.", 404);
  }
  return value;
}

export async function handleLibraryRequest(
  request: Request,
  userId: string | null,
  store: LibraryStore,
) {
  if (!userId) {
    return json({ error: "Sign in to use your library." }, 401);
  }

  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";
  const prefix = "/api/library";
  if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) {
    return json({ error: "Not found." }, 404);
  }
  const rest = pathname === prefix ? "" : pathname.slice(prefix.length + 1);
  const segments = rest ? rest.split("/") : [];
  const method = request.method.toUpperCase();

  if (method !== "GET" && method !== "HEAD" && !sameOrigin(request)) {
    return json({ error: "That request could not be completed." }, 403);
  }

  try {
    if (segments.length === 0 && (method === "GET" || method === "HEAD")) {
      return libraryResponse(await store.snapshot(userId));
    }

    if (segments.length === 1 && segments[0] === "saved" && method === "POST") {
      const body = await readBody(request);
      return libraryResponse(
        await store.saveSkill(userId, parseSkillPath(body.skillPath)),
      );
    }

    if (
      segments.length === 1 &&
      segments[0] === "saved" &&
      method === "DELETE"
    ) {
      const body = await readBody(request);
      return libraryResponse(
        await store.unsaveSkill(userId, parseStoredSkillPath(body.skillPath)),
      );
    }

    if (
      segments.length === 1 &&
      segments[0] === "collections" &&
      method === "POST"
    ) {
      const body = await readBody(request);
      const created = await store.createCollection(userId, {
        title: parseCollectionTitle(body.title),
        skillPath:
          body.skillPath == null ? undefined : parseSkillPath(body.skillPath),
      });
      return libraryResponse(created.library, created.collection);
    }

    if (
      segments.length === 2 &&
      segments[0] === "collections" &&
      method === "PATCH"
    ) {
      const body = await readBody(request);
      if (!("title" in body)) throw new LibraryError("Nothing to update.");
      const input = { title: parseCollectionTitle(body.title) };
      return libraryResponse(
        await store.updateCollection(userId, collectionId(segments[1]), input),
      );
    }

    if (
      segments.length === 2 &&
      segments[0] === "collections" &&
      method === "DELETE"
    ) {
      return libraryResponse(
        await store.deleteCollection(userId, collectionId(segments[1])),
      );
    }

    if (
      segments.length === 3 &&
      segments[0] === "collections" &&
      segments[2] === "skills" &&
      method === "POST"
    ) {
      const body = await readBody(request);
      return libraryResponse(
        await store.addSkill(
          userId,
          collectionId(segments[1]),
          parseSkillPath(body.skillPath),
        ),
      );
    }

    if (
      segments.length === 3 &&
      segments[0] === "collections" &&
      segments[2] === "skills" &&
      method === "DELETE"
    ) {
      const body = await readBody(request);
      return libraryResponse(
        await store.removeSkill(
          userId,
          collectionId(segments[1]),
          parseStoredSkillPath(body.skillPath),
        ),
      );
    }

    return json({ error: "Not found." }, 404);
  } catch (error) {
    if (error instanceof LibraryError) {
      return json({ error: error.message }, error.status);
    }
    console.error(JSON.stringify({ component: "library" }));
    return json({ error: "That action could not be completed." }, 500);
  }
}
