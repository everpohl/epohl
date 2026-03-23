# Project Context

## Goal
Build a clear, welcoming, expressive Prism website with the full basic site structure finished by Wednesday, March 25, 2026, and with placeholder text mostly or entirely replaced by Friday, March 27, 2026, after the e-board provides final written content.

The site should:
- Explain what Prism is quickly
- Highlight events and ways to get involved
- Make LGBTQ+ support resources easy to find
- Introduce the leadership team
- Feel modern, bold, and approachable without hurting readability

## Current Status
- The Prism homepage exists at `prism/index.html`
- The About page exists at `prism/about.html`
- Shared styling is in `prism/styles/base.css` and `prism/styles/theme-default.css`
- Featured events are being pulled from local data files for now
- Leadership profiles are being rendered from shared team data
- The site structure is in place, but several sections still use placeholder or planning-style copy

## What Is Working
- Homepage layout and navigation
- About page layout and team structure
- Events rendering script
- Shared team data setup for leadership profiles
- Basic semantic structure and accessibility foundations

## What Still Needs Work
- Replace placeholder homepage copy with Prism-approved messaging
- Replace placeholder About copy with e-board-approved language
- Build and connect the remaining launch pages: blog homepage, blog post template, events page, resources page(s), contact page, and sitemap
- Confirm the final resource links and contact paths
- Review styling for consistency, spacing, and mobile polish
- Check all pages for accessibility details like link clarity, alt text, and heading flow
- Decide whether the current visual direction is the launch direction or whether any Tumblr-inspired experiment elements should be merged later

## Deadlines
- Wednesday, March 25, 2026: Website should be ready for review
- Friday, March 27, 2026: Website should be ready to launch

## Wednesday Review Target
By Wednesday, the full basic website structure should be finished. The layout, sections, navigation, and page flow should all be in place, even if some written content is still placeholder copy.

That means:
- Homepage layout is stable
- About page layout is stable
- Any launch pages that belong in the first version are created and linked
- E-board member pages are present and reachable
- Blog homepage and blog post template exist
- Events page exists
- Contact/connect page exists
- Sitemap page exists
- Resources section or starter resources pages exist, even if some deeper resource pages are still temporary
- Navigation and links work
- Events section feels realistic
- Resource section has real destinations or clear placeholders to swap
- Team section is structurally complete
- Major design decisions are settled enough to review
- Placeholder copy is allowed, but it should be intentional, presentable, and easy to replace
- A short list of missing copy from the e-board is clearly identified

## Friday Launch Target
By Friday, the site should be ready for public use.

That means:
- Final approved copy is inserted in nearly all or all launch-critical places
- The launch page set is live: home, about, e-board pages, blog homepage, blog post template, events, resources, connect/contact, and sitemap
- Contact information is confirmed
- Resource links are verified
- Event links are verified
- Pages are checked on desktop and mobile
- Basic accessibility pass is complete
- There should be very few placeholder sections left, ideally none on public-facing pages
- Any remaining unfinished sections should still read as active and usable, not abandoned
- Launch blockers are cleared

## Remaining Work Plan

### 1. Content Finalization
- Rewrite homepage copy so it sounds like Prism rather than a planning document
- Rewrite About page copy so it feels public-facing and complete
- Collect missing bios, blurbs, and contact wording from the e-board
- Confirm any official wording for advocacy, support, and organization description
- Where final text is still missing, use polished temporary copy instead of rough notes or drafting language

### 2. Information Architecture
- Confirm the core navigation for launch
- Build the launch navigation around the required page set
- Allow resources to launch in a semi-complete state if needed, as long as the section is usable and can grow over time
- Keep team member subpages live as part of the launch structure

### 3. Design Polish
- Tighten typography, spacing, and section hierarchy
- Make sure buttons and cards feel intentional and consistent
- Use the current design direction for main branch launch work
- Keep the Tumblr-inspired direction compatible where practical, but treat it as a separate branch experiment rather than the launch branch

### 4. Content Dependencies From E-Board
- Official short description of Prism
- Final leadership bios and titles
- Preferred contact info
- Final resource recommendations
- Any launch-day announcements, advocacy links, or featured events
- Initial blog and open-letter content details

### 5. QA and Launch Prep
- Test navigation links
- Test responsive layout
- Check color contrast and heading order
- Confirm images have alt text
- Do a final typo and clarity pass

## Decisions
- Use `context.md` for the working project plan and launch checklist
- Keep `agents.md` focused on agent behavior, coding guardrails, and design guidance
- Keep solutions simple and beginner-friendly
- Prioritize a reviewable, usable website over adding more features before launch
- Treat the Tumblr-inspired direction as an experiment unless the team explicitly wants it to become the launch version
- Build the main branch around the current design direction
- Keep Tumblr-branch compatibility in mind, but do not let the experiment block launch work
- Launch pages are: home, about, e-board member pages, blog homepage, blog post template, events page, resources page(s), connect/contact page, and sitemap
- Resources can be semi-complete at launch if they are usable, with deeper resource coverage added later
- Final launch decision-makers are Everett and Kylie
- The site will be published at `webpages.charlotte.edu/epohl`

## Constraints
- This is a real student organization website, not a demo
- The site needs to be understandable and usable for UNC Charlotte students and allies
- Accessibility matters and should not be traded away for style
- The launch timeline depends in part on e-board text arriving in time
- We should avoid unnecessary rewrites or framework changes right now
- Even if some sections are incomplete at launch, the live site should still feel trustworthy and usable
- The blog and open letter need the website to be live and functional even if some deeper content is still being filled in

## Immediate Next Steps
- Finish the full basic website structure for all launch pages before Wednesday
- Build the remaining required launch pages and connect them through navigation
- Replace planning-style copy on `prism/index.html` with more public-facing draft copy
- Replace planning-style copy on `prism/about.html` with more public-facing draft copy
- Make a short missing-content checklist for the e-board
- Do one visual polish pass before Wednesday review
- Do one QA pass before Friday launch

## Missing Content Checklist
- Final Prism mission blurb
- Final resource list and URLs
- Final contact email or preferred contact method
- Final leadership bios
- Any upcoming events that should be featured first

## Temporary Copy Standard
If final text is missing at review or launch time:
- Use short, polished placeholder language
- Make it clear that more information is coming soon
- Avoid exposing internal planning notes or drafting language
- Keep the page useful by giving visitors a next step when possible
- Favor wording that still supports the blog and open letter launch, even if deeper site content is still being finished

Examples:
- "More details about this section are coming soon."
- "We are updating this page with more Prism resources. Please check back soon."
- "The Prism blog is launching soon. Check back here for updates, stories, and announcements."
- "This page is still being expanded, but you can already connect with Prism through events, outreach, and campus support."

## Notes From ChatGPT
- Wednesday success means the structure is done, even if some copy is still placeholder
- Friday success means placeholder text is mostly or entirely gone from public-facing pages
- If some content is still unfinished at launch, it should still read as intentional and presentable
- The current site already has a solid foundation for a Wednesday review
- The biggest remaining risk is not layout or code, but getting final approved copy in time
- It is better to track project planning in `context.md` than in `agents.md`
- The next high-value step is to swap placeholder text for launch-quality draft copy

## Open Questions
- What exact wording does the e-board want for Prism's mission and tone?
- Which resources should be highlighted first on launch?
- Which event source should be treated as the primary source of truth at launch?
- Which pages must be fully usable for the blog and open letter launch, even if some deeper sections stay temporary?
