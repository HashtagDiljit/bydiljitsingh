# Working on this repository

Read `README.md` first for structure and conventions. This file covers what to watch out for when making changes.

## What this site is

A personal portfolio for Diljit Singh. The audience is recruiters, colleagues at Arcadis, and anyone who looks him up after meeting him professionally. Positioning is Graduate Project Manager at Arcadis (Property Regions), backed by an engineering degree and technical project work. Tone should stay understated and evidence-led. Avoid marketing language and inflated claims.

## The one thing that breaks most often

There is no templating. Header, navigation, and footer markup is duplicated across all 16 HTML files. Any change to those regions must be applied everywhere, or pages will drift out of sync.

Apply such changes with a script, then verify:

```bash
# Every page should return the same count
grep -c 'class="site-footer"' *.html projects/*.html
```

## Relative paths

Root pages use `assets/...` and `index.html`. Pages inside `projects/` use `../assets/...` and `../index.html`. `404.html` is the exception and uses absolute `/bydiljitsingh/...` paths, because GitHub Pages serves it from arbitrary URL depths.

## Check before every commit

```bash
# Broken internal links
python3 - <<'EOF'
import re, os, glob
files = ["index.html","cv.html","projects.html","404.html"] + sorted(glob.glob("projects/*.html"))
bad = []
for f in files:
    base = os.path.dirname(f)
    for a in re.findall(r'(?:href|src)="([^"]+)"', open(f, encoding="utf-8").read()):
        if a.startswith(("http", "mailto:", "#", "data:")):
            continue
        p = a.lstrip("/").replace("bydiljitsingh/", "", 1) if a.startswith("/") else os.path.normpath(os.path.join(base, a))
        if not os.path.exists(p):
            bad.append((f, a))
print("broken:", len(bad))
[print(" ", f, "->", a) for f, a in bad]
EOF
```

Also confirm any page added is present in `sitemap.xml`, and that its meta block has the right `canonical` and `og:url`.

## Content that must stay accurate

The job title is **Graduate Project Manager**, in **Property Regions** at **Arcadis**, on the **GROW** graduate programme. It appears in `index.html` (hero and JSON-LD), `cv.html`, the footer of every page, `404.html`, and the meta descriptions. If the role changes, all of those need updating together.

The degree is **MEng Mechanical Engineering (Automotive)**, University of Birmingham, 2:1, completed June 2026. Write it that way rather than shortening to "Automotive Engineering".

## Do not

- Add a build step, framework, or package manager. The value of this site is that it is plain files.
- Add analytics, tracking, or third-party embeds without being asked.
- Reintroduce a page with placeholder content. A Wiki page was removed for exactly this reason. Ship pages when they have real content.
- Add a form that does not submit anywhere. A dead newsletter signup was removed for the same reason.
- Invent project details, marks, or achievements. All factual content comes from the CV or existing project pages.
