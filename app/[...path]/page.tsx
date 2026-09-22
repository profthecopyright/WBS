import { notFound } from "next/navigation";
import Newspaper from "../newspaper";
import { resolvePage, sitePaths } from "../site-routes";
import { pageMetadata, PageStructuredData } from "../seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...sitePaths().filter((path) => path !== "/"), "/services/", "/pros/sam-hwang/", "/blogs/page/1/"]
    .map((path) => ({ path: path.split("/").filter(Boolean) }));
}

type Props = { params: Promise<{ path: string[] }> };

export async function generateMetadata({ params }: Props) {
  return pageMetadata("/" + (await params).path.join("/") + "/");
}

export default async function SitePage({ params }: Props) {
  const path = "/" + (await params).path.join("/") + "/";
  if (!resolvePage(path)) notFound();
  return <><PageStructuredData path={path} /><Newspaper key={path} initialPath={path} /></>;
}
