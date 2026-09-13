import Link from "next/link";
import { SiteShell, PageHeading } from "./site-elements";

export default function NotFound() {
  return <SiteShell><PageHeading title="Page not found">This address is no longer available. The WBS roster and blog archive are still here.</PageHeading><div className="primary-actions"><Link className="action-primary" href="/pros/">Our professionals</Link><Link className="action-secondary" href="/blogs/">All blogs</Link><Link href="/">Return home</Link></div></SiteShell>;
}
