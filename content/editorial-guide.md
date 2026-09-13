# WBS Editorial Guide

This revision retains the original newspaper styling, saloon doors, weather, portrait story, and three enquiry questionnaires. The four main sections are Bridge Services, Our Pros, Lessons & Courses, and Blogs. Community and its sample stories are removed at the user's request.

## Site Structure

`#services` explains the agency's business, provides the three enquiry choices, and contains the About WBS background. `#pros` contains the Core Pros / Other Pros roster and full biographies. `#lessons` contains private instruction, group teaching, the developing online program, and Aloha Bridge Center information. `#blogs` retains the complete archive and article navigation.

Use these same four navigation links on the entrance and every section. Do not add a second row of Meet Our Pros / Blogs / About WBS links. Legacy `#front`, `#inside`, `#inside/about`, `#inside/resources`, and profile links remain compatible; `#a3` now leads to Services rather than sample news.

Edit teaching copy in `TeachingProgram` in `app/page.tsx`. Confirm actual course topics, schedules, prices, and registration details before announcing them. Do not present proposed classes as scheduled events.

## Professional Profiles

Edit biographies, short introductions, formats, approved portraits, and links in `app/profiles.ts`. Keep slugs stable so shared profile links continue to work.

`coreOrder` and `otherOrder` retain the existing Core Pros / Other Pros membership and order, with new affiliated professionals appended. Do not promote pending recruits without confirmation.

Profiles use links such as `#pros/ed-zuckerberg`. Old `#inside/pros/ed-zuckerberg` links redirect to the same profile. Instructional System Notes are linked from Lessons & Courses, and Brian's external author page is linked from his biography.

Portraits are bundled locally under `public/images/inside-gallery`. Missing portraits use initials, not photographs of unverified namesakes. See `profile-drafts.md` for pending recruits and image follow-ups.

## Blog Publication

Add submissions to `app/blog-posts.ts`, retaining stable slugs and chronological ordering. The existing blog display titles and bridge rendering helpers remain in `app/page.tsx`.

Keep Brian's voice. Correct typography and obvious typos, but do not invent missing cards, auction calls, results, links, or schedule information.

## Enquiries

The existing Tally questionnaires remain distinct: consultation with Brian, complimentary play after a bidding quiz, and general agent intake. The consultation inside Brian's expanded explanation opens the consultation questionnaire.

Professional enquiries open the existing agent intake. The dialog states the preferred professional and asks the visitor to include that name in additional details; the form has no configured preferred-professional hidden field, so the site does not claim the name is submitted automatically.

Do not restore sample testimonials, migrate hosting, or publish without the user's approval.
