"use client";

import { useEffect, useState } from "react";
import WorldWeather from "./weather";

type PageId = "front" | "inside" | "a3";

const pages: { id: PageId; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "inside", label: "Inside" },
  { id: "a3", label: "Community · A3" },
];

const stories = [
  {
    number: "01",
    kicker: "Personal Consultation",
    title: "Talk with Brian",
    summary: "Tell Brian what you’d like to discuss and choose a convenient time for him to contact you.",
    href: "https://tally.so/r/RG11B9",
  },
  {
    number: "02",
    kicker: "Complimentary Play",
    title: "Get a Free Play",
    summary: "Complete a five-question bidding quiz, then share your contact information to schedule a free play.",
    href: "https://tally.so/r/D499lZ",
  },
  {
    number: "03",
    kicker: "General Inquiries",
    title: "Talk with an Agent",
    summary: "Tell us what you’re looking for and how you prefer to be contacted. A WBS intake officer will follow up.",
    href: "https://tally.so/r/LZBL1G",
  },
];

const insideStories = [
  {
    number: "",
    kicker: "",
    title: "Diary",
    summary:
      "Read Brian’s tournament dispatches, bridge ideas, conversations, and observations in Diary of a Bridge Pro.",
    href: "https://www.wilsonovichbridge.com/diary-of-a-bridge-pro.html",
  },
  {
    number: "",
    kicker: "",
    title: "Brian",
    summary:
      "Meet Brian Glubok: former teen prodigy, five-time national champion, writer, filmmaker, painter, and bridge player above all.",
    href: "https://bridgewinners.com/article/author/brian-glubok/",
  },
  {
    number: "",
    kicker: "",
    title: "Blogs",
    summary:
      "Articles, analysis, and stories from WBS professionals are being planned. Coming soon.",
    href: "",
  },
  {
    number: "",
    kicker: "",
    title: "System Notes",
    summary:
      "Explore WBS instructional material, partnership methods, and ideas for improving your game.",
    href: "https://www.wilsonovichbridge.com/instructional.html",
  },
];

type Pro = {
  name: string;
  src: string;
  bio: string;
  badge?: string;
};

const corePros: Pro[] = [
  {
    name: "Brian Glubok",
    src: "/images/inside-gallery/brian-glubok.png",
    bio: "A five-time national champion, former teen prodigy, super-elite rubber bridge player, writer, filmmaker, painter, and the bridge player behind WBS.",
  },
  {
    name: "Joe Grue",
    src: "/images/inside-gallery/joe-grue.jpg",
    bio: "An American world champion and multiple North American champion, known for imaginative, fearless play.",
  },
  {
    name: "Paulo Brum",
    src: "/images/inside-gallery/paulo-brum.jpg",
    bio: "A leading Brazilian international player, trusted partner, and experienced bridge teacher.",
  },
  {
    name: "Gregor Rus",
    src: "/images/inside-gallery/gregor-rus.png",
    bio: "A Slovenian champion who has represented his country in junior and open international competition.",
  },
  {
    name: "Bob Hamman",
    src: "/images/inside-gallery/bob-hamman.png",
    bio: "One of the most celebrated players in bridge history and a trusted senior presence in the WBS circle.",
    badge: "Available exclusively through WBS",
  },
];

const otherPros: Pro[] = [
  {
    name: "Ioannis “Giannis” Oikonomopoulos",
    src: "/images/inside-gallery/ioannis-oikonomopoulos.png",
    bio: "A Greek-born professional and Grand Life Master with world youth titles and major North American results.",
  },
  {
    name: "Finn Kolesnik",
    src: "/images/inside-gallery/finn-kolesnik.png",
    bio: "Born in 2004, Finn is one of America’s outstanding young players and an established international competitor.",
  },
  {
    name: "Danuta Kazmucha",
    src: "/images/inside-gallery/danuta-kazmucha.jpg",
    bio: "A Polish international player and winner of the 2026 Wagar Women’s Pairs in Minneapolis.",
  },
  {
    name: "Disa Eythorsdottir",
    src: "/images/inside-gallery/disa-eythorsdottir.png",
    bio: "An Icelandic world champion, established professional, and longtime friend of the agency.",
  },
  {
    name: "Ljudmila Kamenova",
    src: "/images/inside-gallery/ljudmila-kamenova.jpg",
    bio: "A Stony Brook mathematics professor, two-time Women’s Board-a-Match champion, and Fast Pairs winner.",
  },
];

const testimonials = [
  "Brian has a way of making a tough hand feel manageable. I always leave with something useful.",
  "I played with one of the WBS pros last month and honestly felt calmer at the table right away.",
  "The advice is practical, not fancy. That’s what I like — straight talk and real bridge judgment.",
  "My bidding has been better since I started working with WBS. They operate with clear communication, not with grandiose dogma.",
  "They pay attention to the little things, which is usually where matches are won.",
  "When I play with a WBS pro it feels as though I am partnered with someone who really knows the game.",
];

