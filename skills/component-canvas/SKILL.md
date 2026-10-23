---
name: component-canvas
description: Build a full-screen, interactive canvas to explore existing UI components and their variants with pan and zoom.
---

# Component canvas

Build a canvas that shows the project's existing components as they really behave. The canvas wraps components. It never changes them.

## Ground rules

- Do not modify component source, exports, styles, hooks, or behavior to make the canvas work. Components must not import or depend on canvas code.
- Do not patch libraries, browser APIs, rendered component DOM, or portal roots.
- Show only the components the user asked for. Adding components, installing dependencies, changing a component's design, or making the canvas public requires permission first.
- Keep existing access controls.
- Leave unrelated work alone. If removing an earlier canvas integration, undo only its changes to components.
- Follow any restrictions on commands, browser access, dependencies, and edits.

## Before building

Read the repository conventions, routes, component public APIs, design tokens, and test setup. Use the existing framework and libraries.

Ask the user only when the answer changes what gets built or touches shared code: which components are in scope, whether a new dependency is acceptable, or whether a live service may be previewed. For everything else, choose a sensible default, state it in the report, and proceed.

## Build order

1. Add a minimal canvas route or entry point with one group and one component. Confirm it works.
2. Add the remaining groups with sample data.
3. Add variant comparisons, then advanced gestures and persistence, one feature at a time.

Keep canvas code in one place. Check imports and package exports when moving files. Follow the project's language, validation, and test conventions. Do not add architectural layers or directory names the project does not already use.

Keep layout and camera logic separate from sample data and component source.

## Layout

- Fill the viewport with a plain background.
- If the project already supports light and dark themes, add an accessible toggle using its existing theme API. Apply the selected theme to the canvas and native portals. If theme support is absent, omit the toggle. Do not invent themes or change component styles.
- Give every group the same padding, radius, and thin dashed border, subtle but visible in both themes. Use an existing muted color at roughly 25% opacity for borders. Place its plain title 8px above the border, using the muted text color without opacity.
- Use wide groups with equal-width example slots filling each row. Wrap when needed and keep generous horizontal and vertical gaps within and between groups. Spread the layout without enlarging components.
- Groups cannot be dragged. Their positions need not be hard-coded. Measure their actual bounds, including title, border, and padding. Ignore rendering-containment placeholders (empty boxes that reserve space before content renders), since they do not reflect real content size.
- Omit background dots, decorative cards, page menus, instruction banners, selection tools, and block editing. Component cards and menus may appear as examples.

## Variants

- Show every supported named variant and useful state within the requested scope. Read the public APIs for styles, text and icon sizes, orientation, placement, alignment, modality, and collapse modes.
- Include useful content and composition examples.
- Do not invent variants or generate every prop combination. List what was omitted and why.
- Compare one prop or feature at a time. Hold everything else constant: same wrapper, same sample data, same text, icons, theme, and spacing.
- Change the style variant only in style comparisons. Size, state, placement, and other comparisons use a single style, usually the default.

Example: in a size comparison, every button reads "Continue" and uses `variant="default"`. Only `size` changes. The style comparison changes `variant` and keeps size and text the same.

- Keep the component's own state styling (disabled opacity, checked color). Examples respond to input unless they show a disabled or read-only state.
- Test hover, focus, and pressed states through real pointer and keyboard input, not added classes.
- For portal examples, use the same trigger each time. Do not force several modals open at once.
- Keep a variant list and coverage tests. Use types if the project supports them.
- If a component cannot show a responsive or visual case, explain the limit. Do not change the component to fake it.

## Interactions

- Clicks, text selection, typing, button and switch activation, focus, and nested scrolling must keep working.
- Canvas shortcuts (Space, arrows, Escape, native undo) apply to the canvas shell only. They must not take those keys away from preview controls.
- Handle preview navigation in the canvas host. Links to canvas groups move the camera instead of scrolling the page. Define what happens to links that leave the canvas, including links inside portals. Do not change component links or router internals.
- Portals stay in their native roots at screen-space size. Let the library handle positioning and modal focus. Use public container options only when needed. Check positioning and clickable areas under canvas transforms. If they break, report it or propose a separate preview document. Do not patch components.
- The canvas has no undo/redo, editing shortcuts, or history.

