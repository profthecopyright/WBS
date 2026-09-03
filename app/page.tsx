"use client";

import { Fragment, useEffect, useState } from "react";
import WorldWeather from "./weather";
import { archivedBlogPosts, type ArchivedBlogPost } from "./blog-posts";

type PageId = "front" | "inside" | "blogs" | "a3";

const pages: { id: PageId; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "inside", label: "Inside" },
  { id: "blogs", label: "Blogs" },
  { id: "a3", label: "Community" },
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
      "Browse the WBS journal by tournament diary, bridge ideas, player essays, and agency news.",
    href: "#blogs",
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
  src?: string;
  bio: string;
  badge?: string;
  photoPending?: boolean;
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
    bio: "A Stony Brook mathematics professor, two-time Women’s Board-a-Match champion, and Fast Pairs winner.",
    photoPending: true,
  },
];

const BLOGS_PER_PAGE = 9;
const editorialBlogTitles: Record<string, string> = {
  "diary-of-a-bridge-pro-40": "Staying in My Lanes",
  "diary-of-a-bridge-pro-39": "Seven Tips for Aspiring Bridge Pros",
  "diary-of-a-bridge-pro-38": "Modern Bidding and Partnership Mishaps",
  "diary-of-a-bridge-pro-37": "Zen Mind, Beginner’s Mind",
  "september-04th-2024": "Change, Community, and a Bridge Deal",
  "diary-of-a-bridge-pro-35": "A Baby Grand Slam",
  "diary-of-a-bridge-pro-32": "Thoughts on Gatlinburg",
  "diary-of-a-bridge-pro-30": "Goethe, Bobby Knight, and the Potluck",
  "diary-of-a-bridge-pro-31": "On Being Tethered",
  "diary-of-a-bridge-pro-29": "Prepared Rebids and Other Problems",
  "diary-of-a-bridge-pro-28": "Bridge, Fellowship, and Staying Connected",
  "diary-of-a-bridge-pro-27": "Putting the Band Back Together",
  "diary-of-a-bridge-pro-26": "Goldwater’s Law",
  "diary-of-a-bridge-pro-25": "Opening Leads and a Harry Goldwater Story",
  "diary-of-a-bridge-pro-24": "Beginnings Have Magic",
  "diary-of-a-bridge-pro-22": "Take the Game, Discuss the Slam",
  "diary-of-a-bridge-pro-21": "Five Ways Bridge Can Change You",
  "diary-of-a-bridge-pro-20": "Wilsonovich Responses to Two Clubs",
  "diary-of-a-bridge-pro-182821150": "King of the Road",
  "diary-of-a-bridge-pro-18": "A Strong Start in Fairfield",
  "diary-of-a-bridge-pro-17": "The Hal Files",
  "diary-of-a-bridge-pro-16": "A Conversation with Edgar Kaplan",
  "diary-of-a-bridge-pro-15": "WBS Signs Bob Hamman",
  "diary-of-a-bridge-pro-14": "Still We Play On",
  "diary-of-a-bridge-pro-13": "Recruiting the WBS Team",
  "diary-of-a-bridge-pro-12": "Ranges, Judgment, and Four Hearts",
  "diary-of-a-bridge-pro-11": "Glubok 3.0",
  "diary-of-a-bridge-pro-10": "A Life-Changing Nationals",
  "not-a-good-day-for-weak-twos": "Not a Good Day for Weak Twos",
  "diary-of-a-bridge-pro-9": "Tap Your Inner Pepsi",
  "quick-notes-from-the-joust": "Quick Notes from the Joust",
  "diary-of-a-bridge-pro-8": "A Good Day for New York Bridge",
  "louisville-tales": "Louisville Tales",
  "diary-of-a-bridge-pro-6": "Too Much Light",
  "diary-of-a-bridge-pro-5": "Bid Your Points",
  "diary-of-a-bridge-pro-4": "Play These Louisville Hands with Me",
  "diary-of-a-bridge-pro-3": "The Experts Have Spoken",
  "diary-of-a-bridge-pro-2": "Indiana Drury and the Road to Bridge",
  "diary-of-a-bridge-pro-1": "And So We Begin",
};

