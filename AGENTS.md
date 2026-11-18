# AGENTS.md

## Site Rules

- Use the semantic color tokens in `src/styles/global.css` for text, fills, surfaces, and lines. Use `surface-default` for elevated or focused components such as cards, code blocks, dialogs, inputs, and navigation controls when it improves separation and contrast.
- Prefer `text-base` for body copy
- Use `text-lg` for section copy and `text-3xl` for major headings.
- Keep headings `font-medium` with `tracking-tight` where appropriate.
- Use `JetBrains Mono` for code, commands, and monospace UI.
- Keep labels and link text in sentence case.
- Prefer light borders, minimal decoration, and generous spacing.

## Skills

- Add skills in `src/data/registry.ts` only.
- Append new skills to the end of `registrySource`; the homepage and New skills page use this order.
- Fill `slug`, `user`, `repo`, `rawUrl`, `githubUrl`, `name`, `description`, and `topics`.
- If a new topic is needed, update `TopicSlug`, `topicsBySlug`, `relatedTopicSlugs`, and `primaryDesignTopicSlugs` only when it is a core topic.
- Do not add local `skills/*` files unless the repo actually hosts the skill markdown.

## Weekly publisher skills audit

Check whether curated publishers (`/skills/{user}`) have pushed new skills to repos we already track.

1. Run `npm run check:publisher-skills` (set `GITHUB_TOKEN` or `GH_TOKEN` for GitHub API rate limits).
2. Review the markdown table, or use `--json` for machine-readable output.
3. Decide which new skills fit ui-skills, then add them to `registrySource` in `src/data/registry.ts`.
4. Run `npm run digests` and `npm run check:skills` before opening a PR.

The command scans every publisher and repo already listed in the registry. Curate what to add — do not bulk-import every reported skill.
