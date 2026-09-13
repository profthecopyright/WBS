import Link from "next/link";
import { SiteShell, PageHeading, ProCard, ProPhoto, BookingSteps } from "./site-elements";
import { proProfiles, requestHref, type ProProfile } from "./profiles";
import { RosterDirectory } from "./roster-directory";
import { LegacyRoutes } from "./legacy-routes";
import { publishedBlogPosts } from "./blog-catalog";
import { blogDisplayTitle, blogStandfirst, formatBlogDate } from "./blog-ui";

export const services = [
  {id: "online", title: "Online play", text: "A professional partner for your BBO games or another preferred bridge platform, with coaching and deal review available.", detail: "Build a regular partnership, prepare for an event, or enjoy a session with an experienced player. Scheduling accounts for your time zone and the professional's availability."},
  {id: "tournaments", title: "Tournament partnerships", text: "Professional partners and teams for regional, national, and international events.", detail: "Tell us the event, dates, format, and what you want to achieve. WBS can help coordinate the partnership, preparation, and a broader team arrangement when needed."},
  {id: "club", title: "Club play", text: "Play with a professional at your local duplicate club and build confidence at the table.", detail: "Our professionals work in New York, California, Ohio, Florida, and elsewhere. Ask about a club, a date, or a recurring partnership; in-person arrangements depend on location."},
  {id: "coaching", title: "Coaching & hand analysis", text: "Work on your partnership methods, bidding decisions, declarer play, or defense.", detail: "A coach can review your recent deals, help you prepare for competition, or work with you and your regular partner. Written hand analysis can be arranged as part of your support."}
];

export function HomePage() {
  return <SiteShell active="home"><LegacyRoutes />
    <section className="home-opening">
      <h1>Professional Bridge Partners &amp; Lessons</h1>
      <p className="home-introduction">We match bridge players with professional partners and teachers, online and at clubs and tournaments worldwide.</p>
      <div className="primary-actions"><Link className="action-primary" href="/request/">Request a Pro</Link><Link className="action-secondary" href="/pros/">Meet Our Pros</Link></div>
      <p className="home-founder">Founded by five-time national champion Brian Glubok.</p>
    </section>
    <section className="home-paths" aria-label="Play, learn, and read">
      <Link href="/services/"><h2>Play with a professional</h2><p>Online games, club sessions, and tournaments.</p><span>Playing services <span aria-hidden="true">&gt;</span></span></Link>
      <Link href="/lessons/"><h2>Learn with a teacher</h2><p>Private coaching and instruction for your level.</p><span>Lessons &amp; coaching <span aria-hidden="true">&gt;</span></span></Link>
      <Link href="/blogs/"><h2>Read the blogs</h2><p>Bridge ideas, tournament stories, and life at the table.</p><span>WBS blogs <span aria-hidden="true">&gt;</span></span></Link>
    </section>
    <section className="site-section">
      <div className="section-heading"><h2>Meet your next partner</h2><Link href="/pros/">All professionals <span aria-hidden="true">&gt;</span></Link></div>
      <div className="home-roster">{proProfiles.slice(0, 6).map((pro) => <ProCard compact pro={pro} key={pro.slug} />)}</div>
    </section>
    <section className="site-section"><div className="section-heading"><h2>How WBS works</h2><Link href="/request/">Discuss your plans <span aria-hidden="true">&gt;</span></Link></div><BookingSteps /></section>
    <section className="site-section">
      <div className="section-heading"><h2>From the WBS Saloon</h2><Link href="/blogs/">All blogs <span aria-hidden="true">&gt;</span></Link></div>
      <div className="home-blog-grid">{publishedBlogPosts.slice(0, 3).map((post) => <Link href={`/blogs/${post.slug}/`} key={post.slug} className="journal-item"><h3>{blogDisplayTitle(post)}</h3><p>{blogStandfirst(post)}</p><span>{post.author} <span aria-hidden="true">/</span> <time dateTime={post.date}>{formatBlogDate(post.date)}</time></span></Link>)}</div>
    </section>
    <section className="site-section home-story"><h2>A bridge agency, built by bridge players</h2><p>Brian started WBS when demand for his own playing services exceeded the time he had available. Today, the agency brings together trusted professionals and teachers, with personal attention to each client's goals.</p><Link href="/about/">The WBS story <span aria-hidden="true">&gt;</span></Link></section>
  </SiteShell>;
}

