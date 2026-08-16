# Design brief

`index.html`, `styles.css` and `site.js` are the reference implementation. Every other page is rebuilt to match. Read this before changing anything visual.

## The idea

Warm, modern, old money. Restraint and space, with colour used sparingly and deliberately. Confident enough to leave a lot of the page empty.

What this is not: a card-based template. No rounded-corner cards, no drop shadows, no soft grey panels. The previous version of this site failed because everything was a white rounded rectangle floating on grey, which is the default generated look.

## Tokens

All in `:root`. Never hard-code a value that exists as a token.

**Colour.** White base. Warmth comes from brass and green, not from a tinted page.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Page base |
| `--sage` | `#EEF1EA` | Alternating section wash, used to cut the page into bands |
| `--forest` | `#16241B` | Dark full-bleed sections and the footer |
| `--ink` | `#1F2621` | Body text |
| `--brass` | `#A97F3D` | Accent. Roughly five appearances per page, no more |
| `--oxblood` | `#6E2F2A` | Active and hover state on project titles only |
| `--line` | `#DDE2DA` | Hairlines |

Brass is rationed. It carries the italic surname, section heading accents, tag outlines and the underline on nav hover. Using it as a background fill or a heading colour throughout breaks the system.

**Type.** Two faces.

- **Baskervville** for all display type. Named after John Baskerville, the Birmingham typefounder, which is why this face rather than another. Italic is used for the accent word in headings and is always brass.
- **Instrument Sans** for body copy, labels and buttons.

Labels use `.label`: uppercase, 0.7rem, letterspacing 0.22em.

**Space.** `--section` governs vertical rhythm and is deliberately large. Do not reduce it to fit more on screen.

## Section rhythm

The page alternates so it never reads as one flat sheet: white hero, forest band, sage showcase, forest footer. Keep that alternation on other pages. `.section--wash` applies the sage background where a page needs breaking up.

## Motion

Gated behind a `.js` class added by `site.js`, so the page renders fully without JavaScript, and everything collapses under `prefers-reduced-motion`.

**Load sequence.** The one orchestrated moment, and it happens once. Hairlines draw outward, the portrait plate wipes down via `clip-path`, hero elements stagger up at 100ms intervals.

**The showcase.** The signature scroll moment. The image panel is sticky while the project list scrolls past; as each item crosses the middle of the viewport its image crossfades and scales in, and its title turns oxblood. Driven by IntersectionObserver with a `-45% 0px -45% 0px` root margin. On screens under 1000px the sticky panel is replaced by inline images, since sticky panels do not work on narrow screens.

**Parallax.** Elements with `.parallax` and a `data-speed` attribute get a gentle transform driven by requestAnimationFrame. Used on the hero portrait only.

**Scroll reveals.** Quiet fade and 24px rise, once per element. Add `class="reveal"` and optionally `data-delay="1|2|3"`.

Do not add: scroll-jacking, counters, typewriter effects, entrance animations on everything, or anything that re-triggers each time an element scrolls into view.

## Image treatment

Images sit in plates with hairline framing and hard corners. A sage wash is multiplied over project imagery at 0.5 opacity so white studio backgrounds settle into the palette rather than punching holes in it. The hero portrait carries a light sepia filter that clears on hover, and an offset brass rule sits behind it.

## Quality floor

Every page: works down to 360px with no horizontal overflow, visible keyboard focus, reduced motion honoured, renders without JavaScript, no broken links.
