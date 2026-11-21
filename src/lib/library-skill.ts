import { getSkillByPath } from "./skill-catalog";
import { LibraryError } from "./library-types";

/** Catalog path slugs are the only skills a library can store. */
export function parseSkillPath(value: unknown) {
  if (typeof value !== "string" || value.length > 200 || !getSkillByPath(value)) {
    throw new LibraryError("Choose a skill from the directory.");
  }
  return value;
}

/**
 * Removals accept any stored path: a skill can leave the directory after it
 * was saved, and the user must still be able to remove it from their library.
 */
export function parseStoredSkillPath(value: unknown) {
  if (typeof value !== "string" || !value || value.length > 200) {
    throw new LibraryError("Choose a skill from the directory.");
  }
  return value;
}
