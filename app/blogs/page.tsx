import type { Metadata } from "next";
import { BlogIndexPage } from "../blog-pages";
export const metadata: Metadata = {title: "Blogs | World Bridge Services", description: "Bridge ideas, tournament dispatches, and life around the table from WBS writers."};
export default function Page() { return <BlogIndexPage />; }
