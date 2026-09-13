import Link from "next/link";
import type { ReactNode } from "react";
import type { ProProfile } from "./profiles";

export type SiteSection = "home" | "pros" | "services" | "lessons" | "blogs" | "about" | "request";

const navigation: { id: SiteSection; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "pros", label: "Our Pros", href: "/pros/" },
  { id: "services", label: "Services", href: "/services/" },
  { id: "lessons", label: "Lessons", href: "/lessons/" },
  { id: "blogs", label: "Blogs", href: "/blogs/" },
  { id: "about", label: "About", href: "/about/" }
];

export function SiteShell({ active, children }: { active?: SiteSection; children: ReactNode }) {
  return <div className="wbs-site">
    <a className="skip-link" href="#content">Skip to content</a>
    <header className="site-masthead">
      <Link className="site-name" href="/" aria-label="World Bridge Services home">World Bridge Services</Link>
      <p>Professional bridge partnerships &amp; instruction</p>
    </header>
    <nav className="site-navigation" aria-label="Main navigation">
      <div className="site-navigation-inner">
        <div className="site-navigation-links">{navigation.map((item) => <Link key={item.id} href={item.href} aria-current={active === item.id ? "page" : undefined}>{item.label}</Link>)}</div>
        <Link className="request-link" href="/request/" aria-current={active === "request" ? "page" : undefined}>Request a Pro</Link>
      </div>
    </nav>
    <main className="site-main" id="content">{children}</main>
    <footer className="site-footer">
      <div><Link className="footer-name" href="/">World Bridge Services</Link><p>Professional partners and teachers.<br />Online and at the table.</p></div>
      <nav aria-label="Footer navigation"><Link href="/request/">Contact WBS</Link><Link href="/about/">Our story</Link><Link href="/blogs/archive/">Blog archive</Link></nav>
      <nav aria-label="More from WBS"><a href="https://tally.so/r/RG11B9" target="_blank" rel="noopener noreferrer">Talk with Brian</a><a href="https://tally.so/r/D499lZ" target="_blank" rel="noopener noreferrer">Complimentary play</a><a href="https://www.wilsonovichbridge.com/instructional.html" target="_blank" rel="noopener noreferrer">System notes</a></nav>
      <p className="footer-note">Availability and fees are confirmed individually before any booking.</p>
    </footer>
  </div>;
}

export function ProPhoto({ pro, priority = false }: { pro: ProProfile; priority?: boolean }) {
  return pro.image ? <img className="profile-photo" src={pro.image} alt={pro.name} loading={priority ? "eager" : "lazy"} style={{ objectPosition: pro.imagePosition ?? "center 35%" }} /> : <div className="profile-initials" aria-label={pro.name}><span aria-hidden="true">{pro.initials}</span></div>;
}

export function ProCard({ pro, compact = false }: { pro: ProProfile; compact?: boolean }) {
  return <Link className={`roster-item${compact ? " roster-item-compact" : ""}`} href={`/pros/${pro.slug}/`}>
    <ProPhoto pro={pro} />
    <div><h3>{pro.name}</h3><p className="roster-specialty">{pro.specialty}</p>{!compact && <p className="roster-introduction">{pro.introduction}</p>}</div>
  </Link>;
}

export function PageHeading({ title, children }: { title: string; children?: ReactNode }) {
  return <header className="page-heading"><h1>{title}</h1>{children && <p>{children}</p>}</header>;
}

export function BookingSteps() {
  return <ol className="booking-steps">
    <li><span aria-hidden="true">01</span><div><h3>Tell us your plans</h3><p>Your experience, playing goals, dates, and location.</p></div></li>
    <li><span aria-hidden="true">02</span><div><h3>Find the right partnership</h3><p>We discuss suitable professionals and the support you want.</p></div></li>
    <li><span aria-hidden="true">03</span><div><h3>Confirm and play</h3><p>Agree on availability, fees, and arrangements before booking.</p></div></li>
  </ol>;
}
