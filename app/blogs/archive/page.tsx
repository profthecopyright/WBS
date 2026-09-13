import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell, PageHeading } from "../../site-elements";
import { BlogArchive } from "../../blog-archive";
import { publishedBlogPosts } from "../../blog-catalog";
import { blogDisplayTitle } from "../../blog-ui";
export const metadata: Metadata = {title: "Blog Archive | World Bridge Services", description: "Browse WBS blogs by year, author, and title."};
export default function Page() {
  const posts = publishedBlogPosts.map((post) => ({slug: post.slug, title: blogDisplayTitle(post), author: post.author, date: post.date, displayDate: new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric"}).format(new Date(`${post.date}T12:00:00`))}));
  return <SiteShell active="blogs"><PageHeading title="Blog Archive" /><nav className="page-back" aria-label="Blog navigation"><Link href="/blogs/">&lt; All blogs</Link></nav><BlogArchive posts={posts} /></SiteShell>;
}
