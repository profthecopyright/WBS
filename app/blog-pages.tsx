import Link from "next/link";
import { SiteShell } from "./site-elements";
import { publishedBlogPosts } from "./blog-catalog";
import type { ArchivedBlogPost } from "./blog-posts";
import { BlogBody, BLOGS_PER_PAGE, blogDisplayTitle, blogStandfirst, blogHref, blogPageHref, formatBlogDate } from "./blog-ui";

export const blogPageCount = Math.ceil(publishedBlogPosts.length / BLOGS_PER_PAGE);

function Chevron({ href, direction, label }: { href?: string; direction: "<" | ">"; label: string }) {
  return href ? <Link href={href} aria-label={label} title={label}><span aria-hidden="true">{direction}</span></Link> : <span aria-disabled="true"><span aria-hidden="true">{direction}</span></span>;
}

function BlogToolbar({ page, article }: { page: number; article?: ArchivedBlogPost }) {
  const index = article ? publishedBlogPosts.findIndex((post) => post.slug === article.slug) : -1;
  const newer = index > 0 ? publishedBlogPosts[index - 1] : undefined;
  const older = index >= 0 ? publishedBlogPosts[index + 1] : undefined;
  return <nav className="blogs-toolbar" aria-label={article ? "Article navigation" : "Blog pages"}>
    <div className="blogs-toolbar-group"><Link className="blogs-all-posts" href={blogPageHref(page)}>All blogs</Link><div className="blogs-chevron-nav">
      <Chevron direction="<" href={article ? (newer ? blogHref(newer) : undefined) : (page > 1 ? blogPageHref(page - 1) : undefined)} label={article ? `Newer article${newer ? `: ${blogDisplayTitle(newer)}` : ""}` : "Previous page"} />
      {!article && <span className="blogs-page-status">Page {page} of {blogPageCount}</span>}
      <Chevron direction=">" href={article ? (older ? blogHref(older) : undefined) : (page < blogPageCount ? blogPageHref(page + 1) : undefined)} label={article ? `Older article${older ? `: ${blogDisplayTitle(older)}` : ""}` : "Next page"} />
    </div></div>
  </nav>;
}

export function BlogIndexPage({ page = 1 }: { page?: number }) {
  const posts = publishedBlogPosts.slice((page - 1) * BLOGS_PER_PAGE, page * BLOGS_PER_PAGE);
  return <SiteShell active="blogs"><header className="blog-index-heading"><h1>Blogs</h1><Link href="/blogs/archive/">Archive</Link></header><BlogToolbar page={page} />
    <div className="blogs-post-grid">{posts.map((post) => <Link className="journal-item" href={blogHref(post)} key={post.slug}><h2>{blogDisplayTitle(post)}</h2><p>{blogStandfirst(post)}</p><span>{post.author} <span aria-hidden="true">/</span> <time dateTime={post.date}>{formatBlogDate(post.date)}</time></span></Link>)}</div>
    <section className="journal-writers"><h2>Paulo's Bridge Studio</h2><a href="https://bridgestudio.substack.com/" target="_blank" rel="noopener noreferrer">Declarer play and defense with Paulo Brum <span aria-hidden="true">&gt;</span></a></section>
  </SiteShell>;
}

export function ArticlePage({ post }: { post: ArchivedBlogPost }) {
  const index = publishedBlogPosts.findIndex((item) => item.slug === post.slug);
  const page = Math.floor(index / BLOGS_PER_PAGE) + 1;
  return <SiteShell active="blogs"><div className="article-navigation"><BlogToolbar article={post} page={page} /></div><article className="blog-reader"><header><h1>{blogDisplayTitle(post)}</h1><p className="blog-article-byline">{post.author} <span aria-hidden="true">/</span> <time dateTime={post.date}>{formatBlogDate(post.date)}</time></p></header><BlogBody post={post} /></article></SiteShell>;
}
