# Sitemap Maintenance Notes

## Purpose
The sitemap at `/sitemap.html` is an internal navigation board for quickly opening the current pages,
files, and key Prism destinations in this repository.

It is intentionally broader than a public website sitemap. It includes:
- root HTML pages
- Prism pages and team pages
- internal Markdown notes
- direct file links like the resume PDF
- important external destinations that act like part of the site flow

## Link-Type Legend
The colored dots on sitemap cards are semantic and should stay in sync with the legend shown in the
hero panel.

- Orange dot: internal page
- Gray dot: file, note, or document
- Blue/teal dot: external destination

Implementation:
- Legend styles live in `/styles/sitemap-base.css`
- Card dot colors live in `/styles/sitemap-theme-bulletin.css`
- Card type classes are applied in `/sitemap.html`

Current classes:
- `sitemap-link--page`
- `sitemap-link--file`
- `sitemap-link--external`

## Section Trees
The "Section Trees" panel is a lightweight branch map, not a full filesystem dump.

Keep it high-level:
- `/` for root pages
- `/notes` for internal Markdown/reference material
- `/prism` for the main Prism section
- `/prism/team` for profile pages

Only add a new tree when it improves navigation clarity for humans.

## What Belongs On The Sitemap
Add links when a destination is one of these:
- a page reachable through the site or likely to be opened directly
- a maintenance document that humans or agents are expected to use
- a file that is intentionally opened from the browser
- an external destination that acts as the canonical target for a site section

Do not add:
- implementation-only scripts
- low-level assets
- every source file in the repo
- temporary scratch files unless they are intentionally part of maintenance workflow

## Update Checklist
When pages or major docs change, review `/sitemap.html` and update:
1. the relevant section link cards
2. the Section Trees summary if a branch meaning changed
3. the link type class if the destination changed from internal to external, or vice versa
4. this note if the maintenance rules changed

## Layout Notes
The sitemap uses:
- shared structural styles in `/styles/sitemap-base.css`
- the scrapbook visual treatment in `/styles/sitemap-theme-bulletin.css`

The bulletin theme uses `nth-child(...)` panel placement at larger breakpoints, so adding,
removing, or reordering major sections may require layout updates in that theme file.
