# bydiljitsingh

Personal portfolio site for Diljit Singh, Graduate Project Manager at Arcadis (Property Regions) and MEng Mechanical Engineering (Automotive) graduate, University of Birmingham.

Live at: https://hashtagdiljit.github.io/bydiljitsingh/

## Stack

Static HTML and CSS. No build step, no framework, no dependencies. Files are served exactly as they sit in the repository, which keeps the site fast and means changes go live as soon as they're pushed.

- Fonts: Inter and Playfair Display, loaded from Google Fonts
- Hosting: GitHub Pages, served from the repository root

## Structure

```
index.html              Home
projects.html           Project index
cv.html                 CV
404.html                Not-found page
styles.css              All styling for every page
robots.txt              Crawler directives
sitemap.xml             URL list for search engines
projects/               One HTML file per project case study
assets/                 Images, CV PDF, favicon, social card
  diljit-singh.jpg      Portrait
  social-preview.png    Open Graph card, 1200x630
  Diljit_Singh_CV.pdf   Downloadable CV
  projects/<slug>/      Per-project images
```

## Conventions

Anyone editing this site should keep to the following, because the pages share markup by copy rather than by template.

**Every page repeats the same header, nav, and footer.** There is no include mechanism. A change to navigation or the footer has to be applied to all 16 HTML files. When making such a change, script it rather than editing by hand, and verify the count afterwards.

**Styling lives only in `styles.css`.** No inline styles, no per-page stylesheets. Colours come from the CSS custom properties defined in `:root`.

**Project pages sit one directory down**, so they reference shared assets with `../assets/...` and navigation with `../index.html`. Getting this wrong produces a silently broken image or link, so check relative depth whenever adding a project page.

**Asset folder names must match the project slug** used in `assets/projects/`. A mismatch here was the cause of 23 broken images previously; the folder name in the path and the folder name on disk have to agree exactly, including case.

**Missing project images use `<span class="media-pending">Description</span>`** inside the `.detail-media` container rather than an `<img>` pointing at a file that doesn't exist. This degrades gracefully and labels what belongs there.

**Each page carries its own meta block**: description, canonical URL, Open Graph tags, and Twitter card. When adding a page, copy the block from an existing page and update the description, canonical, and `og:url`. Add the new URL to `sitemap.xml`.

## Known open items

1. **`assets/Diljit_Singh_CV.pdf` is out of date.** The CV page content has been updated to the 2026 CV; the downloadable PDF has not. Replace it so the two match.
2. **23 project images are absent.** They currently show labelled placeholders on these pages: `agrdrive.html`, `factory-in-a-box.html`, `inhaler-spcaer.html`, `thin-plate-fea.html`, `wankel-engine-transmission.html`. Drop the real images into the matching `assets/projects/<slug>/` folder and swap the `media-pending` span back to an `<img>`.
3. **Two filenames contain typos**: `projects/agrdrive.html` (should be `agridrive`) and `projects/inhaler-spcaer.html` (should be `inhaler-spacer`). Renaming these means updating the links in `projects.html` and `sitemap.xml` at the same time. Old URLs will break, which is acceptable given the site has little inbound linking, but do it in one commit.
4. **No Wiki page.** A placeholder Wiki page was removed because every link pointed nowhere. If it returns, it should launch with real content.

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Note that `404.html` uses absolute paths prefixed with `/bydiljitsingh/` to match the GitHub Pages subpath, so it will not preview correctly on a bare local server; this is expected and correct in production.

## Before pushing

- Confirm no broken internal links.
- Confirm the header, nav, and footer are identical across all pages.
- Confirm any new page is listed in `sitemap.xml`.
