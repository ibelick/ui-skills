---
name: create-design-md
description: Create or update a DESIGN.md from an existing product repository or public website. Use when asked to document an interface's design language, reconstruct its visual system, extract design tokens and guidance from current evidence, or give coding agents persistent UI context. Do not modify product source or promote accidental implementation patterns into design decisions.
---

# Create DESIGN.md

Create a `DESIGN.md` for one product or coherent website. Record the design language that governs it, not every value that happens to exist.

## Boundaries

- Modify only `DESIGN.md`. Do not change product source, dependencies, configuration, or generated files.
- Use the DESIGN.md format contract below. Do not invent a competing schema.
- Do not copy every discovered token or component into the document.
- Do not convert repetition, local styling, or visual preference into product intent.

## 1. Choose the mode

### Repository mode

Use when a local product repository is available. Create or update `DESIGN.md` at the root of the selected product.

If the repository contains multiple deployable products, select the one named by the user. If the request does not identify one and ownership is ambiguous, ask before writing.

Repository evidence may establish normative values, token names, component ownership, and documented rationale.

### URL mode

Use when the user provides a public URL without its source repository. Create a reconstructed `DESIGN.md` draft in the current workspace.

URL mode requires rendered browser access. Inspect the DOM, computed styles, and publicly loaded stylesheets at desktop and mobile widths. Screenshots may support interpretation but cannot establish exact values by themselves.

