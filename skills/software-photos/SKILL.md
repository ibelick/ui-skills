---
name: software-photos
description: Create photographic images of software — a website or app shown on a real-looking laptop, display, tablet or phone, shot through a camera with depth of field, room light and film finish. Use for product photos, launch visuals, hero images and social posts that should look photographed rather than mocked up, including close-ups of UI text, three-quarter desk shots and full-device shots.
---

# Software photos

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
- **Layers, front to back:** screen (unlit/emissive, with its own rounded corners), black
  glass bezel (glossy), notch or camera, metal shell (metallic, slightly rough, with a thin
  bevel that catches a line of light), and for laptops a base with keyboard and trackpad.
- **The screen emits; it is not lit.** Render it as emissive colour with brightness ≈ 1 and
  add only a faint reflection of the room on top, rising at grazing angles (Fresnel). A lit
  screen looks like a print.
- **Pivot laptops on the hinge.** Lid tilt leans the top back around the bottom edge; the base
  and desk never move. Displays tilt on their own stand; re-pose the stand with the tilt so
  it never passes through the panel.
- Ground the device: a desk surface, a soft contact shadow under it, and optional props
  (mug, notebook) placed to be blurred at the frame edges, never in front of the text.

## 4. Light it with a real room

- Use a real 360° environment (an HDRI; Poly Haven's are CC0) as backdrop, reflection and
  light. It is what makes metal and glass read as real.
- **The screen must be the brightest thing that matters.** Keep the room around 0.7–1.0 of
  its natural intensity; a bright window behind a white page flattens everything.
- Without an HDRI, a plain wall with soft low-frequency shading is a fine fallback.

## 5. Shoot with a physical camera

- **Distance and field of view:** describe the shot in screen heights (H). Close-ups 0.6–1.3 H
  at 38–42° vertical FOV; a readable straight-on shot about 2 H at 36°; a full device about
  3 H at 42°. Scale distances with the device so a phone frames like a laptop.
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
distance in screen heights (H); focus on the named element.

| Shot | Yaw | Pitch | Distance | FOV | Lid tilt | Aperture | Focus |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Straight on (default) | −16° | level (≈ 6°) | 2.0 H | 36° | 6° | f/2.8 | headline |
| Full device | −12° | 8° | 3.0 H | 42° | 6° | f/8 | screen centre |
| Low close-up | −34° | −17° | 1.3 H | 40° | 14° | f/1.8 | upper third |
| Text macro | −30° | −5° | 0.6 H | 38° | 12° | f/1.4 | one line of text |
| Edge macro | 40° | −8° | 0.8 H | 42° | 14° | f/1.8 | near screen edge |
| Desk three-quarter | 40° | 22° | 2.2 H | 34° | 20° | f/2.8 | keyboard-side corner |
| Square, shallow | 0° | −6° | 1.5 H | 34° | 0° | f/1.2 | one corner |

Start from "Straight on" unless the user asks for drama: it is the shot where the software
is most readable.

## Output and verification

Inspect the rendered image itself, not the scene settings. Check, and fix before delivery:

- **Readable:** the headline is in the sharp band and its contrast against the page is
  clearly visible; measure luminance at the text and around it if unsure.
- **Complete:** the hero is fully on screen at the right width, with no cut-off text, empty
  band or missing sections. Compare against the raw capture.
- **Level and true:** vertical edges are parallel unless the shot is meant to be dynamic;
  no stretching; corners, notch and bezel match the device.
- **Exposed:** no clipped white slab on the screen; the room is darker than the page.
- **Grounded:** the device sits on the desk with a contact shadow; stands and props do not
  intersect the hardware.
- Render at the final size (e.g. 3000 × 2000), not the preview size, before judging focus
  and grain.

Report the output path, size, device, capture URL and viewport, shot settings, and every
approximation: synthetic menu bar or browser chrome, approximate hardware, blank or missing
sections of the capture, and the environment's licence. Do not call the device
pixel-perfect without comparing it to a front-view reference.
