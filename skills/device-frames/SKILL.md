---
name: device-frames
description: Create device-framed screenshots, product images, videos, or live UI mockups. Use when placing an image, recording, webpage, or component inside a phone, foldable, tablet, watch, laptop, monitor, or browser frame, including App Store-style visuals and launch videos.
---

# Device frames

Create the requested image, video, or live component using the project's tools and conventions.
Do not assume a frame library, scripts, server, or browser is available.

## Start with the deliverable

- Determine the device, orientation, content, output format, background, and dimensions. Use
  sensible defaults; ask only when a missing choice materially changes the result.
- Use the supplied screenshot, recording, page, or component. If none is provided, use a blank
  screen or simple original placeholder.
- Build a live component, render an image, or composite a video as requested. Keep the device
  static unless animation is requested.
- Check available tools first. Ask before adding dependencies or changing unrelated project code.

## Construct the frame

Draw the screen and hardware as separate layers with CSS and SVG or equivalent vector tools.

1. Lay out content at the screen's native aspect ratio, then scale the entire device uniformly.
   Never stretch media: use `cover` to crop or `contain` to preserve it. Report cropping.
2. Draw the outer case, bezel, glass, controls, stand, and camera separately from the screen.
   Clip the screen to its display outline. Keep cutouts above screen content and keep the screen
   rectangle distinct from the device's full bounding box.
3. Use continuous rounded corners for modern handhelds. Position buttons, camera, and hinge
   for the selected device and orientation. An open foldable has one continuous inner screen;
   do not insert a gap at the hinge.
4. Give metal, glass, and shadows restrained tonal variation. Keep backgrounds clean and support
   transparency when requested. Do not add manufacturer logos or imply endorsement.
5. Add status bars, home indicators, or other system UI only when requested and not already in
   the source. Synthetic furniture is an approximation, not native system UI.

For landscape, rotate the hardware and screen geometry together while keeping content upright.
Account for iframe restrictions and loading failures when embedding pages.

## Device geometry

Use logical points for layout. Output pixels depend on scale and pixel density, not necessarily
the physical panel resolution.

Use these sizes for the corresponding device; check current official specifications when needed.

| Device                              | Screen in points, width × height | Distinctive details                                                             |
| ----------------------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| iPhone 17 or 18 Pro                 | 402 × 874                        | Rounded screen, Dynamic Island                                                  |
| iPhone 18 Pro Max                   | 440 × 956                        | Rounded screen, Dynamic Island                                                  |
| iPhone Air                          | 420 × 912                        | Rounded screen, Dynamic Island                                                  |
| iPhone Duo, closed                  | 466 × 678                        | Short, wide outer screen; camera near the upper-right corner; hinge on the left |
| iPhone Duo, fully open              | 951 × 669, inferred              | Wide inner screen; central hinge; under-display camera hidden while inactive    |
| iPad Pro 11-inch                    | 834 × 1210                       | Even bezel; camera in the long bezel                                            |
| iPad Pro 13-inch                    | 1032 × 1376                      | Even bezel; camera in the long bezel                                            |
| Apple Watch Series 12, 46 mm        | 208 × 248                        | Rounded case, side crown, optional strap                                        |
| Apple Watch Series 12, 42 mm        | 187 × 223                        | Rounded case, side crown, optional strap                                        |
| MacBook Pro 14-inch, M6             | 1512 × 982                       | Thin bezel, centred top notch, metal base                                       |
| MacBook Pro 16-inch, PROLED XDR     | 1736 × 1133                      | Thin bezel, rounded display, small camera cutout within the screen              |
| MacBook Neo 13-inch                 | 1204 × 753                       | Rounded top display corners, camera in bezel, no notch                          |
| Studio Display / Studio Display XDR | 2560 × 1440                      | 27-inch 5K panel at 2×; black bezel and aluminium stand                         |