export function ProsPage() {
  return <SiteShell active="pros"><PageHeading title="Our Professionals">World champions, experienced teachers, and trusted playing partners. Find someone for your game, or ask WBS to help you choose.</PageHeading><RosterDirectory /><div className="directory-booking"><h2>Not sure who to choose?</h2><p>Tell us your level, goals, and dates. We will discuss a suitable partnership and confirm availability before booking.</p><Link className="action-primary" href="/request/">Find a professional with WBS</Link></div></SiteShell>;
}

export function ProfilePage({ pro }: { pro: ProProfile }) {
  return <SiteShell active="pros"><nav className="page-back" aria-label="Profile navigation"><Link href="/pros/">&lt; All professionals</Link></nav>
    <article className="professional-profile">
      <header className="profile-header"><div className="profile-image"><ProPhoto pro={pro} priority />{pro.slug === "ljudmila-kamenova" && <small>Portrait: Archives of the Mathematisches Forschungsinstitut Oberwolfach</small>}</div><div><p className="profile-specialty">{pro.specialty}</p><h1>{pro.name}</h1><p className="profile-lead">{pro.introduction}</p><p className="profile-location">{pro.location}{pro.agencyRole && <> <span aria-hidden="true">/</span> {pro.agencyRole}</>}</p><Link className="action-primary" href={requestHref(pro)}>Enquire about {pro.name.split(" ")[0]}</Link></div></header>
      <div className="profile-layout"><div className="profile-prose">{pro.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{pro.links && <nav className="profile-links" aria-label={`More from ${pro.name}`}>{pro.links.map((link) => <a key={link.href} href={link.href} {...(link.href.startsWith("https:") ? {target: "_blank", rel: "noopener noreferrer"} : {})}>{link.label} <span aria-hidden="true">&gt;</span></a>)}</nav>}</div><aside className="profile-facts"><h2>Highlights</h2><ul>{pro.highlights.map((item) => <li key={item}>{item}</li>)}</ul><h2>Play &amp; learn</h2><ul>{pro.formats.map((format) => <li key={format}>{format}</li>)}</ul><p className="profile-availability">{pro.availability ?? "Playing dates and teaching arrangements are confirmed individually by WBS."}</p></aside></div>
    </article>
  </SiteShell>;
}

export function ServicesPage() {
  return <SiteShell active="services"><PageHeading title="Playing & Coaching Services">A professional partnership for the way you want to play, with preparation and instruction when you need it.</PageHeading>
    <div className="services-list">{services.map((service) => <section id={service.id} className="service-row" key={service.id}><h2>{service.title}</h2><div><p className="service-lead">{service.text}</p><p>{service.detail}</p><Link href={requestHref(undefined, service.id)}>Enquire about {service.title.toLowerCase()} <span aria-hidden="true">&gt;</span></Link></div></section>)}</div>
    <section className="site-section"><div className="section-heading"><h2>One agency, a personal arrangement</h2></div><BookingSteps /><p className="section-note">WBS coordinates professional partnerships. Fees, travel, preparation, and the scope of instruction are discussed before you commit.</p></section>
    <section className="text-band"><h2>Looking for instruction?</h2><p>Private lessons, partnership coaching, and small-group teaching are available.</p><Link href="/lessons/">Explore lessons <span aria-hidden="true">&gt;</span></Link></section>
  </SiteShell>;
}

export function LessonsPage() {
  const teachers = ["paulo-brum", "gregor-rus", "ed-zuckerberg", "jackie-thomas", "alex-kolesnik", "hongbo-li"].map((slug) => proProfiles.find((pro) => pro.slug === slug)!);
  return <SiteShell active="lessons"><PageHeading title="Lessons & Coaching">Learn at your level, from teachers who understand both the game and the people playing it.</PageHeading>
    <div className="lesson-options"><section><h2>Private instruction</h2><p>Work one to one on bidding, declarer play, defense, or the basics. Sessions can take place online through Zoom, BBO, or RealBridge, with the platform agreed with your teacher.</p><Link href={requestHref(undefined, "private-lessons")}>Arrange a private lesson <span aria-hidden="true">&gt;</span></Link></section><section><h2>Partnership coaching</h2><p>Study with your regular partner, review recent deals, and develop methods you both understand. Coaching can also support preparation for an upcoming tournament.</p><Link href={requestHref(undefined, "partnership-coaching")}>Find a partnership coach <span aria-hidden="true">&gt;</span></Link></section><section><h2>Small groups & classes</h2><p>Instruction for players learning together, including novice and developing players. Contact WBS for current group arrangements and the online class schedule.</p><Link href={requestHref(undefined, "classes")}>Ask about current classes <span aria-hidden="true">&gt;</span></Link></section></div>
    <section className="site-section"><div className="section-heading"><h2>Meet the teachers</h2><Link href="/pros/">All professionals <span aria-hidden="true">&gt;</span></Link></div><div className="teacher-grid">{teachers.map((pro) => <ProCard pro={pro} compact key={pro.slug} />)}</div></section>
    <section className="text-band"><h2>Start with your goals</h2><p>You do not need to choose a teacher first. Tell WBS what you want to learn, your experience, and the times that suit you.</p><Link className="action-primary" href={requestHref(undefined, "lessons")}>Discuss lessons with WBS</Link></section>
  </SiteShell>;
}

export function AboutPage() {
  return <SiteShell active="about"><PageHeading title="About World Bridge Services">A professional bridge agency founded by Brian Glubok, with personal partnerships at the heart of its work.</PageHeading>
    <div className="about-layout"><div className="about-prose">
      <section id="what"><h2>What we do</h2><p>WBS pairs clients with professional bridge players and teachers. Our work includes online partnerships, club games, regional and national tournaments, private coaching, and small-group instruction.</p><p>We help you discuss the right professional, the services you want, and the practical arrangements. You can ask about a particular player or let us help you find a match.</p></section>
      <section id="who"><h2>Who we are</h2><p>Our roster brings together world champions, international players, experienced teachers, and professionals who enjoy working with developing players. Many also have distinguished academic careers.</p><p>Brian leads the agency, Paulo Brum coordinates professional scheduling, and Hongbo Li supports its operations and technology. Ed Zuckerberg helps develop online teaching, and Jackie Thomas contributes to outreach and the WBS tournament booth.</p><Link href="/pros/">Meet the full roster <span aria-hidden="true">&gt;</span></Link></section>
      <section id="when"><h2>How WBS began</h2><p>In 2020, Brian found that demand for his online playing services exceeded the sessions he could cover himself. He asked trusted bridge colleagues, including Alex Kolesnik, Joe Grue, and Ron Smith, to take some partnerships under his supervision.</p><p>Brian continued to coach the clients and oversee the operation. Paulo joined in 2023 and helped develop the agency. The introduction of the WBS booth at the Minneapolis Nationals in July 2026 marked another step in its growth.</p></section>
      <section id="where"><h2>Where we work</h2><p>Online across time zones, and in person wherever a suitable professional can be arranged. WBS professionals are based in the United States and Europe and travel on the international tournament circuit.</p><p>Whether your plans involve a local club or a championship overseas, contact us to discuss the event and available partners.</p></section>
      <section id="why"><h2>Why we do it</h2><p>WBS is a commercial agency: clients need dependable professional services, and professionals benefit from the support of an organized booking operation. Our ambition is to serve both well and build something that contributes to the future of bridge.</p><p>We also do it because bridge is a game we love. Playing, teaching, writing, and sharing the experience are all part of the WBS Saloon.</p></section>
    </div><aside className="about-sidebar"><img src="/images/brian-glubok.jpg" alt="Brian Glubok, founder of WBS" loading="lazy" /><h2>Brian Glubok</h2><p>Founder &amp; President</p><p>Five-time national champion and author of Diary of a Bridge Pro.</p><Link href="/pros/brian-glubok/">Brian's profile <span aria-hidden="true">&gt;</span></Link><nav aria-label="About WBS sections"><a href="#what">What we do</a><a href="#who">Who we are</a><a href="#when">Our beginnings</a><a href="#where">Where we work</a><a href="#why">Why WBS</a></nav></aside></div>
    <section className="site-section"><div className="section-heading"><h2>More from our professionals</h2></div><div className="resource-links"><a href="https://bridgestudio.substack.com/" target="_blank" rel="noopener noreferrer">Paulo's Bridge Studio <span aria-hidden="true">&gt;</span></a><a href="https://bridgewinners.com/article/author/brian-glubok/" target="_blank" rel="noopener noreferrer">Brian on Bridge Winners <span aria-hidden="true">&gt;</span></a><a href="https://www.wilsonovichbridge.com/instructional.html" target="_blank" rel="noopener noreferrer">WBS system notes <span aria-hidden="true">&gt;</span></a></div><p className="portrait-credits">Roster portraits from WBS, public player profiles, ACBL, Bridge Winners, and the European Bridge League. Ljudmila's portrait is used with her permission from her university website.</p></section>
  </SiteShell>;
}
