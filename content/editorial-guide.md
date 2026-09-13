# WBS editorial guide

## Professional profiles

Edit `app/profiles.ts`. Each published professional has one record containing a stable slug, display name, introduction, full biography, highlights, playing or teaching formats, optional agency role, and optional links. The directory and profile pages use that same record. Keep slugs stable so existing links continue to work.

Place authorized portrait files in `public/images/inside-gallery/` and set the record's image path. Without an image, the site uses the person's initials, not a fabricated portrait.

Check a professional's approval, biography, photo permission, and availability before adding a published record. Keith and Shannon's pending drafts are kept separately in `content/profile-drafts.md`; they have no public profile routes.

## Blogs

Add or update records in `app/blog-posts.ts`. Keep author, title, ISO date, stable slug, excerpt, and full body in each record. The catalog sorts by publication date automatically. Equal-date articles preserve their source order.

Use normal paragraphs separated by one blank line. Put a URL in the text where it belongs; the reader makes it clickable. Do not add an editorial placeholder, duplicate the article title in the body, or insert a source-publication disclaimer.

Editorial titles for imported diary entries and the bridge-report renderer live in `app/blog-ui.tsx`. Normal articles do not need a special renderer. The archive reads the same catalog as the index.

## Lessons and booking

Update services, lessons, and agency information in `app/site-pages.tsx`. Only advertise a weekly class when its launch, schedule, price, and booking arrangements are confirmed. The website currently refers class enquiries to WBS rather than promising an unconfirmed timetable.

The main enquiry route embeds the existing WBS Tally intake form. Its fields and delivery settings are managed in Tally, not in the website. A preferred professional is shown above the form; the visitor is explicitly asked to include that preference in the message because the existing form has no configured professional hidden field.

The optional Brian consultation and complimentary-play forms remain linked in the footer.

## Existing links

The homepage recognizes old `#inside`, `#blogs`, `#blogs/page/N`, and `#blogs/SLUG` addresses and takes visitors to the equivalent new pages. There is no entrance gate on the homepage or shared links.
