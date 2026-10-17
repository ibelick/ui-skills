# UI Skills

![UI Skills](./public/UI-OG.png)

Skills for Design Engineers.

More on [ui-skills.com](https://www.ui-skills.com/)

## CLI

Browse and fetch skills from your terminal.

```bash
npx ui-skills start
npx ui-skills categories
npx ui-skills list --category motion
npx ui-skills get baseline-ui
```

## MCP

Connect agents to the registry over Model Context Protocol.

```
https://www.ui-skills.com/mcp
```

Tools: `list_skills`, `get_skill`

## Playbook

Distilled UI lessons from the best design engineering skills.

[ui-skills.com/playbook](https://www.ui-skills.com/playbook)

## Accounts

Requires Node.js 22.19 or newer. See [SECURITY.md](SECURITY.md) for the auth
boundaries, reporting guidance, and deployment checks.

Google and GitHub sign-in use Better Auth and Cloudflare D1. Public pages still
work without OAuth credentials; sign-in stays unavailable until configured.
Each provider is optional: GitHub-only production sign-in needs no Google
credentials. Only providers with both a client ID and secret appear in the UI.

1. Run `npm run auth:setup:dev`. This prepares the ignored `.dev.vars` file,
   sets the local auth origin, and generates a secret without printing it.
   Existing credentials are preserved; running it again does not rotate the secret.
2. Create Google and GitHub OAuth applications with these local callbacks:
   - `http://localhost:4321/api/auth/callback/google`
   - `http://localhost:4321/api/auth/callback/github`
3. Add the development provider IDs/secrets to `.dev.vars`. Run
   `npm run db:migrate:local`, then `npm run dev` and visit `/login`.

For production, create a D1 database and replace the local placeholder ID in
`wrangler.jsonc`. The production `BETTER_AUTH_URL` is configured there; local
`.dev.vars` values are not uploaded. Configure `BETTER_AUTH_SECRET`,
`GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` as Cloudflare Worker secrets for
GitHub sign-in. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` only if you also
want Google sign-in. Generate a separate
production secret with `openssl rand -hex 32`; do not reuse the local secret.
Register the same
callback paths on `https://www.ui-skills.com`; use a separate GitHub OAuth app
for production. Apply migrations explicitly with `npm run db:migrate:remote`
before deploying. Never use production credentials or D1 data in local previews.

Only identity/profile and email permissions are needed—no repository or Google
Workspace access. Additional providers must be connected from `/account` while
signed in; matching email addresses are not silently merged. Account deletion,
billing, and saved skills are not included yet.

## License

Licensed under the [MIT license](https://github.com/ibelick/ui-skills/blob/main/LICENSE).

## Include installed local skills

Extend the public catalog with skills already on your machine. Configure `~/.config/ui-skills/config.json` (or `$XDG_CONFIG_HOME/ui-skills/config.json`). `UI_SKILLS_CONFIG` selects a different file; relative directory paths resolve from that file and `~/` expands to your home directory.

```json
{
  "localSources": [
    {
      "name": "ui-sh",
      "path": "~/.agents/skills",
      "skills": ["design", "make-responsive", "add-dark-mode"]
    }
  ]
}
```

Each source has a unique name other than `public` and a directory containing skill folders. Omit `skills` to discover all immediate folders containing `SKILL.md`, including symlinked folders, or list folder names to select specific skills. Files need standard YAML `name` and `description` frontmatter. Duplicate names within a source and unreadable selected files are errors.

```sh
ui-skills sources
ui-skills list --json
ui-skills list --source ui-sh --json
ui-skills get ui-sh:design --json
ui-skills get ibelick/fixing-accessibility
```

Local IDs use `source:skill`; existing public `owner/skill` paths and bare slugs keep their meaning. Local `get` and `list --source <local-name>` work without network access. `get --json` includes the Markdown and absolute `file` path for a local skill; follow relative resources from that file's directory. Without `--json`, `get` prints exact Markdown. The CLI only reads local files and sees installed updates on its next invocation.

`list` combines public and local entries. `list --source public` limits it to the public registry. Categories apply to public entries; select local sources by name and their skill descriptions. `sources` lists configuration without querying the network. Invalid config and file errors exit with code 4 and diagnostics on stderr; missing local IDs or source names exit with code 3. JSON output is payload-only on stdout.

Install and update paid or internal skills through their provider; this configuration reads the installed files without credentials or redistribution.
