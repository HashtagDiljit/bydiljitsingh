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

---

## Working practices that were learned the hard way

**Run `git fetch` before concluding a file is missing.** A full cycle was lost when an audit concluded the design system "was never pushed". It had been pushed; the container had cloned before the commit landed and never fetched. Reading a file from disk is not the same as reading the current state of the repo.

**Unpushed local work is invisible to a cloud container.** If Diljit copies files in locally, they must be committed and pushed before they can be seen here.

**Check the live Pages URL, not just local files,** when diagnosing what a visitor actually sees.

**Header, nav and footer are duplicated across every page** with no templating. A change to any of them has to be applied to all sixteen files, scripted rather than by hand, and verified afterwards.

**Verify in a browser rather than asserting.** Several real faults were only caught by rendering: a figure crop that had swallowed a paragraph of report text, a masthead overflowing at mobile width, and a transformer silently dropping a `<ul>` nested inside `<details>`.

---

## Outstanding

- **`assets/Diljit_Singh_CV.pdf` is out of date.** The CV page reflects the 2026 CV; the downloadable PDF does not. It needs replacing with the same filename so links don't break. This has been outstanding a while.
- **23 `media-pending` placeholders** remain across agridrive, factory-in-a-box, inhaler-spacer, thin-plate-fea and wankel-engine-transmission. They are deliberate and stay until Diljit supplies real images. When he does, swap the placeholder span back to an `<img>` inside a `plate-figure` figure so it becomes enlargeable.
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
