---
name: create-canvas
description: Build a freeform canvas to explore, compare, and iterate on anything.
---

# Create canvas

Build a freeform workspace for exploration and iteration through conversation. The model changes content in source files. The canvas makes that content live, named, movable, and easy to reference.

## Start with the project

- Read repository rules, routes, component APIs, themes, design tokens, and tests.
- Look for an existing canvas before creating another.
- Use the project's framework, components, typography, design tokens, themes, and access controls.
- Respect restrictions on edits, commands, and browser access.
- Ask before changing scope, adding dependencies, changing shared code, or exposing the canvas publicly.
- If safe isolation is unclear, ask before proceeding. Never mount an unsafe preview.
- Choose sensible defaults for other decisions. Do not ask the user to repeat clear requests.
- Keep canvas code together. Separate camera and placement logic from previews, test data, and their registry. Do not build a framework.
- Start with one safe live preview, a readable label, and a separate move handle. Make sure that it mounts.
- Add the registry and requested content next. Then add copying, camera controls, existing themes, and saved layout.

## Keep content in source

A registry is a typed list of canvas items. Each entry defines a stable ID, unique readable name, component, safe test data, initial position, and dimensions.

- Keep the registry easy to find. Adding an item must not require changes to the camera or gesture code.
- Add, duplicate, rename, and remove items through source edits. Do not add runtime editor controls or delete shortcuts.
- Keep membership, names, dimensions, and implementations in source. Browser storage must not create or hide items.
- Never evaluate stored strings or model responses as code at runtime.
- Update the existing workspace for follow-up requests. Preserve names, IDs, positions, and unrelated experiments.
- If a reference is ambiguous, ask which item the user means.
- For “try another version,” preserve the original. Give each variation a new ID, unique readable name, and independent state.
- For “change this version,” update that item in place. Rename it only when asked.
- For removal requests, remove only the requested registry entry. Preserve shared components and unrelated work.
- When comparing one feature, keep other data, content, dimensions, and the global theme the same.
- For broader alternatives, name the layout differences. Do not create a full variant matrix unless requested.
- Place additions in nearby empty space using measured bounds. Reveal them with the camera without rearranging existing items or resetting the view.
- Preserve positions after content expansion, resizing, and reload. Allow intentional overlap. Keep move handles accessible when items overlap.

## Keep the workspace quiet

- Fill the viewport with a plain background, subtle preview boundaries, and minimal fixed controls.
- Use each preview's intended dimensions. Do not stretch content into oversized frames.
- Do not add decorative cards, banners, or background patterns.
- Put each name above its preview, such as `Pricing card · compact`. Do not use vague names or opaque IDs as labels.
- Give the name button behavior without button styling or a separate copy button.
- Copy the exact name on click, Enter, Space, or touch. Do not copy an ID, code, or URL.
- Explain copying on hover and keyboard focus. Hover alone must not copy. Touch activation must not require hover.
- Use the clipboard API when available. Announce brief “Copied” feedback only after success. Keep the name visible during feedback.
- If clipboard access fails or is unavailable, offer selectable text. Do not crash or claim success.
- Put a visible move handle beside the label. The label copies without dragging. The handle moves the item, not its body.
- Convert pointer movement to canvas coordinates at the current zoom.
- Support keyboard movement on the focused handle. Provide visible focus and accessible instructions.
- Use `cursor: default` on canvas navigation surfaces and handles, including during gestures.
- Preserve native text, link, input, and resize cursors inside previews. Do not apply cursor rules to all descendants.
- Include pan, zoom, fit-all, reset-camera, one global theme selector, and saved layout.
- Use the existing theme API for light, dark, and named themes. Apply the same theme to canvas controls, previews, menus, and dialogs.
- Do not invent themes or add per-preview themes. If themes are unsupported, omit the selector and explain why.
- If portal themes fail through public APIs, report the limit.
- Unless requested, omit resizing, width presets, comparison arrangements, drawing, connectors, catalogs, property editors, multi-selection, snapping, and undo/redo.
- For requested mobile or desktop previews, define their dimensions in the registry.