The Duo open-screen value is derived from Apple's 2853 × 2007 App Store screenshot size at 3×.
Apple lists the physical inner panel as 2670 × 1878 pixels; screenshot dimensions do not by
themselves establish its logical viewport. Treat 951 × 669 as an approximation, not a verified
native point size. Closed and fully open frames do not simulate folding, split-screen, reserved
regions, or changes in iOS layout.

For Duo app visuals, consult Apple's
[design guidance](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo).
The outer camera remains visible; the inner camera is hidden until active. System controls are
typically arranged along the side on the outer display and the open display in landscape. Avoid
placing key content beneath them; real screenshots should keep their own system UI.

### Fully open Duo: one screen, not two phones

- Draw **one wide case, one bezel, and one uninterrupted inner display**. The display is a
  single rounded rectangle: only its four outer corners are rounded. It spans the centre at
  the same full height as the rest of the screen.
- Use a **951 × 669 screen rectangle** before scaling: width ÷ height is approximately **1.422**.
  The whole case is approximately **992.6 × 710.4**, or **1.397:1**. Do not make either shape
  square or fit it to the output canvas; add transparent padding around the uniformly scaled frame
  instead. These are the default fully open, unrotated dimensions, not two portrait screens.
- Do not draw a central black bar, a visible cylindrical hinge, a gap, two screen panels, or
  rounded corners at the centre. If the case needs a hinge detail, restrict it to the thin
  enclosure outside the display at the top and bottom; do not cover the active display.
- The inner camera is behind the display and invisible by default. The outer-display camera,
  Dynamic Island, and conventional phone side-button arrangement do not appear on the open
  inner screen.
- Build the frame with deterministic vector geometry, not generative image synthesis. Image
  generators can invent hinges and proportions even when prompted not to. Composite supplied
  content separately. If no vector or programmatic rendering tool is available, report the
  limitation rather than substituting an AI-generated device.
- For a plain grey screen, use one opaque, solid grey fill such as `#d8d8dc`. Do not add screen
  gradients, noise, reflections, folds, or texture unless requested. Keep hinge marks tiny and
  outside the active screen.
- Before delivery, measure the rendered **screen bounds**, not the whole PNG: width ÷ height
  should be within 1% of `951 / 669`. Check that the centre and both halves are one continuous
  display, with no camera by default. If the ratio or shape is wrong, fix and rerender it.

For other devices, consult official specifications and hardware references, or label the result
as an approximation. Screen dimensions alone do not establish hardware accuracy.

## Measured hardware

For physical fidelity, consult the manufacturer's dimensional drawing or a front-view reference.
Keep display size, case size, camera and button positions in one coordinate system. Scale
millimetres by
`screen width in points / active display width in mm`; position the screen using the active-area
inset. Preserve non-symmetric corners and hardware offsets. Never ship the manufacturer's drawing
or marketing imagery as part of the frame.

Starting measurements in millimetres; camera centres are measured from the case's top-left.
Verify them against the current drawing.

| Device             | Case W × H      | Active display W × H | Camera                                                                       |
| ------------------ | --------------- | -------------------- | ---------------------------------------------------------------------------- |
| iPhone 17          | 71.45 × 149.61  | 66.57 × 144.79       | Island centre (35.725, 7.79), 20.74 × 6.07                                   |
| iPhone Air         | 74.70 × 156.18  | 69.55 × 151.03       | Island centre (37.35, 8.0), 20.76 × 6.07                                     |
| iPhone 18 Pro      | 71.85 × 150.01  | 66.57 × 144.73       | Island centre (35.925, 7.99), 15.66 × 6.07                                   |
| iPhone 18 Pro Max  | 77.98 × 163.43  | 72.86 × 158.31       | Island centre (38.99, 7.91), 15.68 × 6.07                                    |
| iPhone Duo, closed | 84.10 × 117.80  | 77.17 × 112.28       | Hole centre (73.39, 10.62), diameter 6.07                                    |
| iPhone Duo, open   | 164.60 × 117.80 | 157.70 × 110.90      | Under-display camera centre (115.8, 10.55), diameter 4.32; hidden by default |
| iPad Pro 11-inch   | 177.51 × 249.70 | 160.13 × 232.32      | In the long bezel                                                            |
| iPad Pro 13-inch   | 215.53 × 281.58 | 199.14 × 265.19      | In the long bezel                                                            |
| Watch 46 mm        | 40.28 × 46.38   | 32.45 × 38.69        | No front camera                                                              |
| Watch 42 mm        | 36.95 × 42.57   | 29.17 × 34.79        | No front camera                                                              |

