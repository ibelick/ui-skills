import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { formatStarCount } from "../src/lib/format-stars.ts";
import {
  repositoryForSkillHref,
  repositoryForSkillPath,
  starsForRepository,
} from "../src/lib/skill-repository.ts";

describe("skill repository stars", () => {
  test("resolves a skill path to its source repository stars", () => {
    const repository = repositoryForSkillPath("ibelick/improve-ui");
    assert.equal(repository, "ibelick/ui-skills");
    const stars = starsForRepository(repository);
    assert.equal(typeof stars, "number");
    assert.ok((stars ?? 0) > 1000);
    assert.match(formatStarCount(stars ?? 0), /^\d+(\.\d)?k\+$/);
  });

  test("reads the repository from a skill href", () => {
    assert.equal(
      repositoryForSkillHref("/skills/mengto/design-first-ui-prompting"),
      "MengTo/Skills",
    );
    assert.equal(
      repositoryForSkillHref(
        "/skills/mengto/design-first-ui-prompting?view=raw",
      ),
      "MengTo/Skills",
    );
  });

  test("hides a count when the repository has no star metadata", () => {
    assert.equal(repositoryForSkillHref("/skills/accessibility"), undefined);
    assert.equal(starsForRepository("danny/danny-md"), undefined);
  });
});
