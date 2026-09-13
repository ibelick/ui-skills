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
3. identify the likely category
4. inspect that category with the CLI
5. select the smallest useful skill set
6. load only selected skill(s)
7. implement using that context

## CLI

Use the installed executable when available. Otherwise, prefix these commands with `npx --yes`. Keep using the same executable throughout the task so local fork features remain available.

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

When local catalogs are configured, `list` includes installed skills alongside public ones. Prefer the installed CLI when using a local fork.

```bash
ui-skills sources
ui-skills list --source <local-source> --json
ui-skills get <local-source>:<skill> --json
```

Select local guidance by description. Local IDs use a colon, preserving public `owner/skill` paths. `get --json` includes the skill's `markdown` and absolute `file` path; resolve relative resources from that file's directory. Local lookups work offline and read installed updates directly. Configure `localSources` in `~/.config/ui-skills/config.json` (or set `UI_SKILLS_CONFIG`), with a source `name`, directory `path`, and optional `skills` folder allowlist. Use `sources` to discover configured catalogs rather than assuming a provider is installed.
