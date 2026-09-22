import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";
import { sitePaths } from "./site-routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePaths().map((path) => ({ url: SITE_URL + path }));
}