If no local browser tool is available, Firecrawl can provide the rendered evidence. Scrape each sampled page twice, at desktop width and with `mobile: true`, requesting the `rawHtml`, `branding`, and full-page `screenshot` formats ([scrape formats](https://docs.firecrawl.dev/features/scrape?utm_source=ui-skills&utm_medium=integration)). `rawHtml` is a rendered HTML snapshot without computed styles, so fetch the stylesheets it links and promote a `branding` value only when a loaded declaration with that value applies to an element in the snapshot, or when it recurs for the same role across samples. Never reuse `branding` role names such as `primary` or `accent` as token names.

Inspect the supplied page and shared chrome. For a site-wide request, sample up to three same-origin pages that represent distinct templates.

URL evidence may establish only observable visual patterns and computed values. It cannot establish internal token names, component ownership, undocumented rationale, or whether a pattern is intentionally canonical.

If rendered inspection is unavailable, ask for screenshots or source files. Do not create a DESIGN.md from copy, metadata, or HTML structure alone.

Choose repository mode whenever source is available. A supplied URL may verify rendered presentation but does not replace repository evidence.

## Shared evidence pipeline

The modes differ only in how they collect evidence. They must use the same record and output pipeline:

```text
role → value → source → scope → recurrence → confidence
```

1. Collect evidence using the selected mode.
2. Record the source, scope, and recurrence for each candidate.
3. Normalize candidates into the DESIGN.md schema.
4. Omit candidates that are uncertain, local without a contract, or not implementation-relevant.
5. Validate frontmatter shape and export compatibility.
6. Write Markdown only after the normalized frontmatter passes.

Never let repository or URL evidence introduce a second token schema. The same flat token names, mapping-shaped typography, omission rules, and export gates apply to both modes.

The generated document is private until validation passes. Never return, display, or summarize a DESIGN.md draft before lint and export succeed. If validation reports an invalid shape or missing export category, rewrite the frontmatter and rerun; if the category cannot be repaired, remove it and report it as omitted.

## 2. Trace the evidence

In repository mode, inspect in this order:

1. Existing `DESIGN.md` and explicit repository guidance
2. Tokens, themes, variables, and global styles
3. Shared primitives and their variants
4. Representative routes and rendered consumers
5. Surface-local implementations

A source participates only when the selected product imports, references, inherits, or renders it. Exclude proposals, migrations, examples, generated outputs, legacy implementations, and similarly named packages unless the selected product uses them.

In URL mode, sample representative elements for:

- colors and surface roles
- typography roles
- spacing and layout
- borders, radii, and elevation
- navigation, buttons, inputs, cards, and repeated content structures
- desktop and mobile presentation

Prefer computed values and loaded CSS declarations over visual estimation.

Before drafting URL-mode prose or YAML, build a private evidence ledger for each sampled page and viewport. For each candidate, record: page, viewport, element role, computed property/value, and the matching loaded-CSS declaration or custom property when available. Inspect the public stylesheets loaded by the page, including custom properties and media-query rules; a stylesheet value is usable only when it is connected to a rendered element or recurs across the sampled pages.

Promote a URL value into DESIGN.md when either (a) the rendered computed value and a loaded declaration/custom property agree, or (b) the same computed value recurs for the same role across the required samples. If neither condition holds, omit the value. You may preserve an exposed custom-property name only when its declaration and rendered use are directly observable; do not invent semantic aliases from a raw value.

For every URL-mode claim, require all three proofs before writing it:

1. Observation: the pattern or value is visible or computed on the rendered page.
2. Basis: it is measured, or recurs across the required sampled pages/viewports.
3. Consequence: it changes a concrete implementation choice in DESIGN.md.

If any proof is missing, omit the claim. Do not turn a visual impression into a token, a single occurrence into a site-wide rule, or a guessed value into YAML. Exact values require computed styles or loaded CSS; otherwise describe the role without a value or omit it.

## 3. Decide what belongs

In repository mode, find explicit product intent or a design reference before describing product character. In URL mode, do not invent product character; the Overview may state only the site's observable purpose and presentation, and must identify the document as reconstructed.

Write YAML only from named shared tokens and roles in governing sources. Do not turn utility classes, repeated literals, or component values into token scales.

Treat frontmatter shape as a hard gate, not a stylistic choice: a value that is a token group must be a mapping whose children are the schema's fields. Never emit scalar typography entries (`sans: Geist`), arbitrary nested source objects (`font-family: { mono: ... }`), or rounded keys copied from CSS variable names (`radius-sm`, `radius-md`, etc.).

Use mappings, never sequences, for token groups. When a governing source defines one group-level token such as `--radius`, normalize it to `base`; otherwise preserve the source token names.

Map source values into DESIGN.md schema fields. Preserve semantic token names, not source object nesting. For example, write `typography.mono.fontFamily: Geist Mono`, never `typography.mono: Geist Mono`; write `rounded.base: 0.625rem` when the source has only `--radius`, never `rounded.radius` or derived radius steps.

Resolve framework utilities through the active theme or configuration before writing exact values.

Identify the repository's export target before writing frontmatter: `css-tailwind` for Tailwind v4, `json-tailwind` for Tailwind v3, and `dtcg` otherwise. Token names must be valid for that target.

Check the installed DESIGN.md specification before encoding theme modes:

```bash
npx @google/design.md spec
```

If the specification supports `themes` and `default-theme`, use its theme-aware token syntax. Otherwise, put the default-theme value under each canonical semantic token and preserve exact alternate-theme values in a `## Themes` table. Do not create parallel `-light` and `-dark` token names, discard alternate-theme values, or use unreleased syntax. A fallback Themes table is documentation only; do not pretend it makes the frontmatter theme-aware.

In repository mode, every prose rule must be supported by explicit guidance, a named shared token or variant, or a shared owner used by at least two audited surfaces. Otherwise omit it.

In URL mode, every prose rule must be directly observable. A site-wide rule must recur across at least two sampled templates; otherwise scope it to the inspected page. Use reconstructed role-based names and label the document as a draft.

URL-mode YAML is intentionally sparse, but not empty when measured evidence exists. Add a category when at least one supported value or role survives the three-proof gate. Colors may use computed values or verified public custom properties, but must remain flat and export-safe; typography must use canonical fields such as `fontFamily`, `fontSize`, `lineHeight`, and `fontWeight`; rounded and spacing values must come from computed styles or loaded declarations. Do not create aliases such as `primary`, `elevated`, or `display` merely to organize observations. A component section requires the same interaction or surface treatment to recur across at least two sampled pages and to change a concrete implementation choice.

URL reconstruction does not change the frontmatter schema. Use only these typography property names: `fontFamily`, `fontSize`, `lineHeight`, `fontWeight`, and `letterSpacing`. For example:

```yaml
typography:
  sans:
    fontFamily: Inter Variable
  display:
    fontFamily: Inter Variable
    fontSize: 64px
    lineHeight: 64px
    fontWeight: 510
```

Never emit URL-specific aliases such as `family`, `size`, `weight`, `mobile-display`, or nested `sans`/`mono` values inside a typography scale. Reconstructed role names may vary; schema field names may not.

For URL output, use `css-tailwind` as the compatibility export target unless the user specifies another target. Flatten reconstructed color roles into valid token names. Use `background-primary`, `foreground-secondary`, or `border-muted`, not nested keys such as `background.primary` or `foreground.secondary`. Every emitted token name must match `^[a-zA-Z0-9][a-zA-Z0-9-]*$`; reject and rewrite any key that would fail this test.

Normalize URL frontmatter before writing any Markdown. The order is: collect evidence, choose the export target, map evidence into the canonical schema, reject invalid shapes, then write the document. Never draft prose first and retrofit the YAML afterward.

URL frontmatter must satisfy these shape rules:

- `colors` is a flat mapping of valid token names to values.
- `typography` is a mapping of named scales; each scale is a mapping using only canonical fields.
- `rounded` and `spacing` are flat mappings of valid token names to values.
- `components` may reference canonical token paths but may not introduce a second token schema.

If normalization would require inventing a token name, field, scale, or semantic relationship, omit the candidate.

Outside the Overview, every Markdown sentence must change an implementation choice. Delete component inventories, generic design advice, and prose that only restates YAML.

Preserve the scope and direction of every rule. When implementation conflicts with explicit guidance, document the guidance and report the conflict outside `DESIGN.md`.

## 4. Write the document

Start with the smallest valid frontmatter:

```yaml
---
version: alpha
name: <string>
description: <string>
---
```

Only `name` is required. Add `colors`, `typography`, `rounded`, `spacing`, or `components` only when a governing source already defines that named system or contract. Do not create token names to organize implementation values. Token references use `{path.to.token}`.

Use schema-shaped mappings, not copied source nesting. A typography scale is always named and maps its properties beneath it:

```yaml
typography:
  sans:
    fontFamily: Geist
  mono:
    fontFamily: Geist Mono
```

If the source defines only `--radius`, write `rounded.base`, not `rounded.radius`; do not derive `sm`, `md`, `lg`, or `xl` from utility classes or repeated values. Before saving, inspect the parsed frontmatter and reject it yourself if any `typography` child is scalar or if `rounded` contains keys not present in the governing source.

Start with `## Overview`. State only the product's purpose and evidenced design direction. Do not summarize pages, components, tokens, or implementation. Add only supported sections from this order:

1. Colors
2. Themes
3. Typography
4. Layout
5. Elevation & Depth
6. Shapes
7. Components
8. Do's and Don'ts

Do not create a section merely because it exists in the format. Do not reorder or duplicate included sections. Add an unknown section only when supported guidance cannot fit a standard section.

Markdown records design intent and application guidance. Except for the fallback `## Themes` table, do not put token inventories, component configuration, source syntax, or documentation methodology in Markdown.

Include a Don't only when a governing source states an explicit prohibition.

- Put exact normative values in YAML frontmatter, except alternate-theme values when the installed specification cannot represent modes.
- Put supported rationale and application guidance in Markdown.
- Preserve accepted decisions from an existing `DESIGN.md` unless the user or current governing evidence replaces them.
- Do not invent brand personality, audience, or emotional rationale.
- Do not include citations, audit notes, rejected candidates, conflicts, or unresolved questions inside `DESIGN.md`.

Before saving, delete:

- any YAML token not already named by a governing source
- any page-local behavior presented as a product-wide rule
- any implementation pattern that conflicts with explicit guidance
- any prohibition not explicitly stated
- any exact implementation value outside YAML frontmatter or the fallback `## Themes` table
- any component configuration or documentation methodology in Markdown
- any sentence that does not change the resulting DESIGN.md

Run one final no-op pass: remove vague advice such as “be thorough,” “keep it polished,” or “use good judgment.” Keep only evidence gates, schema constraints, or application rules that change the document.

## 5. Validate

Run structural linting:

```bash
npx @google/design.md lint DESIGN.md
```

Then run one compatibility export using the target selected above:

```bash
npx @google/design.md export --format <format> DESIGN.md
```

Inspect the output. Every populated frontmatter category supported by the target must emit its corresponding token category; an empty or missing category is a schema failure even when the command exits successfully. Rewrite the frontmatter and rerun validation until the category is emitted, unless the target genuinely cannot represent it. Do not report success while any populated category is missing from the export. Do not return the document while lint or export fails. Do not remove supported design information solely to satisfy an exporter limitation; report that limitation instead. Do not create or retain exported files.

For `css-tailwind`, verify these output families: `colors` → `--color-*`, `typography.<name>.fontFamily` → `--font-*`, `typography.<name>.fontSize` → `--text-*`, `rounded` → `--radius-*`, and `spacing` → `--spacing-*`. Typography entries are named scales; put `fontFamily`, `fontSize`, and `lineHeight` inside each scale, never under arbitrary source nesting such as `font-family`. If `typography` is populated but the export contains neither `--font-*` nor `--text-*`, the document is invalid and must be rewritten before reporting.

When updating an existing document, preserve its original contents temporarily and run:

```bash
npx @google/design.md diff <previous-file> DESIGN.md
```

Restore any removed accepted decision unless current governing evidence or the user explicitly replaces it.

## 6. Report

Return:

- mode and audited product or URL
- created or updated `DESIGN.md`
- governing sources used
- conflicts or unsupported areas omitted from the document
- final lint and export results

In URL mode, label the output as a reconstructed draft.
