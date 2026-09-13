# WBS Editorial Guide

This revision extends the original version 60 newspaper rather than replacing it. Front, Inside, Blogs, Community, the saloon doors, weather, portrait story, and three enquiry questionnaires remain.

## Professional Profiles

Edit biographies, short introductions, formats, approved portraits, and links in `app/profiles.ts`. Keep slugs stable so shared profile links continue to work.

`coreOrder` and `otherOrder` retain the existing Core Pros / Other Pros membership and order, with new affiliated professionals appended. Do not promote pending recruits without confirmation.

Profiles use links such as `#inside/pros/ed-zuckerberg`. The About guide uses `#inside/about`, and the original resources are accessible through `#inside/resources` as well as below the roster.

Portraits are bundled locally under `public/images/inside-gallery`. Missing portraits use initials, not photographs of unverified namesakes. See `profile-drafts.md` for pending recruits and image follow-ups.

## Blog Publication

Add submissions to `app/blog-posts.ts`, retaining stable slugs and chronological ordering. The existing blog display titles and bridge rendering helpers remain in `app/page.tsx`.

Keep Brian's voice. Correct typography and obvious typos, but do not invent missing cards, auction calls, results, links, or schedule information.

## Enquiries

The existing Tally questionnaires remain distinct: consultation with Brian, complimentary play after a bidding quiz, and general agent intake. The consultation inside Brian's expanded explanation opens the consultation questionnaire.

Professional enquiries open the existing agent intake. The dialog states the preferred professional and asks the visitor to include that name in additional details; the form has no configured preferred-professional hidden field, so the site does not claim the name is submitted automatically.

Do not restore sample testimonials, migrate hosting, or publish without the user's approval.