const testimonialAuthors = [
  { name: "John Doe", initials: "JD" },
  { name: "Jane Smith", initials: "JS" },
  { name: "Michael Lee", initials: "ML" },
  { name: "Sarah Davis", initials: "SD" },
  { name: "Robert Brown", initials: "RB" },
  { name: "Emily Wilson", initials: "EW" },
];

const a3News = [
  {
    kicker: "Brian Glubok · President’s Desk",
    title: "A champion brings the game to a new generation",
    copy: "Brian Glubok’s 2026 program pairs elite tournament experience with a teaching and playing initiative at Aloha Bridge Center in Columbus.",
  },
  {
    kicker: "Paulo Brum · Tournament Notes",
    title: "Inside the WBS team’s Joust match",
    copy: "Paulo Brum takes readers through selected deals from the WBS knockout match against RedTop, alongside Bob Hamman, Finn Kolesnik, and Michael Xu.",
  },
  {
    kicker: "Bob Hamman · WBS Circle",
    title: "A legend of the game, available through WBS",
    copy: "World champion and Hall of Famer Bob Hamman brings decades of elite experience to the WBS circle. He is available exclusively through WBS for select professional partnerships.",
  },
  {
    kicker: "Hongbo Li · Tournament News",
    title: "A comeback measured by less than one point",
    copy: "Hongbo Li helped Alan Munro’s team complete a dramatic comeback to win the 2026 NABC 0–10,000 Swiss Teams by less than one victory point.",
  },
  {
    kicker: "Placeholder · Partnership Desk",
    title: "Eleanor Price and Martin Hale set their fall calendar",
    copy: "The newly formed partnership is preparing for a first regional appearance together after a productive summer of practice sessions.",
  },
  {
    kicker: "Placeholder · Club Notes",
    title: "Thursday evening game welcomes a full room",
    copy: "Friends gathered for an old-fashioned duplicate, followed by dinner and a spirited discussion of the final board.",
  },
  {
    kicker: "Placeholder · Milestones",
    title: "A first sectional win for a patient partnership",
    copy: "After several close finishes, two longtime partners celebrated their first sectional title—and immediately began discussing the next event.",
  },
  {
    kicker: "Placeholder · Around the Table",
    title: "The post-game postmortem runs past midnight",
    copy: "One dinner table, four experts, and a single competitive auction produced more opinions than anyone was prepared to count.",
  },
];

