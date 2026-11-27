---
name: filming-software
description: Make a product film of software — a website or app filmed on a real screen through a real lens, as a sequence of moving shots joined by hard cuts, rendered frame by frame to MP4. Use for launch videos, product films, feature trailers, hero loops, teasers and social clips that should look filmed rather than screen-recorded or animated, including scrolling pages, push-ins, slides, rack focus, multi-page tours and screen recordings played on a device.
---

# Filming software

A short film of the software: real pages on a real screen, a camera that moves like an
operator's, shots joined by hard cuts. Fast, confident, no decoration.

Every frame must pass as a photo: build it with `photographing-software`
([ui-skills.com/skills/ibelick/photographing-software](https://www.ui-skills.com/skills/ibelick/photographing-software))
and device geometry from `device-frames`
([ui-skills.com/skills/ibelick/device-frames](https://www.ui-skills.com/skills/ibelick/device-frames)).
This skill adds the story, the shots, the moves, the edit, the render and the checks.

Use the project's tools. Check before assuming (`ffmpeg -encoders | grep libx264`, a
headless Chrome); ask before adding dependencies.

**Pipeline:** brief → capture → shot list → preview → offline render → encode → measure → report.

## 1. Brief

- **Deliverable:** 1920 × 1080 at 30 fps by default; 3840 × 2160 for hero use; 1080 × 1350
  or 1080 × 1920 for social; 24 fps for a filmic feel, 60 only for fast UI motion. Ask only
  when the choice changes the film.
- **Length:** hero loop 12–25 s, social 15–30 s, launch film 30–60 s.
- **One line per shot, written first:** open on the promise (the hero), 2–4 proofs, end on
  the payoff (pricing, download, closing call to action).
- **Open close, not wide.** The first frame is the hook: a text macro across the headline,
  or a detail of the product, then cut wide. A full-screen opening that slowly pushes in is
  a screenshot that moves; nobody watches past it.
- **Stay on the product.** The home page usually holds the whole story; film its sections
  before reaching for other pages. Add a page only when it shows something the home page
  does not (features, pricing, a showcase). Docs, changelogs, blogs and about pages are
  text walls: leave them out unless they are the point of the film.
- Film only the user's own product. No manufacturer logos, no implied endorsement.

## 2. Capture

- Capture each page whole at the device's viewport and 2×, one screen at a time. Scroll the
  page once first so reveal animations have played.
- **Hide only bars** after the first screen: fixed or sticky elements under ~30% of the
  viewport tall (headers, cookie and chat bubbles). A taller sticky block is a pinned
  section; hiding it leaves blank screens.
- Never film checkout, sign-in, sign-up, account, trial, legal or status pages, or anything
  behind a login the user did not supply.
- **Look at every capture.** Blank bands, missing images, a banner over the hero or an
  error page mean it is not ready. A missing page is an error, never a white screen.
- **Screen recordings** are a texture locked to the timeline: seek each frame, never let it
  free-run. Native resolution and frame rate; letterbox, never stretch.

## 3. Shot list

Write it as a table before rendering: `# | Page | Move | Length | Scroll | Aim | Focus`.
A 25 s home-page loop that works:

| # | Shot | Move | Length |
| --- | --- | --- | --- |
| 1 | Headline, read across | Text macro | 3.5 s |
| 2 | Hero into the product demo, page scrolling | Turn | 4.5 s |
| 3 | One value in a feature card | Text macro | 3 s |
| 4 | The row of feature cards | Slide | 4.5 s |
| 5 | One element to another, other side of the screen | Rack focus | 4.5 s |
| 6 | Closing call to action, back to the whole screen | Pull out | 4.5 s |

- **One idea per shot.** Close shots 3–3.5 s, wide and travelling shots 4.5–5 s, up to
  8 s for a long scroll or a recording; never under 2.5 s. Uneven lengths give rhythm;
  six shots of 5 s is a slideshow.
- **Rhythm is close / wide / close.** Each proof is a pair: the whole section, then one
  detail in it (a value, a button, a line of copy), or the reverse. The detail is what the
  viewer remembers.
- **The screen fills the frame.** No room, bezel or desk unless asked. At yaw the far edge
  shrinks, so solve for the distance that still covers it with ~5% margin:
  `d = (w/2) · (cos(yaw) / (m · tan(hfov/2)) − sin|yaw|)`, capped by
  `d ≤ h / (2 · m · tan(vfov/2))`, `w`, `h` the screen in metres, `m ≈ 1.05`.
- **Opening shots keep the top of the screen:** menu bar and browser bar at the top edge.
  They make it read as a real computer.
- **Every cut changes scale or angle.** Full → close (headline, price, one card) → full.
  Never two shots of the same scale and move in a row; alternate the turn left, front, right.
- **Moves** (camera; the page may also scroll):

  | Move | Change | Use |
  | --- | --- | --- |
  | Scroll | page 1–2 screens, distance −3% | Opening, long sections |
  | Drift | aim ±3% of the screen, yaw 3° | Between bigger moves |
  | Push in | distance −35 to −40%, onto the headline | The promise, a price |
  | Pull out | the reverse | Closing on a whole page |
  | Turn | yaw 13°, slightly closer than full | Variety; shows depth of field |
  | Slide | aim ±0.28 screen widths at ~0.66 × full distance | Along a row of cards |
  | Rack focus | focus crosses in 0.8–1.5 s, camera nearly still | Attention from one element to another |
  | Text macro | 0.3 × full distance, f/1.4-like, aim drifts 0.2 widths | The opening line; one detail per proof |

- **Scroll at reading speed:** 150–350 CSS px/s, at most 2 screens a shot, never rounded to
  whole pixels.
- **Level:** roll 0; `pitch = atan(tan(tilt) · cos(yaw))` keeps the lid's verticals parallel.
- **Focus on the message**, following the scroll. One rack focus per film.

## 4. Motion

- **Moving through every cut.** Ease in over the first quarter, then constant speed to the
  last frame (a glide). Easing to a stop before a cut reads as a stutter. Ease out only to
  land the final shot. No end holds except on the last shot.
- **Handheld barely there, or off:** ±0.15–0.4° yaw and pitch, ±0.15° roll, ±0.5% distance
  at 0.5–3 Hz, seeded by sequence time so it never resets at a cut.
- **Constant across the film:** lens, field of view, room, light, grade, grain, device.

## 5. The edit: hard cuts

- **Cut, always, by default.** Zero-length, frame to frame. Load the next shot's page into
  its slot before the cut so the first frame is ready; a cut that lands on a loading or
  half-drawn frame is a blink.
- **Cut on motion:** both shots moving, the incoming one already at speed or starting a
  scroll. Cut to a different scale or angle so it reads as an edit, not a jump.
- **Dark ↔ light pages:** keep the cut and let the brightness change be the punch. Use a
  0.3 s dissolve only if the user asks for something softer.
- **Fade through black** (0.3 s a side) only to open or close a non-looping film.
- No dissolves by default, no wipes, zooms, spins, light leaks, flashes or glitches.
- **Loop:** cut from the last shot straight into the first; start and end on different
  scales so the loop point reads as one more cut.
- **Ending (optional):** a still logo or one line on the brand background, cut in and held
  2–3 s. No animated logo reveals, buttons or URL cards unless asked. No sound unless
  supplied.

## 6. Preview, then render offline

- **Preview** at 960 × 540 and the final frame rate. Grab two frames per shot (start and
  end) into a contact sheet and look at it before rendering: the aim on the right element,
  the text sharp, no room or bezel at the edges, neighbours differing in scale. Fix aims
  from what you see, never from page coordinates measured in another viewport. Then get
  the user's OK on the shot list.
- **Never record in real time** (screen capture, `MediaRecorder`). For each frame `n`: set
  time `n / fps`, seek any recording, render the full photo pipeline at the final size,
  read the pixels.
- **Grain per frame,** seeded by frame number, 0.03–0.06.
- **No motion blur needed** for these moves (a few px per frame). Faster moves: average 4+
  sub-frames over a 180° shutter.
- **No shimmer:** mipmapped, anisotropic screen texture, no subpixel pattern. Check a moving
  close-up at 100% first.

## 7. Encode

- H.264, `yuv420p`, CRF 14–18, preset slow, `+faststart`, at the render frame rate:
  `ffmpeg -f image2pipe -framerate 30 -c:v mjpeg -i - -c:v libx264 -preset slow -crf 14 -pix_fmt yuv420p -movflags +faststart out.mp4`
  (JPEG frames at 0.95, or PNG).
- Offer a web copy (H.264 CRF 22–24 or VP9 WebM). No audio track unless supplied. Thin
  coloured text softens in 4:2:0; offer ProRes 4444 on request.

## 8. Measure the file

Check the encoded file, never the preview.

- **Timing:** `ffprobe` duration, frame count and rate match the shot list (sum of shots,
  minus any dissolves).
- **Cuts land clean:** per-frame luma
  (`-vf "scale=320:-1,signalstats,metadata=print:file=stats.txt" -f null -`). A step at a cut
  is expected; a dip or spike lasting one or two frames around it is a blink (a frame that
  was not ready). Away from cuts, steps stay under ~3/255.
- **No stray jumps:** `tblend=all_mode=difference` spikes only at the planned cuts.
- **Screen fills the frame:** the outer 2% of several frames per shot is screen content.
- **Contact sheet:** the middle frame of each shot plus the frames either side of each cut
  (`select='eq(n,A)+eq(n,B)…',scale=640:-1,tile=2x4`). Every page complete, the headline
  sharp and readable at half size, neighbours differ in scale or angle.
- **Watch it at full size as a stranger would.** Anything that reads as rendered, as a
  screen recording or as a slideshow: fix the cause.

**Report:** output path, size, frame rate, length, codec; the shot list as rendered (page,
move, length, transition); cut-frame check result; device, room and its licence; every
approximation (synthetic menu bar and browser chrome, approximate hardware, hidden bars,
capped page height, letterboxed recordings, no motion blur).
