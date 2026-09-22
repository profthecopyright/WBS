import Newspaper from "./newspaper";
import { pageMetadata, PageStructuredData } from "./seo";

export const metadata = pageMetadata("/");

export default function HomePage() {
  return <><PageStructuredData path="/" /><Newspaper /></>;
}
