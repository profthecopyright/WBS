import type { Metadata } from "next";
import { editorialBlogTitles } from "./blog-titles";
import { resolvePage, type SitePage } from "./site-routes";

export const SITE_URL = "https://worldbridge.services";
export const SITE_NAME = "World Bridge Services";
export const SITE_DESCRIPTION = "Professional bridge partners for club games and tournaments, bridge lessons, and coaching. Meet the WBS network led by five-time national champion Brian Glubok.";

function articleAuthors(author: string) {
  return author.split(" and ").map((name) => ({
    "@type": "Person", name,
    ...(name === "Brian Glubok" ? { url: SITE_URL + "/pros/brian-glubok/" } : {}),
  }));
}

function pageDetails(page: SitePage) {
  if (page.pro) return { title: `${page.pro.name} | ${SITE_NAME}`, description: page.pro.introduction };
  if (page.post) return {
    title: `${editorialBlogTitles[page.post.slug] ?? page.post.title} | ${SITE_NAME}`,
    description: page.post.excerpt.replace(/\s+/g, " ").trim().slice(0, 180),
  };
  if (page.page === "pros") return {
    title: `Our Pros | ${SITE_NAME}`,
    description: "Meet WBS's professional bridge partners and teachers, including Brian Glubok, Bob Hamman, Joe Grue, Gregor Rus, and Paulo Brum.",
  };
  if (page.page === "courses") return {
    title: `Bridge Courses & Lessons | ${SITE_NAME}`,
    description: "Explore WBS bridge teaching opportunities with Ed Zuckerberg online and Aloha Bridge Center in Columbus, Ohio. Contact WBS for current arrangements.",
  };
  if (page.page === "blogs") return {
    title: `Bridge Blogs${page.blogPage > 1 ? ` - Page ${page.blogPage}` : ""} | ${SITE_NAME}`,
    description: "Diary of a Bridge Pro by Brian Glubok: bridge deals, bidding, tournament reports, and life around the bridge table.",
  };
  return { title: `${SITE_NAME} | Bridge Partners, Lessons & Coaching`, description: SITE_DESCRIPTION };
}

export function pageMetadata(path: string): Metadata {
  const page = resolvePage(path);
  if (!page) return { title: "Page Not Found", robots: { index: false, follow: true } };
  const details = pageDetails(page);
  return {
    ...details,
    alternates: { canonical: SITE_URL + page.path },
    openGraph: {
      ...details,
      url: SITE_URL + page.path,
      siteName: SITE_NAME,
      locale: "en_US",
      ...(page.post ? {
        type: "article",
        publishedTime: page.post.date,
        authors: articleAuthors(page.post.author).map((author) => author.url ?? author.name),
      } : { type: "website" }),
    },
    twitter: { card: "summary", ...details },
  };
}

export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  }} />;
}

export function OrganizationStructuredData() {
  return <StructuredData data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": SITE_URL + "/#organization",
        name: SITE_NAME, alternateName: "WBS", url: SITE_URL + "/",
        description: SITE_DESCRIPTION,
        founder: { "@type": "Person", name: "Brian Glubok", url: SITE_URL + "/pros/brian-glubok/" },
      },
      {
        "@type": "WebSite", "@id": SITE_URL + "/#website",
        name: SITE_NAME, alternateName: "WBS", url: SITE_URL + "/",
        publisher: { "@id": SITE_URL + "/#organization" }, inLanguage: "en",
      },
    ],
  }} />;
}

export function PageStructuredData({ path }: { path: string }) {
  const page = resolvePage(path);
  if (!page) return null;
  const { title, description } = pageDetails(page);
  const url = SITE_URL + page.path;
  const graph: object[] = [{
    "@type": page.pro ? "ProfilePage" : page.post ? "WebPage" : page.page === "services" ? "WebPage" : "CollectionPage",
    "@id": url + "#webpage", url, name: title, description,
    isPartOf: { "@id": SITE_URL + "/#website" },
    ...(page.pro ? { mainEntity: {
      "@type": "Person", name: page.pro.name, url,
      description: page.pro.introduction,
      ...(page.pro.image ? { image: SITE_URL + page.pro.image } : {}),
    } } : {}),
  }];
  if (page.post) graph.push({
    "@type": "BlogPosting", "@id": url + "#article", url,
    mainEntityOfPage: { "@id": url + "#webpage" },
    headline: editorialBlogTitles[page.post.slug] ?? page.post.title,
    description, datePublished: page.post.date, inLanguage: "en",
    author: articleAuthors(page.post.author),
    publisher: { "@id": SITE_URL + "/#organization" },
  });
  if (page.page !== "services") {
    const items = [
      { name: "Home", item: SITE_URL + "/" },
      { name: page.page === "pros" ? "Our Pros" : page.page === "courses" ? "Courses" : "Blogs", item: SITE_URL + `/${page.page}/` },
    ];
    if (page.pro || page.post || page.blogPage > 1) items.push({ name: title.replace(` | ${SITE_NAME}`, ""), item: url });
    graph.push({ "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, ...item,
    })) });
  }
  return <StructuredData data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
