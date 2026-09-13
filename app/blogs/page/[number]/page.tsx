import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexPage, blogPageCount } from "../../../blog-pages";
export function generateStaticParams() { return Array.from({length: blogPageCount}, (_, index) => ({number: String(index + 1)})); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{number: string}> }): Promise<Metadata> { return {title: `Blogs, Page ${(await params).number} | World Bridge Services`}; }
export default async function Page({ params }: { params: Promise<{number: string}> }) {
  const page = Number((await params).number);
  if (!Number.isInteger(page) || page < 1 || page > blogPageCount) notFound();
  return <BlogIndexPage page={page} />;
}
