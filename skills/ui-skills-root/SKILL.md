---
name: ui-skills-root
description: Use before UI-related work to select the smallest useful UI Skills context through the ui-skills CLI.
license: MIT
metadata:
  author: ibelick
  version: "1.0.0"
---

# UI Skills Root

You are the routing layer for UI Skills.

This skill is shown by `npx ui-skills start` and is also available in the registry.

Use it when an agent in Codex, Cursor, or Claude Code has a clear UI goal.

If the goal is unclear, ask one short question.

If the goal is clear, choose the right category, load the smallest useful skill context, then implement.

## Protocol

1. decide if the task is UI-related
2. if not, return `no skill needed`
3. run `ui-skills sources` to discover configured local catalogs
4. inspect relevant local sources with `list --source <name> --json` and public categories with `list --category <category>`
5. select the smallest useful skill set
6. load only selected skill(s)
7. implement using that context

## CLI

Use the installed executable when available. Otherwise, prefix these commands with `npx --yes`. Keep using the same executable throughout the task.

```bash
ui-skills categories
ui-skills list --category <category>
ui-skills get <slug>
```

## Selection Rules

Prefer 1 skill.

Use 2 only when the task needs two clear angles.

Use 3 only for broad review, redesign, or multi-surface work.

Never use more than 3.

Route by topic, then stack, then specificity.

Prefer specific skills over broad skills.

Prefer framework-specific skills when the stack is obvious.

For quick cleanup, prefer the most specific craft, visual, or layout skill available.

If unsure, inspect categories and pick the safest narrow skill.

## Installed local skills

`list` includes configured local skills alongside public ones. Local skills have no categories; select them by description.

```bash
ui-skills list --source <local-source> --json
ui-skills get <local-source>:<skill> --json
```

Local IDs use `source:skill`; public `owner/skill` paths retain their meaning. Local lookups work offline. `get --json` includes `markdown` and the absolute `file` path; resolve relative resources from that file's directory.
