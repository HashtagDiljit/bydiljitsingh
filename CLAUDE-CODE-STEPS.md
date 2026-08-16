# Putting this into Claude Code

Work through these in order. Finish and check each stage before starting the next. All commands are for Windows cmd.

---

## Stage 0 — Copy the files in and start a branch

Unzip the package. It contains:

```
index.html            Redesigned homepage (replaces yours)
styles.css            The design system (replaces yours)
site.js               New file: scroll animations
DESIGN-BRIEF.md       New file: the visual rules
PROJECT-CONTENT.md    New file: written content for two project pages
assets/projects/final-year-project/   6 real images
assets/projects/AFPS/                 2 real images
```

Copy it all over your repo, then branch:

```
cd %USERPROFILE%\Documents\bydiljitsingh
git checkout main
git pull origin main
git checkout -b redesign
xcopy "C:\path\to\unzipped\folder\*" . /E /H /Y
git add -A
git status
```

Check `git status` shows the modified `index.html` and `styles.css`, three new markdown files, `site.js`, and eight new images. Then:

```
git commit -m "Add warm design system, real project imagery, and content briefs"
```

Working on a branch means your live site stays up the whole time. Nothing you do here is visible publicly until Stage 5.

---

## Stage 1 — Open Claude Code and roll out the design

Open the repo folder in Claude Code. Paste this:

> Read `DESIGN-BRIEF.md`, `CLAUDE.md` and `README.md`, then read `index.html`, `styles.css` and `site.js` closely. `index.html` is the finished reference implementation of a new design system. Your job is to bring every other page onto it.
>
> Rebuild `projects.html` as the full project index: all twelve projects, newest first, grouped by year. Use the register pattern from `styles.css`, not a card grid.
>
> Rebuild `cv.html` from its existing content, keeping every fact exactly as written. Turn it from stacked cards into a document: hairline-separated entries, dates in a left column, no shadows, no rounded corners.
>
> Rebuild `404.html` to match, keeping its absolute `/bydiljitsingh/` paths.
>
> Rebuild all twelve pages in `projects/`, preserving their existing written content and image references. Each gets a sheet label, a Baskervville title, a metadata table using the same pattern as the hero `dl` in `index.html`, hairline-framed image plates with captions, and the footer. These pages are one directory down, so asset paths need `../`.
>
> Add the `site.js` script tag and the same Google Fonts link to every page.
>
> Constraints: no new colour tokens, no new fonts, no rounded corners, no shadows. Reuse existing classes. If a page genuinely needs a new component, build it from existing tokens and tell me what you added and why.
>
> When done, check every internal link resolves and confirm the header and footer are identical across all sixteen pages.

Preview locally before moving on:

```
python -m http.server 8000
```

Open `http://localhost:8000` and click through every page.

---

## Stage 2 — Rewrite the two project pages properly

These two pages have real content now and currently have almost none.

> Read `PROJECT-CONTENT.md`. It contains researched content for two projects, drawn from my actual reports. Use it as the source of truth and do not invent anything beyond it.
>
> Rewrite `projects/final-year-project.html` completely using the Project 01 content. Use all six images now in `assets/projects/final-year-project/` with the captions given in the file. Include the metadata table. Keep the section on unresolved limitations; I want that stated rather than hidden.
>
> Rewrite `projects/AFPS.html` completely using the Project 02 content, with both images. Correct the title from "DCI & HCCI Engine Modelling" to "GDI & HCCI Engine Modelling" everywhere it appears, including `projects.html` and any meta tags, since DCI is wrong.
>
> Update the register entries for both projects in `projects.html` with the new descriptions, and update the meta description on both pages.

Both projects previously had an "IN PROGRESS" placeholder as their cover image. That is now fixed.

---

## Stage 3 — Fix the filename typos

> Rename `projects/agrdrive.html` to `projects/agridrive.html` and `projects/inhaler-spcaer.html` to `projects/inhaler-spacer.html`. Update every reference to both, including `projects.html`, `sitemap.xml` and any internal links. Use `git mv` so history is preserved. Do this as one commit.

---

## Stage 4 — Check before merging

> Run a final check across the whole site. Confirm: no broken internal links; no page references an image that does not exist; the header, nav and footer are identical on all sixteen pages; every page is listed in `sitemap.xml`; no page uses `border-radius` or `box-shadow` on a content container; no colour appears that is not a token in `:root`. Report anything you find rather than silently fixing it, then fix once I confirm.

Then check it yourself at a narrow browser width, and with JavaScript disabled, since the design is meant to survive both.

---

## Stage 5 — Go live

```
git checkout main
git merge redesign
git push origin main
git branch -d redesign
```

Give GitHub Pages a minute, then hard-refresh with `Ctrl + Shift + R`.

---

## Stage 6 — Afterwards

The social card at `assets/social-preview.png` still uses the old grey styling and will look inconsistent once the warm design is live. Send me a message when the site is up and I will regenerate it to match.

Also worth doing once live: revisit Google Search Console and request indexing again, since the content has changed substantially.

---

## If Claude Code drifts

The most likely failure is quietly sliding back to the generated look:

> This has drifted from `DESIGN-BRIEF.md`. No rounded corners, no shadows, no cards, no colours outside the tokens. Re-read the brief and fix it.

Second most likely is over-animating:

> Too much motion. Per the brief, the load sequence and the sticky showcase are the only orchestrated moments. Everything else is a quiet fade on first scroll and slow hover states. Remove the rest.

Third is inventing technical detail on project pages:

> Do not invent technical content. Everything on the project pages must come from `PROJECT-CONTENT.md` or from what is already on the page. If you need a detail I have not given you, ask.