### Insets, corners, and controls

For the table above, centre the active rectangle in the case unless otherwise stated. The closed
Duo is asymmetric: place its active rectangle 4.17 mm from the left and 2.76 mm from the top;
place its 79.93 × 115.04 mm glass 2.79 mm from the left and 1.38 mm from the top. For the open
Duo, centre the active rectangle; its hinge is at x = 82.3 mm. Its inner glass inset is assumed
to be approximately 1.33 mm horizontally and 1.38 mm vertically.

These outer-corner profiles are `[x, y]` offsets in millimetres from the corner's top-left
extreme, ordered from the top edge to the side. Mirror them into the other corners. Interpolate
smoothly through the points; inset the outline for the glass and screen. Inset curves and
unpublished display corners are approximations.

- iPhone 17: `[19.23,0] [14.53,0.02] [9.87,0.48] [5.56,2.26] [2.26,5.56] [0.48,9.87] [0.02,14.53] [0,19.23]`.
- iPhone Air: `[19.36,0] [13.85,0.04] [8.43,0.91] [3.78,3.78]`, then mirror across x=y.
- iPhone 18 Pro and Pro Max: `[19.43,0] [13.9,0.04] [8.46,0.92] [3.8,3.8]`, then mirror across x=y.
- Duo outer corners: `[17.3,0] [12.44,0.06] [7.68,1] [3.62,3.63] [1,7.68] [0.02,12.44] [0,17.31]`.
  Closed hinge-side corners instead use `[3.03,0] [2.52,0.02] [2.06,0.23] [1.82,0.67] [1.8,1.19] [0.92,1.36] [0.26,1.96] [0.01,2.82] [0,3.72]`.
- iPad Pro case corners: `[15.9,0] [14.28,0.02] [13.27,0.1] [11.77,0.3] [10.48,0.6] [9.16,1] [7.68,1.6] [6.38,2.4] [5.01,3.4] [4.85,4.85]`, then mirror across x=y. Display corners start at `[5.6,0] [5.04,0.02] [4.5,0.1] [3.64,0.3] [2.87,0.6] [2.11,1] [1.49,1.49]`, then mirror.
- Watch case corners: approximate with a continuous curve; use an outer tangent distance of
  about 20.14 mm for 46 mm and 18.48 mm for 42 mm. The display is inset and has tighter corners.

Button centres below are measured from the top for side buttons and from the left for top buttons;
length and protrusion are in millimetres. A flush button can be omitted in a straight-on view.

- iPhone 17 and Air: left centres 34.08, 48.23, 62.43; lengths 6.9, 11.2, 11.2. Right centre
  55.32 (Air 55.33), length 17.7 (Air 17.8). Protrusion 0.45.
- iPhone 18 Pro and Pro Max: left centres 34.28, 48.43, 62.63; lengths 6.9, 11.2, 11.2. Right
  centre 55.53, length 17.7. Protrusion 0.45.
- Duo closed: top centres 44.35 and 57.73, length 10.88; right centre 42.87, length 18.68.
  Protrusion 0.45. For the open view, approximate the top centres by adding 82.3; retain the
  right-side position.
- iPad Pro: right centres 19.33 and 31.39, length 10.06; top centre approximately case width minus
  20.01, length 12.06. Protrusion approximately 0.4.
- Watch: right crown length 7, protrusion 2.27; centre at half case height minus 8.26 (46 mm) or
  8.23 (42 mm). Strap colour and dimensions may be adapted to the requested band.

### Laptop and display proportions

These front-view values are **visual approximations in screen points**, not measured hardware.
For laptops, `side / top / bottom` are black bezel widths; `edge` is the metal rim; base
overhang is per side. The screen is inside the bezel, not the entire lid.