const editorialBlogStandfirsts: Record<string, string> = {
  "who-needs-poland-weve-got-warwick": "From the Labor Day regional in Warwick: a lesson in finding Plan B, gratitude for New England bridge, and thoughts of returning to New York.",
  "diary-of-a-bridge-pro-40": "A California-bound meditation on bridge, memory, and the voices that stay with us.",
  "diary-of-a-bridge-pro-39": "Collected wisdom on professionalism, partnership, and making a life in the game.",
  "diary-of-a-bridge-pro-38": "Three bidding problems, a difficult defense, and the cost of undefined ranges.",
  "diary-of-a-bridge-pro-37": "Suzuki, Steve Jobs, Jim Mahaffey, and the concentration bridge demands.",
  "september-04th-2024": "On finding community, accepting change, and choosing the safer line.",
  "diary-of-a-bridge-pro-35": "A grand slam, a shorter column, and advice gathered straight out of Compton.",
  "diary-of-a-bridge-pro-32": "Spring in Springfield, memories of Gatlinburg, and the pull of the tournament road.",
  "diary-of-a-bridge-pro-30": "Intensity, group life, and what a Midwestern potluck can teach.",
  "diary-of-a-bridge-pro-31": "Thirty columns into the project, a reflection on connection and identity.",
};

function blogDisplayTitle(post: ArchivedBlogPost) {
  return editorialBlogTitles[post.slug] ?? post.title;
}

function blogStandfirst(post: ArchivedBlogPost) {
  if (editorialBlogStandfirsts[post.slug]) return editorialBlogStandfirsts[post.slug];

  const firstParagraph = blogBodyBlocks(post).find((block) => block.type === "paragraph");
  const text = firstParagraph?.type === "paragraph" ? firstParagraph.text : post.excerpt;
  if (text.length <= 180) return text;

  const clipped = text.slice(0, 180);
  return `${clipped.slice(0, clipped.lastIndexOf(" "))}…`;
}

type BlogBodyBlock =
  | { type: "paragraph" | "dateline"; text: string }
  | { type: "divider" };

function comparableText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function removeRepeatedTitle(value: string, title: string) {
  const comparableValue = comparableText(value);
  const comparableTitle = comparableText(title);
  const isShortHeading = comparableValue.length <= 80
    && (comparableValue.includes(comparableTitle) || comparableTitle.includes(comparableValue));

  if (isShortHeading) return "";

  const titleWords = title.match(/[a-z0-9]+/gi) ?? [];
  if (titleWords.length < 2) return value;

  const titlePrefix = new RegExp(`^\\s*${titleWords.join("[^a-z0-9]+")}[\\s.,:;!?—–-]*`, "i");
  return value.replace(titlePrefix, "").trim();
}

