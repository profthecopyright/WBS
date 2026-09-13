import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedBlogPosts } from "../../blog-catalog";
import { ArticlePage } from "../../blog-pages";
import { blogDisplayTitle, blogStandfirst } from "../../blog-ui";

export function generateStaticParams() { return publishedBlogPosts.map((post) => ({slug: post.slug})); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{slug: string}> }): Promise<Metadata> {
  const slug = (await params).slug;
  const article = publishedBlogPosts.find((item) => item.slug === slug);
  return {title: article ? `${blogDisplayTitle(article)} | WBS Blogs` : "Article not found | WBS", description: article ? blogStandfirst(article) : undefined};
}
export default async function Page({ params }: { params: Promise<{slug: string}> }) {
  const slug = (await params).slug;
  const post = publishedBlogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return <ArticlePage post={post} />;
}
