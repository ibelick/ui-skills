---
name: photographing-software
description: Create photographic images of software — a website or app shown on a real-looking laptop, display, tablet or phone, shot through a camera with depth of field, room light and film finish. Use for product photos, launch visuals, hero images and social posts that should look photographed rather than mocked up, including close-ups of UI text, three-quarter desk shots and full-device shots.
---

# Photographing software

Make the software look photographed: a real screen, in a real room, through a real lens.
Use the project's tools and conventions. Do not assume a 3D library, browser, capture
server or image assets are available; check first and ask before adding dependencies.

The pipeline: capture the page → draw it as the screen texture → render the device and room
in 3D with depth → blur by depth → finish. The simplest route is a WebGL renderer (such as
three.js) driven in a headless browser, which also does the capture. If no 3D renderer is
available and the user declines adding one, say so; do not fake depth of field with a flat
blur over a 2D mockup.

For hardware outlines, screen sizes, corners, notches and camera cutouts, use the
`device-frames` skill ([ui-skills.com/skills/ibelick/device-frames](https://www.ui-skills.com/skills/ibelick/device-frames));
this skill covers everything around them. When the user wants to add a device or change a
frame's geometry, update it there and build the photo from the result, rather than
redefining hardware here.

## Start with the deliverable

- Settle the output: pixel size (default 3000 × 2000, 3:2), still or video, the device, the
  page or app, the shot (see recipes), and the room. Use sensible defaults; ask only when a
  choice materially changes the result.
- The software is the subject. Every choice below serves one test: in the final image, can
  you read the headline and recognise the product?
- Use the user's own site, app or screenshots. Do not photograph a third party's product as
  if it were theirs, put manufacturer logos on the hardware, or imply endorsement.

## 1. Capture the software at the device's real viewport

A photo is only as good as the capture on its screen. Shoot the page at exactly the size it
would render on that device, at 2× density.

- **Viewport = the visible page area, not the panel.** On a laptop or display, subtract the
  OS menu bar and browser toolbar (about 37 + 52 points on macOS) from the screen height; in
  a floating window, use the window's content size. On a phone or tablet, use the full screen
  in points. Full-height (`100vh`) heroes centre themselves in whatever height they get: a
  taller viewport pushes the hero down and leaves an empty band above it.
- **Emulate the device; do not just resize a window.** Headless browsers enforce a minimum
  window width (about 500 px in Chrome), so a 402 px phone page is laid out wider and then
  cropped, cutting text off at the right edge. Set the metrics explicitly instead (Chrome
  DevTools `Emulation.setDeviceMetricsOverride` with `mobile: true`, or an equivalent),
  and send a mobile user agent and touch support for handhelds.
- **Wait for the page to settle.** Wait for load, then about 2–3 s for fonts, images and
  entrance animations. Sections that fade in on scroll may stay blank; check the capture and
  report what is missing instead of shipping a half-empty screen.
- **Never stretch.** Draw the capture at the width it was shot at, from the top. If its
  aspect differs from the screen, crop the bottom or letterbox, and say so.
- Inspect the capture on its own before building the photo: the hero should be complete
  and the right width, with no cookie banner or overflow unless intended.

## 2. Compose the screen

- **Menu bar content stays plausible.** On macOS: the Apple menu glyph (part of the system
  UI, so draw it as a vector shape; the font character only renders on Apple systems),
  then the app's name in bold and its menus; on the right, only system items (Control
  Centre, search, battery, Wi-Fi) and the current date and time. Never invent third-party
  app icons.
- **Match the current OS.** On current macOS the menu bar has no background: the desktop
  shows through and the text flips dark or light with it. Current Safari draws the address
  field without a background, led by the privacy-report shield, then the page menu, lock
  and domain, translate and reload. Follow the user's reference when they give one.
- **Desktop chrome is optional and synthetic.** A menu bar plus browser toolbar reads as "a
  real Mac", and a floating window with a shadow over a plain desktop colour gives the page
  breathing room. Both are approximations; never present them as a native screenshot.
  Keep the address field honest: show the domain actually captured.
- Handhelds show the page full screen, with no fake status bar unless requested.
- Pick desktop colours that sit behind the page rather than compete with it. Menu bar text
  must flip between dark and light with the desktop's luminance.
- Render the screen content at panel resolution (2× points or the real pixel count), so
  close-ups stay sharp.

## 3. Build the device in real units

Work in metres. A believable photo depends on true scale: depth of field, perspective and
reflections all follow from it.

- **Scale from published dimensions:** for example, a 14-inch laptop screen is about 302 × 196
  mm (0.2 mm per point) and the body is 312.6 mm wide. Phones and tablets: millimetres from
  the manufacturer's dimensional drawings (see
  [device-frames](https://www.ui-skills.com/skills/ibelick/device-frames)).
- **The lid's front face comes from `device-frames`, exactly.** Take the device's row of its
  laptop table (screen size, bezel side / top / bottom, edge, lid corner, screen corner,
  notch or camera) and the corner rules under it, and convert points to millimetres with
  `k = published body width / lid width in points`, where the lid is the screen plus two
  bezels and two edges. Do not adjust any of it by eye: no thicker bezels, rounder corners,
  bigger notch or extra bands. Example, 14-inch MacBook Pro (lid 1552 × 1028 points,
  k = 312.6 / 1552 ≈ 0.2014 mm per point):
  - Lid 312.6 × 207.1 mm; corners 4.83 mm at the top, 1.21 mm at the hinge.
  - Metal edge 0.81 mm; black glass inside it to the screen.
  - Bezel 3.22 mm at the sides and top, 4.43 mm at the bottom.
  - Screen 304.5 × 197.8 mm, top corners 2.42 mm, square bottom corners.
  - Notch 39.5 × 6.45 mm hanging from the screen's top edge, bottom corners 2.01 mm, with a
    0.7 mm camera dot.
  The page fills the screen right up to its top edge; the notch covers it there. Leave no
  empty band between the bezel and the content.
- **Laptops in 3D.** Beyond the front face, build the rest from
  published sizes, not by eye. A 14-inch MacBook Pro is 312.6 × 221.2 mm and 15.5 mm thick
  closed: about 11 mm of base and 4.5 mm of lid. Approximations that render convincingly:
  - **Base:** the lid's footprint, with about 12 mm corner radius and softly rounded edges
    (no sharp box edges), and a small finger scoop centred on the front edge. No black
    blocks, slots or vents on the front face; the feet are underneath and out of sight.
  - **Keyboard:** six rows (a half-height function row, then five full rows) about 264 mm
    wide, centred, starting about 9 mm from the hinge. Keys are about 16.5 mm with 1.8 mm
    gaps, black, and slightly recessed; the aluminium shows between them. Space Black
    models sit the keys in a dark well; silver ones do not.
  - **Trackpad:** about 135 × 82 mm, centred, about 10 mm from the front edge: the same
    aluminium as the base, separated only by a hairline.
  - **Lid depth:** 4.5 mm of aluminium with a slightly rounded edge, so a thin highlight
    runs round it; the hinge sits at the back edge of the base.
  - Scale other laptops from their own published width, depth and thickness.
- **Layers, front to back:** screen (unlit/emissive, with its own rounded corners), black
  glass bezel (glossy), notch or camera, metal shell (metallic, slightly rough, with a thin
  bevel that catches a line of light), and for laptops a base with keyboard and trackpad.
- **The screen emits; it is not lit.** Render it as emissive colour with brightness ≈ 1 and
  add only a faint reflection of the room on top, rising at grazing angles (Fresnel). A lit
  screen looks like a print.
- **Pivot laptops on the hinge.** Lid tilt leans the top back around the bottom edge; the base
  and desk never move. Displays tilt on their own stand; re-pose the stand with the tilt so
  it never passes through the panel.
- **Ground the device on a real-looking desk.** Use a scanned wood or stone texture with
  roughness (Poly Haven's textures are CC0), not procedural noise, and extend the desk past
  every frame edge: a visible desk edge against the backdrop gives the scene away. Add a
  soft contact shadow under the device.
- Props (a mug, a notebook) are optional; place them to blur at the frame edges, never in
  front of the text, and give them real materials or leave them out.

## 4. Light it with a real room

The room is what makes the image a photo. Invented walls, studio sweeps and extra lights
are what make it look rendered.

- **Download a real 360° room photo (an HDRI) and use it for everything:** the backdrop seen
  through the lens, the light on the device, and the reflections in metal and glass. Poly
  Haven's HDRIs are CC0. Fetch `https://api.polyhaven.com/files/<id>` and download
  `hdri["4k"].hdr.url` (4k, so the blurred backdrop has real detail). Good interiors for a
  desk: `photo_studio_loft_hall` (bright loft, large windows), `comfy_cafe` (warm café),
  `poly_haven_studio` (calm studio room).
- **Pick the side of the room behind the device.** Rotate the HDRI so something calm and
  real sits behind it: a wall with shelves, a window bay, a plant. Never a bare light
  source straight behind the screen.
- **Light only from the HDRI.** Do not add a key light from an arbitrary direction. If the
  device needs more shape, add one soft light placed exactly at the HDRI's brightest
  region (its window or sun), so the shadows and highlights agree with what is in the
  background.
- **No invented backdrops.** Do not replace the room with a flat wall, a gradient or a
  studio sweep unless the user asks for a studio look. If no HDRI can be downloaded, say
  so and ask, rather than faking one.
- **The screen must be the brightest thing that matters.** Keep the room around 0.7–1.0 of
  its natural intensity; a bright window behind a white page flattens everything.
- **Blur the room as much as the optics say.** A wall 3 m behind a laptop focused at 0.4 m,
  at f/2.8 and 36° FOV, blurs to about 5% of the frame height. A room sharper than that
  reads as a printed backdrop. Never cap the background blur below what the lens produces.
- **Prefer framings where the screen fills most of the frame**, so the room is mostly
  colour, light and soft shapes at the edges.

## 5. Shoot with a physical camera

- **The screen is the subject, so frame the screen, not the computer.** Aim at the centre of
  the screen's active area (or the element in focus), never the device's centre or its
  hinge. By default the screen fills about 90% of the frame width or more, and **no
  keyboard is visible**: the bottom of the frame sits at or above the lid's bottom bezel.
  Show the keyboard, desk or whole device only when the user asks for it.
- **H is the screen's active height, and distance is camera to aim point.** For a 14-inch
  laptop H is about 0.196 m, so "1.6 H" is about 0.31 m from the middle of the screen.
- **Distance and field of view:** describe the shot in screen heights (H). Close-ups 0.6–1.3 H
  at 38–42° vertical FOV; the default straight-on shot about 1.6 H at 36°; a full device
  about 3 H at 42°. Scale distances with the device so a phone frames like a laptop.
- **Keep it level.** Roll 0 unless the shot is deliberately dynamic. To keep a tilted lid's
  vertical edges parallel (no keystone), pitch the camera to
  `pitch = atan(tan(tilt) · cos(yaw))`, i.e. look perpendicular to the lid's vertical axis.
- **Depth of field from optics, not a blur filter.** Render depth, then blur each pixel by its
  circle of confusion. For a 35 mm-equivalent frame (24 mm tall) with focal length
  `f = 12 mm / tan(fov / 2)`, f-number N and focus distance S1, a point at S2 blurs to
  `c = f² / (N · (S1 − f)) · |S2 − S1| / S2` on the sensor; multiply by
  `image height / 24 mm` for pixels. Close shots look right at f/1.4–2.8; full-device shots at
  f/5.6–8. Sharp things behind must not bleed onto blurred things in front.
- **Focus on the message.** Put the focus point on the headline or the UI element being sold,
  not the screen centre. On a turned screen the sharp band runs across it; make sure the
  words you want read fall inside it.

## 6. Finish, and protect legibility

- **Keep screen tones linear; roll off only what is brighter than the page.** Film curves
  such as ACES, and S-curve "contrast", compress everything above mid-grey, so light-grey UI
  on white (tabs, captions, disabled buttons, hairlines) fades into the page. Use a tone
  curve that is linear up to a knee of about 0.8 and soft-shoulders above it, which
  compresses only windows and glints. Add contrast only as a toe (deepen darks, slope 1 at
  white).
- Set exposure so page white lands around 0.9 (about 240–245 in 8-bit), not 1.0. Clipped
  white reads as a glowing slab with no screen in it.
- **Measure, don't eyeball.** Sample the rendered image: near-black text should stay under
  about 30, and light-grey UI should keep at least about 40 levels of separation from the
  page around it.
- **Glow is the usual cause of an unreadable screen.** A white page above a bloom threshold
  spreads a veil over its own dark text. Keep glow near zero for light UIs; use it only for
  dark UIs, where it reads as light bleeding into black glass.
- Add restraint: vignette ≤ 0.4, warmth ≤ 0.2, grain about 0.03–0.06, chromatic fringing
  only toward the frame edges, and at most a very slight black lift (about 1%); more greys
  out dark text.
- Keep glass glare low (≤ 0.2) unless the glare is the subject.

## Shot recipes

Yaw is left/right of the screen normal (negative = camera on the left); pitch is above/below;
distance in screen heights (H), from the camera to the aim point on the screen; aim and focus
on the named element. "Screen fill" is the screen's share of the frame width.

| Shot | Yaw | Pitch | Distance | FOV | Lid tilt | Aperture | Focus | Screen fill |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Straight on (default) | −16° | level (≈ 6°) | 1.6 H | 36° | 6° | f/2.8 | headline | ≥ 90%, no keyboard |
| Low close-up | −34° | −17° | 1.3 H | 40° | 14° | f/1.8 | upper third | crop |
| Text macro | −30° | −5° | 0.6 H | 38° | 12° | f/1.4 | one line of text | crop |
| Edge macro | 40° | −8° | 0.8 H | 42° | 14° | f/1.8 | near screen edge | crop |
| Square, shallow | 0° | −6° | 1.5 H | 34° | 0° | f/1.2 | one corner | crop |
| Desk three-quarter (on request) | 40° | 22° | 2.2 H | 34° | 20° | f/2.8 | keyboard-side corner | about 70% |
| Full device (only on request) | −12° | 8° | 3.0 H | 42° | 6° | f/8 | screen centre | about 55% |

Start from "Straight on" unless the user asks for drama: it is the shot where the software
is most readable.

## Output and verification

Inspect the rendered image itself, not the scene settings. Check, and fix before delivery:

- **Readable:** the headline is in the sharp band and its contrast against the page is
  clearly visible; measure luminance at the text and around it if unsure.
- **Framed on the screen:** measure the screen's bounds in the final image. By default the
  screen spans about 90% of the frame width or more and no keyboard shows; if not, move
  closer or re-aim at the screen and render again.
- **Frame matches device-frames:** compare the rendered lid against the device-frames
  geometry (bezel widths, corner radii, notch size and position). Any visible difference
  is a bug, not a style choice.
- **Complete:** the hero is fully on screen at the right width, with no cut-off text, empty
  band or missing sections. Compare against the raw capture.
- **Level and true:** vertical edges are parallel unless the shot is meant to be dynamic;
  no stretching; corners, notch and bezel match the device.
- **Exposed:** no clipped white slab on the screen; the room is darker than the page.
- **Grounded:** the device sits on the desk with a contact shadow; stands and props do not
  intersect the hardware.
- **Believable background:** the backdrop is the downloaded room, blurred as the lens would
  blur it; no flat wall, sweep or desk edge; highlights and shadows on the device come from
  the same side as the room's windows.
- **Would it pass as a photo?** Look at the final image as a stranger would. If anything reads
  as rendered (flat lighting, uniform surfaces, a pasted-in room), find the cause and fix it
  before delivering.
- Render at the final size (e.g. 3000 × 2000), not the preview size, before judging focus
  and grain.

Report the output path, size, device, capture URL and viewport, shot settings, and every
approximation: synthetic menu bar or browser chrome, approximate hardware, blank or missing
sections of the capture, and the environment's licence. Do not call the device
pixel-perfect without comparing it to a front-view reference.