function splitLongParagraph(value: string) {
  if (value.length <= 900) return [value];

  const sentences = value.match(/[^.!?]+(?:[.!?]+["'’”)]*|$)/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [value];
  if (sentences.length < 3) return [value];

  const paragraphs: string[] = [];
  let paragraph = "";
  sentences.forEach((sentence) => {
    if (paragraph.length >= 360 && paragraph.length + sentence.length > 680) {
      paragraphs.push(paragraph);
      paragraph = sentence;
    } else {
      paragraph = `${paragraph} ${sentence}`.trim();
    }
  });
  if (paragraph) paragraphs.push(paragraph);
  return paragraphs;
}

function looksLikeDateline(value: string) {
  return value.length < 90
    && /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/i.test(value)
    && /\d/.test(value);
}

function blogBodyBlocks(post: ArchivedBlogPost): BlogBodyBlock[] {
  const blocks: BlogBodyBlock[] = [];
  let openingParagraphCount = 0;

  post.body.replace(/\r/g, "").split(/(\*{4,})/).forEach((section) => {
    if (/^\*{4,}$/.test(section.trim())) {
      if (blocks.length && blocks.at(-1)?.type !== "divider") blocks.push({ type: "divider" });
      return;
    }

    section.split(/\n{2,}/).forEach((rawParagraph) => {
      let text = rawParagraph.replace(/\s*\n\s*/g, " ").replace(/[ \t]{2,}/g, " ").trim();
      if (!text) return;

      if (openingParagraphCount < 5) text = removeRepeatedTitle(text, blogDisplayTitle(post));
      openingParagraphCount += 1;
      if (!text) return;

      splitLongParagraph(text).forEach((paragraph) => {
        blocks.push({ type: looksLikeDateline(paragraph) ? "dateline" : "paragraph", text: paragraph });
      });
    });
  });

  while (blocks.at(-1)?.type === "divider") blocks.pop();
  return blocks;
}

function renderLinkedText(value: string) {
  return value.split(/((?:https?:\/\/|www\.)[^\s]+)/g).map((part, index) => {
    if (!/^(?:https?:\/\/|www\.)/i.test(part)) return part;

    const cleanedPart = part.replace(/\\(?=\?)/g, "");
    const trailingPunctuation = cleanedPart.match(/[.,;:!?]+$/)?.[0] ?? "";
    const url = cleanedPart.slice(0, cleanedPart.length - trailingPunctuation.length);
    const href = url.startsWith("www.") ? `https://${url}` : url;

    return (
      <Fragment key={`${url}-${index}`}>
        <a href={href} rel="noreferrer" target="_blank">{url}</a>
        {trailingPunctuation}
      </Fragment>
    );
  });
}

function blogHref(post: ArchivedBlogPost) {
  return `#blogs/${post.slug}`;
}

function blogPageHref(page: number) {
  return page === 1 ? "#blogs" : `#blogs/page/${page}`;
}

function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" })
    .format(new Date(`${value}T12:00:00`));
}

const testimonials = [
  "Brian has a way of making a tough hand feel manageable. I always leave with something useful.",
  "I played with one of the WBS pros last month and honestly felt calmer at the table right away.",
  "The advice is practical, not fancy. That’s what I like — straight talk and real bridge judgment.",
  "My bidding has been better since I started working with WBS. They operate with clear communication, not with grandiose dogma.",
  "They pay attention to the little things, which is usually where matches are won.",
  "When I play with a WBS pro it feels as though I am partnered with someone who really knows the game.",
];

const testimonialAuthor = { name: "Anonymous Client", initials: "AC" };

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
  const [blogPage, setBlogPage] = useState(1);
  const [selectedBlogPost, setSelectedBlogPost] = useState<ArchivedBlogPost | null>(null);
  const [activeForm, setActiveForm] = useState<{ title: string; url: string } | null>(null);
  const [entranceState, setEntranceState] = useState<"closed" | "opening" | "open">("closed");

  const blogPageCount = Math.ceil(archivedBlogPosts.length / BLOGS_PER_PAGE);
  const blogPagePosts = archivedBlogPosts.slice((blogPage - 1) * BLOGS_PER_PAGE, blogPage * BLOGS_PER_PAGE);
  const selectedBlogIndex = selectedBlogPost ? archivedBlogPosts.findIndex((post) => post.slug === selectedBlogPost.slug) : -1;
  const previousBlogPost = selectedBlogIndex > 0 ? archivedBlogPosts[selectedBlogIndex - 1] : null;
  const nextBlogPost = selectedBlogIndex >= 0 && selectedBlogIndex < archivedBlogPosts.length - 1
    ? archivedBlogPosts[selectedBlogIndex + 1]
    : null;

  useEffect(() => {
    const [requestedHash, blogTarget, pageTarget] = window.location.hash.slice(1).split("/");
    const requested = requestedHash === "blog" ? "blogs" : requestedHash;
    if (pages.some((page) => page.id === requested)) {
      queueMicrotask(() => setActivePage(requested as PageId));
    }
    if (requested === "blogs" && blogTarget) {
      if (blogTarget === "page") {
        const requestedPage = Number(pageTarget);
        if (Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= blogPageCount) {
          queueMicrotask(() => setBlogPage(requestedPage));
        }
      } else if (blogTarget === "archive") {
        window.history.replaceState(null, "", "#blogs");
      } else {
        queueMicrotask(() => setSelectedBlogPost(archivedBlogPosts.find((post) => post.slug === blogTarget) ?? null));
      }
    }
    if (requestedHash === "blog") {
      window.history.replaceState(null, "", blogTarget && blogTarget !== "archive" ? `#blogs/${blogTarget}${pageTarget ? `/${pageTarget}` : ""}` : "#blogs");
    }
  }, [blogPageCount]);

  function choosePage(page: PageId) {
    setActivePage(page);
    if (page === "blogs") {
      setSelectedBlogPost(null);
      setBlogPage(1);
    }
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

  function openBlogPost(post: ArchivedBlogPost) {
    setSelectedBlogPost(post);
    window.history.replaceState(null, "", blogHref(post));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showBlogPage(page: number) {
    setSelectedBlogPost(null);
    setBlogPage(page);
    window.history.replaceState(null, "", blogPageHref(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                {testimonials.slice(0, showAllTestimonials ? 6 : 3).map((testimonial) => (
                  <figure className="front-quote" key={testimonial}>
                    <blockquote>“{testimonial}”</blockquote>
                    <figcaption>
                      <span className="placeholder-avatar" aria-hidden="true">{testimonialAuthor.initials}</span>
                      <span>{testimonialAuthor.name}</span>
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
                <Story
                  story={story}
                  secondary
                  minimal
                  key={story.title}
                  onNavigate={story.href === "#blogs" ? () => choosePage("blogs") : undefined}
                />
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
              Portraits from WBS, public player profiles, Bridge Winners and ACBL tournament coverage, and the European Bridge League.
            </p>
          </section>

        </article>
      )}

      {activePage === "blogs" && (
        <article className="page-panel blog-panel" id="blogs">
          <section className="page-fold blog-page" aria-label="Blogs">
            <nav className="blogs-toolbar" aria-label={selectedBlogPost ? "Article navigation" : "Blog pages"}>
              {selectedBlogPost ? (
                <div className="blogs-toolbar-group">
                  <a className="blogs-all-posts" href="#blogs" onClick={(event) => { event.preventDefault(); showBlogPage(1); }}>All blogs</a>
                  <div className="blogs-chevron-nav">
                    {previousBlogPost
                      ? <a href={blogHref(previousBlogPost)} aria-label={`Previous article: ${blogDisplayTitle(previousBlogPost)}`} title="Previous article" onClick={(event) => { event.preventDefault(); openBlogPost(previousBlogPost); }}><span aria-hidden="true">{"<"}</span></a>
                      : <span aria-disabled="true"><span aria-hidden="true">{"<"}</span></span>}
                    {nextBlogPost
                      ? <a href={blogHref(nextBlogPost)} aria-label={`Next article: ${blogDisplayTitle(nextBlogPost)}`} title="Next article" onClick={(event) => { event.preventDefault(); openBlogPost(nextBlogPost); }}><span aria-hidden="true">{">"}</span></a>
                      : <span aria-disabled="true"><span aria-hidden="true">{">"}</span></span>}
                  </div>
                </div>
              ) : (
                <div className="blogs-toolbar-group">
                  <span className="blogs-all-posts">All blogs</span>
                  <div className="blogs-chevron-nav">
                    {blogPage > 1
                      ? <a href={blogPageHref(blogPage - 1)} aria-label="Previous page" title="Previous page" onClick={(event) => { event.preventDefault(); showBlogPage(blogPage - 1); }}><span aria-hidden="true">{"<"}</span></a>
                      : <span aria-disabled="true"><span aria-hidden="true">{"<"}</span></span>}
                    <span className="blogs-page-status">Page {blogPage} of {blogPageCount}</span>
                    {blogPage < blogPageCount
                      ? <a href={blogPageHref(blogPage + 1)} aria-label="Next page" title="Next page" onClick={(event) => { event.preventDefault(); showBlogPage(blogPage + 1); }}><span aria-hidden="true">{">"}</span></a>
                      : <span aria-disabled="true"><span aria-hidden="true">{">"}</span></span>}
                  </div>
                </div>
              )}
            </nav>

            {selectedBlogPost ? (
              <article className="blog-article-reader">
                <header>
                  <h2>{blogDisplayTitle(selectedBlogPost)}</h2>
                  <p className="blog-article-byline">By {selectedBlogPost.author} · {formatBlogDate(selectedBlogPost.date)}</p>
                </header>
                <div className="blog-article-body">
                  {blogBodyBlocks(selectedBlogPost).map((block, index) => (
                    block.type === "divider"
                      ? <hr aria-hidden="true" key={`${selectedBlogPost.slug}-${index}`} />
                      : <p className={block.type === "dateline" ? "blog-article-dateline" : undefined} key={`${selectedBlogPost.slug}-${index}`}>{renderLinkedText(block.text)}</p>
                  ))}
                </div>
              </article>
            ) : (
              <section className="blogs-front" aria-label={`Blog articles, page ${blogPage}`}>
                <div className="blogs-post-grid">
                  {blogPagePosts.map((post) => (
                    <a className="blogs-post-card" href={blogHref(post)} onClick={(event) => { event.preventDefault(); openBlogPost(post); }} key={post.slug}>
                      <h3>{blogDisplayTitle(post)}</h3>
                      <p>{blogStandfirst(post)}</p>
                      <span className="blogs-entry-author">{post.author}</span>
                    </a>
                  ))}
                </div>
              </section>
            )}
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

function Story({ story, secondary = false, minimal = false, onOpenForm, onNavigate }: { story: (typeof stories)[number] | (typeof insideStories)[number]; secondary?: boolean; minimal?: boolean; onOpenForm?: () => void; onNavigate?: () => void }) {
  return (
    <article className={`story${secondary ? " secondary-story" : ""}${minimal ? " minimal-story" : ""}`}>
      {!minimal && <div className="story-meta"><span>{story.number}</span><span>{story.kicker}</span></div>}
      <h3>{onOpenForm || onNavigate ? (
        <button className="story-title-link story-title-button" type="button" onClick={onOpenForm ?? onNavigate}>{story.title}</button>
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
            {pro.photoPending ? (
              <div className="pro-photo-placeholder" aria-label={`${pro.name} photo pending approval`}>
                <span>LK</span>
                <small>Photo pending approval</small>
              </div>
            ) : (
              <img src={pro.src} alt={pro.name} loading="lazy" />
            )}
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
