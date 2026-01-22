# UI Skills

![UI Skills](./public/cover.webp)

The open taste layer for agent-generated UI.

A growing set of skills to refine agent-generated interfaces.

## Installation

```bash
npx ui-skills init
```

## Add skills

```bash
npx ui-skills add baseline-ui
npx ui-skills add fixing-accessibility
npx ui-skills add fixing-metadata
npx ui-skills add fixing-motion-performance
npx ui-skills add --all
```

## Usage

```bash
/baseline-ui review src/
```

## Available skills

| Skill | Purpose |
|------|---------|
| [baseline-ui](./skills/baseline-ui/SKILL.md) | opinionated UI baseline |
| [fixing-accessibility](./skills/fixing-accessibility/SKILL.md) | keyboard, labels, focus, semantics |
| [fixing-metadata](./skills/fixing-metadata/SKILL.md) | correct titles, meta, social cards |
| [fixing-motion-performance](./skills/fixing-motion-performance/SKILL.md) | safe, performance-first UI motion |

## License

Licensed under the [MIT license](https://github.com/ibelick/ui-skills/blob/main/LICENSE).
