# WBS Editorial Guide

This revision retains the original newspaper styling, saloon doors, weather, and three enquiry questionnaires. The four main sections are Home, Our Pros, Courses, and Blogs. Community and its sample stories are removed at the user's request.

## Site Structure

Home retains `#services` for compatibility. It explains the agency's business and provides the three enquiry choices. `#pros` contains the Core Pros / Other Pros roster and full biographies, without a separate Circle heading, subtitle, or professional counts. `#courses` contains only Ed Zuckerberg's online program and Aloha Bridge Center information, plus the course enquiry action. `#blogs` retains the complete archive and article navigation.

Home follows the hero offer, six compact FAQ rows, then the three contact choices. The five WH questions and the How question start closed. Each question opens or closes independently on click or keyboard activation. Answers are complete prose paragraphs, without subtitles or tables. Edit the questions and answers in `serviceGuideTopics` in `app/page.tsx`.

Talk with Brian remains the first choice, using the same understated styling as the other two actions, without a filled red button. Brian's full championship record and portrait remain in his profile. The founding story and his explanation of playing with a professional are integrated into the FAQ; there is no separate Home portrait or essay. Do not add separate credentials, booking, or repeated agency-description bands between the hero, FAQ, and actions.

Keep the introduction focused on the agency and its leadership, not internal job descriptions. The founding history includes Brian and Hongbo forming a business partnership after meeting on the final day of the 2026 Minneapolis Nationals. Hongbo's background is software and biomedical engineering, startup leadership, and the St. Louis 0-10K Swiss Teams result; do not replace it with a university-focused introduction.

Use these same four navigation links on the entrance and every section. Do not add a second row of Meet Our Pros / Blogs / About WBS links. Legacy `#front`, `#inside`, `#inside/about`, `#inside/resources`, `#lessons`, and profile links remain compatible; `#a3` now leads to Services rather than sample news.

Edit teaching copy in `TeachingProgram` in `app/page.tsx`. Confirm actual course topics, schedules, prices, and registration details before announcing them. Do not present proposed classes as scheduled events.

## Professional Profiles

Edit biographies, short introductions, formats, approved portraits, and links in `app/profiles.ts`. Keep slugs stable so shared profile links continue to work.

`coreOrder` and `otherOrder` retain the existing Core Pros / Other Pros membership and order, with new affiliated professionals appended. Do not promote pending recruits without confirmation.

Profiles use links such as `#pros/ed-zuckerberg`. Old `#inside/pros/ed-zuckerberg` links redirect to the same profile. Brian's external author page is linked from his biography. The previous System Notes resource at `https://www.wilsonovichbridge.com/instructional.html` is kept here for future editorial use, not displayed in Courses.

Portraits are bundled locally under `public/images/inside-gallery`. Missing portraits use initials, not photographs of unverified namesakes. See `profile-drafts.md` for pending recruits and image follow-ups.

## Blog Publication

Add submissions to `app/blog-posts.ts`, retaining stable slugs and chronological ordering. The existing blog display titles and bridge rendering helpers remain in `app/page.tsx`.

Keep Brian's voice. Correct typography and obvious typos, but do not invent missing cards, auction calls, results, links, or schedule information.

## Enquiries

The existing Tally questionnaires remain distinct: consultation with Brian, complimentary play after a bidding quiz, and general agent intake. Talk with Brian is the primary Home action and opens the personal consultation questionnaire.

Professional enquiries open the existing agent intake. The dialog states the preferred professional and asks the visitor to include that name in additional details; the form has no configured preferred-professional hidden field, so the site does not claim the name is submitted automatically.

Do not restore sample testimonials, migrate hosting, or publish without the user's approval.
