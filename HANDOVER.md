# Handover

This file records the intent behind the site, so that decisions made earlier don't get quietly undone later. Read it alongside `DESIGN-BRIEF.md` (the visual system), `CLAUDE.md` (repo conventions) and `PROJECT-CONTENT.md` (researched content for two projects).

Diljit owns this site and makes the calls. This document explains why things are the way they are; it does not override him.

---

## Who this is for

Diljit Singh, Graduate Project Manager at Arcadis in Property Regions, on the two-year GROW programme, MEng Mechanical Engineering (Automotive) from Birmingham. The audience is recruiters, colleagues, and people who look him up after meeting him professionally.

The job of the site is to make a serious, precise impression and to back it with evidence. Tone stays understated and specific. No marketing language, no inflated claims, no adjectives doing work that a number could do better.

---

## Decisions worth not reversing

These were deliberate, and each has a reason that isn't obvious from the code.

**No cards, no shadows, no rounded corners on content containers.** The site's first version was white rounded rectangles with soft shadows on grey. That is the default generated look and it was the single biggest reason the site read as templated. Restraint, hairlines and space are doing the work instead.

**White base, sage wash, forest bands.** An earlier version used a warm ivory page. It read as dirty rather than warm. Warmth now comes from brass and green rather than from a tinted page, and sections alternate white → forest → sage → forest so the page never reads as one flat sheet.

**Baskervville as the display face.** Named after John Baskerville, the Birmingham typefounder. It is the city's own letterform, which is why this face and not another. That connection is stated once in the colophon and should stay.

**Brass is rationed.** Roughly five appearances per page. It carries the wordmark, heading accents, tag outlines and hover underlines. Using it as a background fill or on every heading would kill the effect it exists to create.

**Oxblood appears in exactly one role**, on the active or hovered project title. It is not a general accent.

**Images use `object-fit: contain`, not `cover`.** The imagery is mostly wide CAD renders, FEA plots and engineering drawings. Cropping a photograph loses atmosphere; cropping a general arrangement drawing loses information. Nothing gets cropped.

**Motion is deliberately limited.** One orchestrated load sequence, the sticky showcase on the homepage, quiet scroll reveals, slow hover states. No scroll-jacking, no counters, no typewriter effects, nothing that re-triggers on every scroll. Everything is gated behind a `.js` class so the site renders fully without JavaScript, and everything collapses under `prefers-reduced-motion`.

**Unresolved technical limitations are stated, not hidden.** The final year project page says plainly that rise time is unproven, that sealing above 700 bar may need backup rings, and that the shim spec and fill procedure are incomplete. Stating limits reads as more competent than implying everything was finished. Do not tidy these away.

---

## Content rules

**Never invent technical detail.** Every figure, mark, material and result on the project pages comes from Diljit's own reports. If a detail is needed and isn't in `PROJECT-CONTENT.md` or already on the page, ask him rather than filling the gap.

**The job title is exact:** Graduate Project Manager, Property Regions, Arcadis, GROW programme. The degree is MEng Mechanical Engineering (Automotive), 2:1, completed June 2026. Write it that way rather than shortening to "Automotive Engineering".

**GDI, not DCI.** The AFPS project is gasoline direct injection. The original site had this wrong and it was corrected; don't let it drift back.

**Plain hyphens and straight quotes.** No em dashes, en dashes or curly quotes anywhere in the copy. `transform.py` normalises them on every build so they cannot creep back in.

**Claim the degree, not the profession.** Diljit has an engineering degree but does not work as an engineer, and is early enough at Arcadis not to claim property expertise. Copy should present the project work as university work and the property side as something being learned. Avoid aphorisms: an earlier homepage carried "Precision is a habit, not an event" and "What lasts is rarely accidental", which is exactly the register to stay out of.

---

## Working practices that were learned the hard way

**Run `git fetch` before concluding a file is missing.** A full cycle was lost when an audit concluded the design system "was never pushed". It had been pushed; the container had cloned before the commit landed and never fetched. Reading a file from disk is not the same as reading the current state of the repo.

**Unpushed local work is invisible to a cloud container.** If Diljit copies files in locally, they must be committed and pushed before they can be seen here.

**Check the live Pages URL, not just local files,** when diagnosing what a visitor actually sees.

**Header, nav and footer are duplicated across every page** with no templating. A change to any of them has to be applied to all sixteen files, scripted rather than by hand, and verified afterwards.

**Never split a CSS-columns layout across separate containers.** The gallery loaded in batches, each its own `.gallery` element. Because every column ends at a different height, each container began below the tallest column of the one before, so the gap above the shorter columns was larger than everywhere else and the spacing read as irregular. There is now one container; individual items carry `data-batch` and are hidden by script instead. Every gap is now identical.

