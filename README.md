# UI Skills

![UI Skills](./public/UI-OG.webp)

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

There is no token configuration, copying, publishing, caching, or installation of local skills. Provider updates remain the provider installer's responsibility. `start` retains its existing public routing-guide behavior. Keep using your local executable while testing a fork; `npx ui-skills` invokes the published package.
