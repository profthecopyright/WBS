import { archivedBlogPosts, type ArchivedBlogPost } from "./blog-posts";
import { findPro, proProfiles, type ProProfile } from "./profiles";

export const BLOGS_PER_PAGE = 9;
export const BLOG_PAGE_COUNT = Math.ceil(archivedBlogPosts.length / BLOGS_PER_PAGE);

export type SitePage = {
  page: "services" | "pros" | "courses" | "blogs";
  path: string;
  blogPage: number;
  pro: ProProfile | null;
  post: ArchivedBlogPost | null;
};

export function resolvePage(path: string): SitePage | null {
  const parts = path.split("/").filter(Boolean);
  const [section, target, detail] = parts;
  const base = { blogPage: 1, pro: null, post: null };
  if (!section || (section === "services" && parts.length === 1)) {
    return { ...base, page: "services", path: "/" };
  }
  if (parts.length === 1 && ["pros", "courses", "blogs"].includes(section)) {
    return { ...base, page: section as SitePage["page"], path: `/${section}/` };
  }
  if (section === "pros" && parts.length === 2) {
    const pro = findPro(target);
    return pro ? { ...base, page: "pros", path: `/pros/${pro.slug}/`, pro } : null;
  }
  if (section === "blogs" && parts.length === 2) {
    const post = archivedBlogPosts.find((item) => item.slug === target);
    return post ? { ...base, page: "blogs", path: `/blogs/${post.slug}/`, post } : null;
  }
  if (section === "blogs" && target === "page" && parts.length === 3 && /^[1-9]\d*$/.test(detail)) {
    const blogPage = Number(detail);
    if (blogPage <= BLOG_PAGE_COUNT) {
      return { ...base, page: "blogs", blogPage, path: blogPage === 1 ? "/blogs/" : `/blogs/page/${blogPage}/` };
    }
  }
  return null;
}

export function sitePaths() {
  return [
    "/", "/pros/", "/courses/", "/blogs/",
    ...proProfiles.map((pro) => `/pros/${pro.slug}/`),
    ...archivedBlogPosts.map((post) => `/blogs/${post.slug}/`),
    ...Array.from({ length: BLOG_PAGE_COUNT - 1 }, (_, index) => `/blogs/page/${index + 2}/`),
  ];
}

// Keep previously published hash links working without treating article anchors as routes.
export function legacyHashPath(hash: string) {
  const [requestedHash, target, detail] = hash.replace(/^#/, "").split("/");
  const requested = requestedHash === "inside"
    ? target === "about" ? "services" : target === "resources" ? "courses" : "pros"
    : requestedHash === "front" || requestedHash === "a3" ? "services"
    : requestedHash === "lessons" ? "courses"
    : requestedHash === "blog" ? "blogs" : requestedHash;
  if (!["services", "pros", "courses", "blogs"].includes(requested)) return null;
  if (requested === "pros") {
    const pro = findPro(requestedHash === "inside" ? detail : target);
    return pro ? `/pros/${pro.slug}/` : "/pros/";
  }
  if (requested === "blogs") {
    const path = target && target !== "archive"
      ? `/blogs/${target}/${detail ? `${detail}/` : ""}` : "/blogs/";
    return resolvePage(path)?.path ?? "/blogs/";
  }
  return `/${requested}/`;
}
