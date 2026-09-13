import { archivedBlogPosts } from "./blog-posts";

export const publishedBlogPosts = [...archivedBlogPosts].sort((a, b) => b.date.localeCompare(a.date));