## Preserve live content

- Reuse production components through public APIs. Do not change their source, exports, hooks, or styles to support the canvas.
- Keep production components independent of canvas code.
- Keep experiments local to the canvas. Move them into production only when asked.
- Before mounting, use synthetic data, mock services, safe providers, and existing callbacks to prevent real requests and writes.
- Never use personal data or production credentials.
- If safe isolation is unavailable, omit the preview and explain why. An iframe or separate document alone does not provide isolation.
- Preserve clicking, typing, text selection, shortcuts, focus, nested scrolling, and touch input.
- Preserve the real behavior of disabled and read-only examples.
- Do not remount previews or erase input when moving items, copying names, changing themes, or changing the camera.
- Preview drafts do not need to survive reload.
- Keep portals in their native roots at screen-space size. Let the library manage positioning and modal focus.
- Use public container APIs only when needed. Make sure that portal alignment and clickable areas work at different zoom levels.
- If transforms break portals, report the limit or propose a separate preview document.
- Do not patch libraries, browser APIs, preview DOM, or portal roots.
- Define navigation in the canvas host, including links in portals. Do not change component links or router internals.
- Canvas-item links reveal their target instead of scrolling the page.
- Other navigation must not perform real project actions or silently lose the workspace.

## Keep gestures separate from preview input

- Support mouse drag to pan from empty space.
- Support Ctrl/Meta + wheel and trackpad pinch to zoom over empty space and previews.
- Keep the canvas point under the pointer fixed during wheel or pinch zoom.
- Provide zoom-in and zoom-out buttons and keyboard controls. Center their zoom on the viewport.
- Zoom smoothly in both directions without jumps or drift. Preserve item positions and preview state.
- Support touch pan and pinch where the browser permits them.
- Support keyboard camera navigation when the canvas shell has focus.
- Show visible keyboard focus on all canvas controls.
- Keep accessible fit-all and reset-camera controls fixed and reachable when items are offscreen.
- Run fit-all after layout settles. Fit the actual bounds, including each title, handle, and boundary. Do not rearrange items.
- Reset only the camera. Preserve membership, positions, themes, and drafts.
- Support Space + primary-button drag and middle-button drag to pan anywhere on the canvas, including over previews.
- Give explicit pan gestures priority over item movement and name copying.
- After a pan, do not activate controls, copy labels, follow links, or trigger middle-click autoscroll.
- If an interactive control or editable region has focus, do not arm Space-to-pan.
- Preserve Space activation of buttons and labels. Preserve preview arrow keys, Escape, and undo.
- Keep modal portals outside canvas gesture handling. Preserve their focus, backdrop behavior, and native controls.
- Support two-finger trackpad pan over empty space and previews.
- Decide the wheel owner once per gesture, not per event. A gesture ends after about 150ms with no wheel events.
- If a gesture starts over a nested scroll area that can scroll on the gesture's dominant axis, that area owns the whole gesture. Never pan the canvas during it, even at the scroll limit.
- At the scroll limit of an owned gesture, cancel the wheel event so that scrolling does not chain to the canvas or page.
- If a gesture starts anywhere else, the canvas owns it and pans for the whole gesture, even over a scroll area.
- Apply `overscroll-behavior: contain` to scroll containers inside canvas items.
- Give modified-wheel and pinch zoom priority over the wheel latch. Keep other portal scrolling native.
- Restrict event cancellation and touch restrictions to owned gestures. Do not disable native input across preview content.
- Use one finger to move items through their handles. Preserve ordinary one-finger preview interactions.
- Support two-finger canvas pan and pinch without breaking native preview gestures. Report browser limits instead of disabling preview touch.
- Track which gesture owns each interaction. Clear held keys on cancellation, window blur, and hidden tabs.
- Handle changes in pointer count, pointer cancellation, and lost pointer capture.
- On teardown, release captures, clear the wheel latch, and clean up listeners, observers, timers, and animation frames.
- While the route is active, apply `overscroll-behavior-x: none` to the document viewport and canvas scroll boundary.
- Block Chrome horizontal history swipes. An inner wrapper alone does not guarantee prevention.
- Restore prior document styles on teardown. Preserve nested horizontal scrolling, Back/Forward controls, and navigation shortcuts.
- Do not trap history with `pushState`, patch browser APIs, or leave permanent global handlers.
- Prevent native page scrolling from moving the canvas. Reveal offscreen keyboard focus through camera movement instead.
- Require finite, bounded camera coordinates, item positions, and zoom.
- Combine pointer and wheel updates into at most one transform write per animation frame.
- Keep active gesture values and the wheel latch outside component-wide React state. Camera movement must not rerender previews.
- Update only canvas-owned wrappers. Do not change preview DOM or layout-affecting positions during gestures.
- Cache measured bounds. Refresh them together when content, dimensions, or layout changes.
- Ignore temporary rendering placeholders when measuring content bounds.
- Do not measure every preview each frame or alternate layout reads and writes.
- Save after gestures or with a bounded debounce. Do not write storage on every pointer event.
- On teardown, safely flush pending saves when possible.
- Prevent expensive effects, permanent per-preview compositing hints, and full-canvas work for one item's movement.
- Add virtualization or memoization only with profiling evidence. Offscreen unmounting can lose input and break focus or portals.