## Safety for previews

Make each preview safe before it mounts:

- Use providers with test data, mock services, or existing callback props to block live calls and real writes.
- Static demo assets and local fixtures are fine.
- Never use production credentials or data.
- If safe isolation is not available, omit the live example and explain why. A separate document alone does not make a preview safe.

## Camera

- Mouse and trackpad: pan, and zoom around the cursor. Touch: pan and pinch.
- Start ordinary pan on empty canvas space. Keep native gestures inside previews and portals.
- Decide the wheel owner once per gesture, not per event. A gesture ends after about 150ms with no wheel events.
- If a gesture starts over a nested scroll area that can scroll on its dominant axis, that area owns the whole gesture. Never pan the canvas during it, even at the scroll limit. Cancel the wheel event at the limit so that nothing chains.
- If a gesture starts anywhere else, the canvas pans for the whole gesture, even over a scroll area.
- Apply `overscroll-behavior: contain` to scroll containers inside previews. Modified-wheel and pinch zoom take priority over the wheel latch.
- Do not cancel events broadly, and do not put `touch-action: none` on interactive content.
- Handle pointer count changes, cancellation, lost capture, window blur, and hidden tabs. Keep the wheel latch outside component state. Release captures, clear the wheel latch, and clean up listeners, observers, timers, and animation frames on teardown.
- Apply gesture transforms at most once per animation frame. Avoid alternating layout reads and writes.
- Prevent group overlap when content expands or the viewport resizes. Avoid layout loops and unnecessary movement. Fit after layout settles. Fitting never rearranges groups.
- Move the camera to reveal keyboard focus outside the visible area. Native page scrolling must not move the canvas.
- Keyboard camera navigation works, with visible focus on canvas controls.
- Provide fit-all and reset icon buttons with accessible names. Keep them reachable even when the view is lost.
- Validate camera values and keep them within bounds.

## Persistence

- Save only the camera, in a versioned format, under a storage key per project or workspace.
- Handle malformed or oversized data, unavailable storage, and quota errors.
- Migrate known older formats. For unknown formats, use safe defaults and discard old group positions and history.
- Reset restores the camera only. It does not clear preview state or drafts.

## Checks

Run the repository's checks when allowed. Then, in the browser, confirm:

- The route mounts, imports and exports resolve, and the console shows no errors.
- Component source is unchanged.
- Listed variants appear, omissions are explained, groups have dashed borders, and non-style comparisons use one style.
- Keyboard camera navigation and visible focus work. Preview controls keep their native shortcuts and gestures.
- Nested scrolling, portal positioning, clickable areas, and modal focus work at several zoom levels and viewport sizes.
- Pan and pinch survive pointer changes and cancellation. Teardown releases resources.
- Scrolling a nested area to its limit and continuing in the same gesture, including trackpad momentum, does not move the canvas. A new gesture on empty space pans the canvas.
- Groups do not overlap after expansion or resize. Fit works, and offscreen focus reveals correctly.
- Camera persists across reload. A storage failure falls back safely. Reset keeps preview drafts. Drafts need not survive reload unless requested.
- Groups cannot be dragged. The canvas has no undo/redo.
- Previews use safe test data and make no real project or account writes.

A check counts as passing only if it was run. If a check was skipped, say so.

## Report

End every build or review with these headings:

- **Changed:** files and what changed in each. Note any component changes (there should be none).
- **Checks run:** each check and its result.
- **Not working or not tested:** known gaps, omitted variants and why, and anything unverified.
- **Decisions made:** defaults chosen without asking.

Do not describe the implementation as verified or the template as ready unless every check above passed.