export default function Home() {
  const [activePage, setActivePage] = useState<PageId>("front");
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeForm, setActiveForm] = useState<{ title: string; url: string } | null>(null);
  const [entranceState, setEntranceState] = useState<"closed" | "opening" | "open">("closed");

  useEffect(() => {
    const requested = window.location.hash.slice(1) as PageId;
    if (pages.some((page) => page.id === requested)) {
      queueMicrotask(() => setActivePage(requested));
    }
  }, []);

  function choosePage(page: PageId) {
    setActivePage(page);
    window.history.replaceState(null, "", `#${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function enterSite() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntranceState("open");
      return;
    }
    setEntranceState("opening");
    window.setTimeout(() => setEntranceState("open"), 1050);
  }

  function openStoryForm(story: (typeof stories)[number]) {
    setActiveForm({
      title: story.title,
      url: story.href.replace("/r/", "/embed/") + "?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    });
  }

  return (
    <main>
      {entranceState !== "open" && (
        <section className={`saloon-entry ${entranceState === "opening" ? "opening" : ""}`} aria-label="Welcome to World Bridge Services">
          <div className="saloon-sign" aria-hidden="true">
            <span>World Bridge Services</span>
            <strong>The WBS Club</strong>
            <small>Elite Professional Bridge Services</small>
          </div>
          <div className="full-saloon-door saloon-door-left" aria-hidden="true">
            <span className="door-crest">♠</span>
            <span className="door-panel-mark">W</span>
            <span className="door-scrollwork">◆</span>
            <span className="door-hardware door-hardware-left" />
          </div>
          <div className="full-saloon-door saloon-door-right" aria-hidden="true">
            <span className="door-crest red-door-crest">♥</span>
            <span className="door-panel-mark">B</span>
            <span className="door-scrollwork">◆</span>
            <span className="door-hardware door-hardware-right" />
          </div>
          <button className="enter-button" type="button" onClick={enterSite} disabled={entranceState === "opening"}>
            <span>{entranceState === "opening" ? "Welcome In" : "Enter the Club"}</span>
            <small>{entranceState === "opening" ? "Opening the Gazette…" : "Push through the saloon doors"}</small>
          </button>
        </section>
      )}
      <header className="masthead">
        <div className="weather-strip">
          <WorldWeather />
        </div>
        <div className="nameplate">
          <span aria-hidden="true">♠</span>
          <h1>World Bridge Services</h1>
          <span className="red-suit" aria-hidden="true">♥</span>
        </div>
      </header>

      <nav className="section-nav" aria-label="Newspaper pages">
        {pages.map((page) => (
          <button
            className={activePage === page.id ? "active" : undefined}
            type="button"
            aria-current={activePage === page.id ? "page" : undefined}
            onClick={() => choosePage(page.id)}
            key={page.id}
          >
            {page.label}
          </button>
        ))}
      </nav>

      {activePage === "front" && (
        <article className="page-panel" id="front">
          <section className="page-fold front-hero" aria-labelledby="front-page-heading">
            <div className="hero-copy">
              <h2 className="hero-kicker" id="front-page-heading">Boutique Bridge Services</h2>
              <p className="hero-deck">Book a professional player for an upcoming tournament or club game, or work with one as your personal coach or teacher.</p>
              <details className="hero-explainer">
                <summary>
                  <span className="read-more-label">Read more…</span>
                  <span className="read-less-label">Read less</span>
                </summary>
                <div>
                  <p>These days, many players enjoy playing with their peers—bridge friends who use the same system they do and perhaps play at about the same level.</p>
                  <p>But at the higher levels—national championships and most regional tournaments—as often as not, the winners will be professional players, usually partnered by comfortable sponsors.</p>
                  <p>In some circles and duplicate clubs, there might be, or might once have been, a certain stigma attached to “hiring pros”: “They’re stealing our masterpoints!” players from the rank and file were heard to complain.</p>
                  <p>Today, that is a rare view. At regionals on both coasts, and at every national tournament, the contending partnerships mostly consist of one professional and one sponsor.</p>
                  <p>But how do you find the right professional? What are the protocols? If you want to improve your play at bridge and contend for championships, how do you go about it?</p>
                  <p>What, if you’ll pardon the expression, is the runway?</p>
                  <button type="button" onClick={() => openStoryForm(stories[0])}>Talk with Brian</button>
                  <small>Request a personal consultation.</small>
                </div>
              </details>
              <div className="hero-founder">
                <strong>Brian Glubok · President</strong>
                <span>Winner of the 1987 Spingold, 1990 Reisinger, and 1996, 1997 &amp; 1999 Jacoby Open Swiss Teams</span>
                <span>Five-time NABC+ champion · Thirteen-time NABC+ runner-up</span>
              </div>
            </div>
            <div className={`brian-portrait ${showHistory ? "show-history" : ""}`}>
              <div className="portrait-card-inner">
                <button
                  className="portrait-face portrait-front"
                  type="button"
                  aria-label="Read the history of World Bridge Services"
                  aria-expanded={showHistory}
                  aria-hidden={showHistory}
                  tabIndex={showHistory ? -1 : 0}
                  onClick={() => setShowHistory(true)}
                >
                  <img src="/images/brian-glubok.jpg" alt="Brian Glubok, president of World Bridge Services" />
                  <span>Click to read our story</span>
                </button>
                <article className="portrait-face portrait-history" aria-hidden={!showHistory}>
                  <button type="button" tabIndex={showHistory ? 0 : -1} onClick={() => setShowHistory(false)}>Return to portrait</button>
                  <p className="history-kicker">Our Story</p>
                  <h3>How WBS Began</h3>
                  <p>WBS was created by Brian Glubok in 2020, when he realized that demand for his professional bridge services—playing online with clients during lockdown—had exceeded his own capacity. In response to those unique circumstances, Glubok asked some of his closest friends in bridge—Alex Kolesnik, Joe Grue, and Ron Smith—to cover some of his online sessions under his supervision.</p>
                  <p>Brian continued to coach and counsel the clients, and to maintain ultimate responsibility for every aspect of the operation.</p>
                  <p>In 2023, Paulo Brum, a Brazilian international player who had recently emigrated to Ohio with his young family, joined the organization. He helped Glubok turn WBS into a more fully realized business.</p>
                  <p>During WBS’s first three years, Glubok resisted rapid growth, insisting on maintaining the boutique nature of the operation. Now, finally, he feels ready to expand—which is why you are reading this today.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="page-fold front-page" aria-labelledby="actions-heading">
            <div className="actions-heading">
              <h2 className="front-section-heading" id="actions-heading">What Would You Like to Do Next?</h2>
            </div>
            <div className="lead-grid">
              {stories.map((story) => (
                <Story
                  story={story}
                  minimal
                  key={story.number}
                  onOpenForm={() => openStoryForm(story)}
                />
              ))}
            </div>
            <div className="front-proof" aria-label="Selected client testimonials">
              <h2 className="front-section-heading">What Players Say</h2>
              <div className="front-proof-grid">
                {testimonials.slice(0, showAllTestimonials ? 6 : 3).map((testimonial, index) => (
                  <figure className="front-quote" key={testimonial}>
                    <blockquote>“{testimonial}”</blockquote>
                    <figcaption>
                      <span className="placeholder-avatar" aria-hidden="true">{testimonialAuthors[index].initials}</span>
                      <span>{testimonialAuthors[index].name}<small>Placeholder client</small></span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <button
                className="testimonials-toggle"
                type="button"
                aria-expanded={showAllTestimonials}
                onClick={() => setShowAllTestimonials((shown) => !shown)}
              >
                {showAllTestimonials ? "See less" : "See more…"}
              </button>
            </div>
          </section>
        </article>
      )}

      {activePage === "inside" && (
        <article className="page-panel" id="inside">
          <section className="page-fold inside-page" aria-labelledby="inside-heading">
            <h2 className="inside-title" id="inside-heading">Stories &amp; Resources</h2>
            <div className="secondary-grid">
              {insideStories.map((story) => (
                <Story story={story} secondary minimal key={story.title} />
              ))}
            </div>
          </section>

          <section className="page-fold gallery-page" aria-labelledby="gallery-heading">
            <div className="gallery-heading">
              <h2 id="gallery-heading">The WBS Circle</h2>
              <span>Five core pros with national championships and world-class team strength</span>
            </div>
            <ProGroup title="Core Pros" pros={corePros} />
            <ProGroup title="Other Pros" pros={otherPros} />
            <p className="gallery-source">
              Portraits from WBS, public player profiles, Bridge Winners and ACBL tournament coverage, the European Bridge League, and Ljudmila Kamenova’s academic homepage.
            </p>
          </section>

        </article>
      )}

      {activePage === "a3" && (
        <article className="page-panel a3-panel" id="a3">
          <section className="page-fold a3-lead" aria-labelledby="a3-heading">
            <header className="a3-nameplate">
              <h2 id="a3-heading">Hatch, Match and Dispatch</h2>
            </header>
            <div className="a3-news-grid">
              {a3News.map((item) => (
                <section className="a3-news-item" key={item.kicker}>
                  <p className="a3-kicker">{item.kicker}</p>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </section>
              ))}
            </div>
          </section>
        </article>
      )}

      {activeForm && (
        <div className="form-modal" role="dialog" aria-modal="true" aria-label={activeForm.title}>
          <button className="form-backdrop" type="button" aria-label="Close form" onClick={() => setActiveForm(null)} />
          <div className="form-sheet">
            <header>
              <h2>{activeForm.title}</h2>
              <button type="button" onClick={() => setActiveForm(null)} aria-label="Close form">×</button>
            </header>
            <iframe src={activeForm.url} title={activeForm.title} loading="lazy" />
          </div>
        </div>
      )}
    </main>
  );
}

function Story({ story, secondary = false, minimal = false, onOpenForm }: { story: (typeof stories)[number] | (typeof insideStories)[number]; secondary?: boolean; minimal?: boolean; onOpenForm?: () => void }) {
  return (
    <article className={`story${secondary ? " secondary-story" : ""}${minimal ? " minimal-story" : ""}`}>
      {!minimal && <div className="story-meta"><span>{story.number}</span><span>{story.kicker}</span></div>}
      <h3>{onOpenForm ? (
        <button className="story-title-link story-title-button" type="button" onClick={onOpenForm}>{story.title}</button>
      ) : story.href ? (
        <a className="story-title-link" href={story.href}>{story.title}</a>
      ) : (
        <span className="story-title-placeholder">{story.title}</span>
      )}</h3>
      <p>{story.summary}</p>
    </article>
  );
}

function ProGroup({ title, pros }: { title: string; pros: Pro[] }) {
  return (
    <section className="pro-group" aria-labelledby={`${title.toLowerCase().replace(" ", "-")}-heading`}>
      <header className="pro-group-heading">
        <h3 id={`${title.toLowerCase().replace(" ", "-")}-heading`}>{title}</h3>
        <span>{pros.length} professionals</span>
      </header>
      <div className="pro-grid">
        {pros.map((pro) => (
          <article className="pro-card" key={pro.name}>
            <img src={pro.src} alt={pro.name} loading="lazy" />
            <div className="pro-card-copy">
              <h4>{pro.name}</h4>
              {pro.badge && <p className="pro-badge"><strong>{pro.badge}</strong></p>}
              <p className="pro-bio">{pro.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