| Frame | Bezel side / top / bottom | Edge | Lid corner | Screen corner | Camera or notch | Base overhang / height |
| --- | --- | --- | --- | --- | --- | --- |
| MacBook Pro 14-inch | 16 / 16 / 22 | 4 | 24 | 12, top only | centred top notch 196 × 32 | 50 / 38 |
| MacBook Pro 16-inch PROLED | 14 / 14 / 18 | 4 | 30 | 24, all four | centred 56 × 27 capsule, 14 below screen top | 55 / 38 |
| MacBook Neo 13-inch | 30 / 30 / 60 | 5 | 42 | 20, top only | small camera in top bezel; no notch | 105 / 42 |

The lid's two hinge-side corners are tighter than the top ones: 6 points. The black glass is
the lid inset by `edge`, with corners `lid corner − edge` on top and 3 points at the hinge.
A notch hangs from the screen's top edge with 10-point bottom corners and a 3.5-point camera
dot; a bezel camera is a 3-point dot centred in the top bezel.

For Studio Display and Studio Display XDR, start with a 2560 × 1440 screen, a 57-point black
bezel and 3-point metal edge on each side, 18-point outer corner radius, and a centred stand
about 655 points wide and 498 points tall. Apple publishes a 62.3 × 36.2 cm enclosure for both;
stand shape, bezel width, and details above are approximations.

### Coordinate example

For the closed Duo, `k = 466 / 77.17 ≈ 6.0386` points/mm. With the case at `(0, 0)`, the
approximate screen rectangle starts at `(4.17k, 2.76k)` and is `466 × 678` points. Draw the
case at `84.1k × 117.8k`, then draw the camera centred at `(73.39k, 10.62k)` with diameter
`6.07k`. Apply the asymmetric hinge-side corner profile on the left. Keep the camera in case
coordinates, not screen coordinates; subtract the screen origin if positioning it inside the
screen. Include any button protrusion when computing the exported bounding box.

For the **open Duo**, use `k = 951 / 157.7 ≈ 6.0304` points/mm. Draw one case of approximately
`992.6 × 710.4` points. Centre one `951 × 669` screen at approximately `(20.8, 20.7)` inside
the case. The centre of the screen is approximately `x = 496.3` in case coordinates: it is
screen content, not a seam or an extra bezel. The actual active-area height and inferred logical
screen height differ slightly after scaling; centre the logical rectangle within the measured
active area. Any hinge details belong outside the active screen.

Use [Apple's dimensional drawings](https://developer.apple.com/accessories/dimensional-drawings/)
for specific corner profiles, insets and button details, and the relevant manufacturer's product
specification for physical screen pixels. Screen resolution alone does not verify the shape of a
frame. If no suitable front reference is available, approximate the shape and say so; never call
it pixel-perfect without a comparison.

## Output and verification

- **Image:** render at the requested pixel dimensions, including transparent alpha if requested.
  Wait for images, fonts, and page content to load; surface failures instead of delivering an
  empty screen. Keep the original content's aspect ratio. For transparent output, check that
  pixels outside the hardware have alpha 0; the presence of an alpha channel alone is not enough.
- **Video:** fit the recording to the screen, apply the exact same screen clip or mask as the
  frame, and layer hardware above it. Preserve timing and audio when possible. For transparency,
  choose a codec and container that actually support alpha; do not assume MP4 does. Check the
  resulting file rather than inferring its codec from the extension.
- **Live UI:** keep the screen interactive where requested. Do not intercept its input with
  decorative hardware layers; scale the frame and its hit areas together. Respect the existing
  project's accessibility and layout conventions.
- Inspect the actual image or representative video frames before delivery. Check clipping, camera
  placement, frame edges, source content, scale, colour, transparency, and any requested
  orientation. If visual inspection or playback is unavailable, say so.
- Report the output path or component, dimensions, cropping or approximations, and checks actually
  performed. Do not claim pixel-perfect accuracy based only on screen dimensions.