**Setting `src` on a visible `<img>` leaves the old picture on screen until the new one loads.** Clicking a gallery photograph appeared to open the previously viewed one, or the wrong one entirely on a fast second click. The lightbox now paints the already-cached thumbnail immediately, then swaps to the full-size file once it has decoded, with a token so a slow load from an earlier click cannot land on a later one.

**Video and photograph filenames share a namespace.** `Lake Como.jpg` and `Lake Como.mp4` both existed, and generating the clip's poster frame as `thumb/lake-como.jpg` silently overwrote the photograph's thumbnail. Video posters are now `poster-<stem>.jpg` beside the clip, and the builder excludes `poster-*` from the wall.

**IntersectionObserver only reports transitions.** The gallery's batch loader revealed one batch and then stopped, because the sentinel stayed inside the root margin and never re-entered, so no further callback fired. It now unobserves and re-observes after each reveal. Any "load more on scroll" built here needs the same treatment.

**Focusing an element inside a `visibility: hidden` subtree silently fails.** The lightbox called `focus()` on its close button while the overlay was still transitioning, so focus never entered the dialog. It now polls on animation frames until the overlay computes to visible.

**Two `var` declarations with the same name in one function silently clobber each other.** The lightbox reused the name `figures`, which the sticky showcase above it was already using. Because `var` is function-scoped, the showcase's list of images was replaced by an empty one and the homepage image froze on the first project while the titles kept changing. The lightbox list is now called `plateFigs`. If a new block is added to `site.js`, give its variables fresh names.

**Verify in a browser rather than asserting.** Several real faults were only caught by rendering: a figure crop that had swallowed a paragraph of report text, a masthead overflowing at mobile width, and a transformer silently dropping a `<ul>` nested inside `<details>`.

---

## Outstanding

- **`assets/Diljit_Singh_CV.pdf` is out of date.** The CV page reflects the 2026 CV; the downloadable PDF does not. It needs replacing with the same filename so links don't break. This has been outstanding a while.
- **23 `media-pending` placeholders** remain across agridrive, factory-in-a-box, inhaler-spacer, thin-plate-fea and wankel-engine-transmission. They are deliberate and stay until Diljit supplies real images. When he does, swap the placeholder span back to an `<img>` inside a `plate-figure` figure so it becomes enlargeable.
- **Image weight.** Resolved. `site-layout.png` was 3.4 MB of photographic render stored as PNG; it is now `site-layout.jpg` at 0.44 MB, taking that page from 4.27 MB to 1.32 MB. PNG is for line art and screenshots; anything photographic belongs in JPEG. Gallery photographs are resized on the way in, never committed at camera resolution.
- **Gallery page.** Live, with 24 photographs and one clip. Adding more: drop files into `assets/gallery/`, then regenerate. Filenames must be lowercase and hyphenated, because spaces break URLs, and the filename becomes the alt text. Every photograph is stored twice: `assets/gallery/<name>.jpg` at 2400px for the full-screen view, and `assets/gallery/thumb/<name>.jpg` at 1100px for the wall. The originals, 4-8 MB each straight off the camera, are only in git history from commit feb0775; the working copies are resized. Order on the page is alphabetical by filename, so a numeric prefix controls it.
  `.gallery` in `pages.css` gives three independently flowing columns so pieces never align into rows, offsets on every other item, and uncropped mixed portrait and landscape. **No captions** - these are personal photographs, not catalogued work. Stills and clips both carry `plate-figure`, so the existing lightbox opens either full screen; `site.js` now swaps between `.lightbox__img` and `.lightbox__video` and pauses the clip on close. Clips autoplay muted on a loop inline and are spread evenly through the stills by the builder. Batches reveal on scroll. It is not shipped because `assets/gallery/` holds only `placeholder`, and no page ships with placeholder content. When Diljit adds files: build the page, delete `placeholder`, add Gallery to the nav on every page, and add it to `sitemap.xml`.
- **Wording.** Diljit is editing text directly on GitHub. `projects.html` still carries "Technical portfolio" and a systems-first quote, both leftovers from the original generated site. Leave the wording to him unless asked.
- **Google Search Console.** The property is verified via `googlee40dc542abb486fa.html` in the repo root, which must never be deleted. After the redesign, re-request indexing for the homepage, projects and CV, since the content changed substantially.

---

## Guardrails

- No build step, framework or package manager. The value of this site is that it is plain files served as-is.
- No analytics, tracking or third-party embeds unless asked.
- No page ships with placeholder content. A Wiki page was removed for exactly this reason.
- No form that doesn't submit anywhere. A dead newsletter signup was removed for the same reason.
- No new colour tokens or fonts without raising it first.
- If a genuine gap in the design system requires a new component, build it from existing tokens and say what was added and why. That is what `pages.css` was, and it was the right call.

---

## Keeping this current

When something structural changes, update this file in the same commit. It exists so that the reasoning survives past the conversation it came from.