## Save layout, not content

- Save only the camera, supported theme preference, and positions keyed by stable registry ID.
- Use a small versioned document under a project-specific and canvas-specific key.
- Respect existing app preferences and unrelated theme configuration. Do not create a competing theme preference.
- Apply the same numeric limits to saved layout. Use project conventions to validate IDs, supported themes, document size, and position counts.
- Render every current registry entry. Apply valid saved positions and ignore stale IDs.
- Always show new entries. Use current source names and dimensions immediately.
- Handle malformed data, unavailable storage, and quota errors without breaking the canvas.
- For known older formats, retain only valid camera values, themes, and positions for current IDs.
- Discard saved membership, names, dimensions, duplicates, and hidden or removed state. For unknown versions, use safe defaults.
- Never store or deserialize executable components, secrets, tokens, account data, or form contents.
- Unless explicitly requested, do not save preview drafts or interaction history.

## Test and report honestly

Run repository-required checks. Make sure that the route mounts, imports resolve, and the console shows no errors. Inspect the diff for unintended production changes.

For a new canvas or controller changes, test every behavior above. For content-only changes, test affected behaviors without rebuilding the controller. Include several zoom levels, viewport sizes, and reloads with an existing saved layout.

Use a supported device for touch tests. Use actual trackpad input and a real history entry for Chrome history-swipe tests.

Test zoom in both directions over empty space and previews. Make sure that the zoom anchor stays fixed without jumps or drift. Test buttons and keyboard zoom around the viewport center. Test trackpad pan over preview content and nested scroll areas. Scroll a nested area to its limit and keep scrolling in the same gesture, including trackpad momentum. The canvas must not move. Then start a new gesture on empty space and make sure that the canvas pans, even when the pointer moves over a scroll area.

Only report a test as passed if you ran it. Compilation and source review do not prove browser behavior. Report unavailable device tests and browser limits.

Before claiming smooth performance, profile a representative populated canvas, not one empty example. Record the preview count, browser, device, and measurements during pan, zoom, and movement. Investigate long tasks, repeated layout, synchronous storage writes, and preview rerenders. Report observed stalls and untested cases. A preview-only edit does not require rebuilding or profiling an unchanged controller.

Finish with a short report that includes these details:

- Changed: Paths, purpose, local experiments, shared component changes, and exact names of new previews.
- Checks run: Tests that you ran and their results.
- Not working or not tested: Limits, omissions, and reasons.
- Decisions made: Defaults that you chose without asking.
