"use client";

import { Fragment, useEffect, useRef, useState, type MouseEvent } from "react";
import WorldWeather from "./weather";
import { archivedBlogPosts, type ArchivedBlogPost } from "./blog-posts";
import { corePros, otherPros, findPro, profileHref, type ProProfile } from "./profiles";

type PageId = "services" | "pros" | "lessons" | "blogs";

const pages: { id: PageId; label: string }[] = [
  { id: "services", label: "Bridge Services" },
  { id: "pros", label: "Our Pros" },
  { id: "lessons", label: "Lessons & Courses" },
  { id: "blogs", label: "Blogs" },
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
  "the-brass-ring-and-staying-tethered": "From Warwick: the carousel of time, an Italian Double system triumph, and the value of staying tethered.",
  "spingold-26-lets-go-dutch": "A board-by-board account of the 2026 Spingold, the Dutch stars scattered through the field, and Fleisher's convincing run to the trophy.",
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
  | { type: "heading"; text: string; level: "major" | "minor" }
  | { type: "seed-list"; teams: string[] }
  | { type: "divider" }
  | { type: "deal"; dealer: BridgeSeat; vulnerability: string; hands: BridgeHand[] }
  | { type: "auction"; dealer: BridgeSeat; players: string[]; rows: Array<Array<string | null>> };

type BridgeSeat = "West" | "North" | "East" | "South";

type BridgeSuit = {
  symbol: string;
  cards: string;
};

type BridgeHand = {
  seat: BridgeSeat;
  suits: BridgeSuit[];
};

const bridgeSeats: BridgeSeat[] = ["West", "North", "East", "South"];
const bridgeTeamHeadings = new Set([
  "wolfson",
  "fleisher",
  "zimmermann",
  "nickell",
]);
const bridgeMajorHeadings = new Set([
  "round of 16",
  "the quarter finals",
  "the semifinals",
  "the finals",
  "a convincing victory",
]);
const bridgeMinorHeadings = new Set([
  ...bridgeTeamHeadings,
  "first quarter",
  "second quarter",
  "third quarter",
  "fourth quarter",
]);

function bridgeSeatFromInitial(initial: string): BridgeSeat {
  return ({ W: "West", N: "North", E: "East", S: "South" } as Record<string, BridgeSeat>)[initial.toUpperCase()] ?? "West";
}

function bridgeVulnerabilityLabel(value: string) {
  const normalized = value.toUpperCase();
  if (normalized === "NONE") return "Neither vulnerable";
  if (normalized === "ALL") return "Both vulnerable";
  return `${normalized.replace("NS", "N-S").replace("EW", "E-W")} vulnerable`;
}

function parseBridgeSuit(line: string): BridgeSuit | null {
  const match = line.trim().match(/^([♠♥♦♣])\uFE0E?\s*(.+)$/u);
  return match ? { symbol: match[1], cards: match[2].replace(/^–$/, "—") } : null;
}

function isAuctionCall(line: string) {
  return /^(?:pass\*?|all pass|dbl|rdbl|[1-7](?:NT|[♠♥♦♣]\uFE0E?)[!*]?)$/iu.test(line.trim());
}

function displayBridgeCall(call: string) {
  const normalized = call.trim();
  if (/^pass\*$/i.test(normalized)) return "Pass*";
  if (/^pass$/i.test(normalized)) return "Pass";
  if (/^all pass$/i.test(normalized)) return "All Pass";
  if (/^dbl$/i.test(normalized)) return "Dbl";
  if (/^rdbl$/i.test(normalized)) return "Rdbl";
  return normalized.replace(/nt/i, "NT");
}

function nextNonEmptyLine(lines: string[], from: number) {
  let index = from;
  while (index < lines.length && !lines[index].trim()) index += 1;
  return index;
}

function bridgeReportBodyBlocks(body: string): BlogBodyBlock[] {
  const lines = body.replace(/\r/g, "").split("\n");
  const blocks: BlogBodyBlock[] = [];
  let currentDealer: BridgeSeat = "West";
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (/^\*{4,}$/.test(line)) {
      if (blocks.length && blocks.at(-1)?.type !== "divider") blocks.push({ type: "divider" });
      index += 1;
      continue;
    }

    if (/this year's favorites, listed by seed:$/i.test(line)) {
      splitLongParagraph(line).forEach((paragraph) => {
        blocks.push({ type: looksLikeDateline(paragraph) ? "dateline" : "paragraph", text: paragraph });
      });

      const teams: string[] = [];
      let cursor = index + 1;
      while (cursor < lines.length && teams.length < 4) {
        cursor = nextNonEmptyLine(lines, cursor);
        const team = lines[cursor]?.trim();
        if (!team || !bridgeTeamHeadings.has(team.toLowerCase())) break;
        teams.push(team);
        cursor += 1;
      }

      if (teams.length === 4) blocks.push({ type: "seed-list", teams });
      index = teams.length === 4 ? cursor : index + 1;
      continue;
    }

    const dealMeta = line.match(/^([NESW])\/(NS|EW|All|None)$/i);
    if (dealMeta) {
      const suits: BridgeSuit[] = [];
      let cursor = index + 1;
      while (cursor < lines.length && suits.length < 16) {
        const parsedSuit = parseBridgeSuit(lines[cursor]);
        if (parsedSuit) suits.push(parsedSuit);
        else if (lines[cursor].trim()) break;
        cursor += 1;
      }

      if (suits.length === 16) {
        currentDealer = bridgeSeatFromInitial(dealMeta[1]);
        const handOrder: BridgeSeat[] = ["North", "West", "East", "South"];
        blocks.push({
          type: "deal",
          dealer: currentDealer,
          vulnerability: bridgeVulnerabilityLabel(dealMeta[2]),
          hands: handOrder.map((seat, handIndex) => ({
            seat,
            suits: suits.slice(handIndex * 4, handIndex * 4 + 4),
          })),
        });
        index = cursor;
        continue;
      }
    }

    if (line.toLowerCase() === "west") {
      const headerIndexes: number[] = [];
      let cursor = index;
      for (const seat of bridgeSeats) {
        cursor = nextNonEmptyLine(lines, cursor);
        if (lines[cursor]?.trim().toLowerCase() !== seat.toLowerCase()) break;
        headerIndexes.push(cursor);
        cursor += 1;
      }

      if (headerIndexes.length === 4) {
        const players: string[] = [];
        for (let playerIndex = 0; playerIndex < 4; playerIndex += 1) {
          cursor = nextNonEmptyLine(lines, cursor);
          if (cursor >= lines.length) break;
          players.push(lines[cursor].trim());
          cursor += 1;
        }

        cursor = nextNonEmptyLine(lines, cursor);
        const calls: string[] = [];
        while (cursor < lines.length && isAuctionCall(lines[cursor])) {
          calls.push(lines[cursor].trim());
          cursor = nextNonEmptyLine(lines, cursor + 1);
        }

        if (players.length === 4 && calls.length) {
          const rows: Array<Array<string | null>> = [];
          let row: Array<string | null> = [null, null, null, null];
          let seatIndex = bridgeSeats.indexOf(currentDealer);
          calls.forEach((call) => {
            row[seatIndex] = call;
            seatIndex += 1;
            if (seatIndex === 4) {
              rows.push(row);
              row = [null, null, null, null];
              seatIndex = 0;
            }
          });
          if (row.some(Boolean)) rows.push(row);
          blocks.push({ type: "auction", dealer: currentDealer, players, rows });
          index = cursor;
          continue;
        }
      }
    }

    const normalizedHeading = line.toLowerCase();
    if (bridgeMajorHeadings.has(normalizedHeading) || bridgeMinorHeadings.has(normalizedHeading)) {
      blocks.push({
        type: "heading",
        text: line,
        level: bridgeMajorHeadings.has(normalizedHeading) ? "major" : "minor",
      });
      index += 1;
      continue;
    }

    splitLongParagraph(line).forEach((paragraph) => {
      blocks.push({ type: looksLikeDateline(paragraph) ? "dateline" : "paragraph", text: paragraph });
    });
    index += 1;
  }

  while (blocks.at(-1)?.type === "divider") blocks.pop();
  return blocks;
}

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
  if (post.slug === "spingold-26-lets-go-dutch") return bridgeReportBodyBlocks(post.body);

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
    if (!/^(?:https?:\/\/|www\.)/i.test(part)) return renderBridgeText(part, index);

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

function renderBridgeText(value: string, keyPrefix: number | string) {
  return value.split(/([♠♥♦♣]\uFE0E?)/u).map((part, index) => {
    const suit = part.charAt(0);
    if (!"♠♥♦♣".includes(suit)) return part;
    const color = suit === "♥" || suit === "♦" ? "red" : "black";
    return <span className={`bridge-suit bridge-suit-${color}`} key={`${keyPrefix}-${index}`}>{part}</span>;
  });
}

function BridgeHandDiagram({ hand }: { hand: BridgeHand }) {
  return (
    <div className={`bridge-hand bridge-hand-${hand.seat.toLowerCase()}`}>
      <strong>{hand.seat}</strong>
      <div>
        {hand.suits.map((suit) => (
          <p key={`${hand.seat}-${suit.symbol}`}>
            <span className={`bridge-suit ${suit.symbol === "♥" || suit.symbol === "♦" ? "bridge-suit-red" : "bridge-suit-black"}`}>{suit.symbol}</span>
            <span>{suit.cards}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function BridgeDealDiagram({ block }: { block: Extract<BlogBodyBlock, { type: "deal" }> }) {
  return (
    <figure className="bridge-deal">
      <figcaption><strong>Deal</strong><span>Dealer {block.dealer} · {block.vulnerability}</span></figcaption>
      <div className="bridge-compass">
        {block.hands.map((hand) => <BridgeHandDiagram hand={hand} key={hand.seat} />)}
      </div>
    </figure>
  );
}

function BridgeAuction({ block }: { block: Extract<BlogBodyBlock, { type: "auction" }> }) {
  return (
    <div className="bridge-auction-wrap">
      <table className="bridge-auction">
        <caption>Auction · Dealer {block.dealer}</caption>
        <thead>
          <tr>
            {bridgeSeats.map((seat, index) => (
              <th className={seat === block.dealer ? "bridge-auction-dealer" : undefined} scope="col" key={seat}>
                <span className="bridge-auction-seat">{seat}</span>
                <span className="bridge-auction-player">{block.players[index]}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={`auction-${rowIndex}`}>
              {row.map((call, columnIndex) => {
                const displayedCall = call ? displayBridgeCall(call) : null;
                return (
                  <td aria-label={displayedCall ? `${bridgeSeats[columnIndex]}: ${displayedCall}` : undefined} key={`call-${rowIndex}-${columnIndex}`}>
                    {displayedCall ? renderBridgeText(displayedCall, `${rowIndex}-${columnIndex}`) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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

export default function Home() {
  const [activePage, setActivePage] = useState<PageId>("services");
  const [showHistory, setShowHistory] = useState(false);
  const [blogPage, setBlogPage] = useState(1);
  const [selectedBlogPost, setSelectedBlogPost] = useState<ArchivedBlogPost | null>(null);
  const [selectedPro, setSelectedPro] = useState<ProProfile | null>(null);
  const [activeForm, setActiveForm] = useState<{ title: string; url: string; preferredPro?: string } | null>(null);
  const [entranceState, setEntranceState] = useState<"closed" | "opening" | "open">("closed");
  const formTrigger = useRef<HTMLElement | null>(null);

  const blogPageCount = Math.ceil(archivedBlogPosts.length / BLOGS_PER_PAGE);
  const blogPagePosts = archivedBlogPosts.slice((blogPage - 1) * BLOGS_PER_PAGE, blogPage * BLOGS_PER_PAGE);
  const selectedBlogIndex = selectedBlogPost ? archivedBlogPosts.findIndex((post) => post.slug === selectedBlogPost.slug) : -1;
  const previousBlogPost = selectedBlogIndex > 0 ? archivedBlogPosts[selectedBlogIndex - 1] : null;
  const nextBlogPost = selectedBlogIndex >= 0 && selectedBlogIndex < archivedBlogPosts.length - 1
    ? archivedBlogPosts[selectedBlogIndex + 1]
    : null;

  useEffect(() => {
    function syncLocation() {
      const [requestedHash, target, detail] = window.location.hash.slice(1).split("/");
      const requested = requestedHash === "inside"
        ? target === "about" ? "services" : target === "resources" ? "lessons" : "pros"
        : requestedHash === "front" || requestedHash === "a3" ? "services"
        : requestedHash === "blog" ? "blogs" : requestedHash;
      const page = pages.find((item) => item.id === requested)?.id ?? "services";
      setActivePage(page);
      const pro = page === "pros" ? findPro(requestedHash === "inside" ? detail : target) ?? null : null;
      setSelectedPro(pro);
      const post = page === "blogs" && target && target !== "page" && target !== "archive"
        ? archivedBlogPosts.find((item) => item.slug === target) ?? null : null;
      setSelectedBlogPost(post);
      const requestedPage = page === "blogs" && target === "page" ? Number(detail) : 1;
      setBlogPage(Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= blogPageCount ? requestedPage : 1);
      if (requested) setEntranceState("open");
      if (["front", "inside", "a3", "blog"].includes(requestedHash) || (page === "blogs" && target === "archive")) {
        const canonical = page === "blogs"
          ? target && target !== "archive" ? `#blogs/${target}${detail ? `/${detail}` : ""}` : "#blogs"
          : pro ? profileHref(pro) : `#${page}`;
        window.history.replaceState(null, "", canonical);
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    queueMicrotask(syncLocation);
    window.addEventListener("hashchange", syncLocation);
    window.addEventListener("popstate", syncLocation);
    return () => {
      window.removeEventListener("hashchange", syncLocation);
      window.removeEventListener("popstate", syncLocation);
    };
  }, [blogPageCount]);

  useEffect(() => {
    if (entranceState === "open" && !activeForm) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [entranceState, activeForm]);

  useEffect(() => {
    if (!activeForm) return;
    document.querySelector<HTMLButtonElement>('.form-sheet button[aria-label="Close form"]')?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveForm(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      formTrigger.current?.focus();
    };
  }, [activeForm]);

  function navigateTo(href: string) {
    if (window.location.hash !== href) window.history.pushState(null, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  function choosePage(page: PageId) {
    navigateTo(`#${page}`);
  }

  function enterSite() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntranceState("open");
      return;
    }
    setEntranceState("opening");
    window.setTimeout(() => setEntranceState("open"), 1050);
  }

  function openStoryForm(story: (typeof stories)[number], pro?: ProProfile) {
    formTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveForm({
      title: story.title,
      url: story.href.replace("/r/", "/embed/") + "?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
      preferredPro: pro?.name,
    });
  }

  function openBlogPost(post: ArchivedBlogPost) {
    navigateTo(blogHref(post));
  }

  function showBlogPage(page: number) {
    navigateTo(blogPageHref(page));
  }

  return (
    <main className="wbs-newspaper">
      {entranceState !== "open" && (
        <section className={`saloon-entry ${entranceState === "opening" ? "opening" : ""}`} aria-label="Welcome to World Bridge Services">
          <div className="saloon-sign">
            <span>World Bridge Services</span>
            <strong>The WBS Club</strong>
            <small>Professional Partners &amp; Bridge Lessons</small>
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
          <button className="saloon-door-hit-area" type="button" aria-label="Open the saloon doors" onClick={enterSite} disabled={entranceState === "opening"} />
          <button className="enter-button" type="button" onClick={enterSite} disabled={entranceState === "opening"}>
            <span>{entranceState === "opening" ? "Welcome In" : "Enter the Club"}</span>
            <small>{entranceState === "opening" ? "Opening the Gazette…" : "Push through the saloon doors"}</small>
          </button>
          <nav className="saloon-entry-nav" aria-label="WBS sections">
            {pages.map((page) => <a key={page.id} href={`#${page.id}`} onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); choosePage(page.id); } }}><span>{page.label}</span></a>)}
          </nav>
        </section>
      )}
      <div className="newspaper-content" inert={entranceState !== "open" || !!activeForm}>
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

      <nav className="section-nav" aria-label="Main navigation">
        {pages.map((page) => (
          <a
            className={activePage === page.id ? "active" : undefined}
            href={`#${page.id}`}
            aria-current={activePage === page.id ? "page" : undefined}
            onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); choosePage(page.id); } }}
            key={page.id}
          >
            <span>{page.label}</span>
          </a>
        ))}
      </nav>

      {activePage === "services" && (
        <article className="page-panel" id="services">
          <section className="page-fold front-hero" aria-labelledby="front-page-heading">
            <div className="hero-copy">
              <h2 className="hero-kicker" id="front-page-heading">Boutique Bridge Services</h2>
              <p className="hero-deck">WBS arranges <strong>professional bridge partners</strong>, <strong>private lessons</strong>, and <strong>group courses</strong>, online and at clubs and tournaments worldwide.</p>
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
          </section>
          <AgencyGuide onReadHistory={() => { setShowHistory(true); choosePage("services"); }} />
        </article>
      )}

      {activePage === "pros" && (
        <article className="page-panel" id="pros">
          {selectedPro ? <ProfessionalProfile pro={selectedPro} onNavigate={navigateTo} onEnquire={() => openStoryForm(stories[2], selectedPro)} /> : <section className="page-fold gallery-page" aria-labelledby="gallery-heading">
            <div className="gallery-heading">
              <h2 id="gallery-heading">The WBS Circle</h2>
              <span>Professional partners and teachers, online and in person</span>
            </div>
            <ProGroup title="Core Pros" pros={corePros} onNavigate={navigateTo} />
            <ProGroup title="Other Pros" pros={otherPros} onNavigate={navigateTo} />
            <p className="gallery-source">
              Portraits from WBS, public player profiles, Bridge Winners and ACBL tournament coverage, and the European Bridge League. Ed's portrait is from <a href="https://www.painlessdrz.com/" target="_blank" rel="noopener noreferrer">his professional website</a>. Ljudmila's authorized portrait is from <a href="https://www.math.stonybrook.edu/~kamenova/" target="_blank" rel="noopener noreferrer">her university page</a>, courtesy of the Oberwolfach archives.
            </p>
          </section>}
        </article>
      )}

      {activePage === "lessons" && <article className="page-panel" id="lessons"><TeachingProgram onContact={() => openStoryForm(stories[2])} onNavigate={navigateTo} /></article>}

      {activePage === "blogs" && (
        <article className="page-panel blog-panel" id="blogs">
          <section className="page-fold blog-page" aria-label="Blogs">
            <nav className="blogs-toolbar" aria-label={selectedBlogPost ? "Article navigation" : "Blog pages"}>
              {selectedBlogPost ? (
                <div className="blogs-toolbar-group">
                  <a className="blogs-all-posts" href="#blogs" onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); showBlogPage(1); } }}>All blogs</a>
                  <div className="blogs-chevron-nav">
                    {previousBlogPost
                      ? <a href={blogHref(previousBlogPost)} aria-label={`Previous article: ${blogDisplayTitle(previousBlogPost)}`} title="Previous article" onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); openBlogPost(previousBlogPost); } }}><span aria-hidden="true">{"<"}</span></a>
                      : <span aria-disabled="true"><span aria-hidden="true">{"<"}</span></span>}
                    {nextBlogPost
                      ? <a href={blogHref(nextBlogPost)} aria-label={`Next article: ${blogDisplayTitle(nextBlogPost)}`} title="Next article" onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); openBlogPost(nextBlogPost); } }}><span aria-hidden="true">{">"}</span></a>
                      : <span aria-disabled="true"><span aria-hidden="true">{">"}</span></span>}
                  </div>
                </div>
              ) : (
                <div className="blogs-toolbar-group">
                  <span className="blogs-all-posts">All blogs</span>
                  <div className="blogs-chevron-nav">
                    {blogPage > 1
                      ? <a href={blogPageHref(blogPage - 1)} aria-label="Previous page" title="Previous page" onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); showBlogPage(blogPage - 1); } }}><span aria-hidden="true">{"<"}</span></a>
                      : <span aria-disabled="true"><span aria-hidden="true">{"<"}</span></span>}
                    <span className="blogs-page-status">Page {blogPage} of {blogPageCount}</span>
                    {blogPage < blogPageCount
                      ? <a href={blogPageHref(blogPage + 1)} aria-label="Next page" title="Next page" onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); showBlogPage(blogPage + 1); } }}><span aria-hidden="true">{">"}</span></a>
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
                  {blogBodyBlocks(selectedBlogPost).map((block, index) => {
                    const key = `${selectedBlogPost.slug}-${index}`;
                    if (block.type === "divider") return <hr aria-hidden="true" key={key} />;
                    if (block.type === "heading") return <h3 className={`blog-section-heading blog-section-heading-${block.level}`} key={key}>{block.text}</h3>;
                    if (block.type === "seed-list") return <ol className="bridge-seeds" key={key}>{block.teams.map((team) => <li key={team}>{team}</li>)}</ol>;
                    if (block.type === "deal") return <BridgeDealDiagram block={block} key={key} />;
                    if (block.type === "auction") return <BridgeAuction block={block} key={key} />;
                    return <p className={block.type === "dateline" ? "blog-article-dateline" : undefined} key={key}>{renderLinkedText(block.text)}</p>;
                  })}
                </div>
              </article>
            ) : (
              <section className="blogs-front" aria-label={`Blog articles, page ${blogPage}`}>
                <div className="blogs-post-grid">
                  {blogPagePosts.map((post) => (
                    <a className="blogs-post-card" href={blogHref(post)} onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); openBlogPost(post); } }} key={post.slug}>
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

      </div>
      {activeForm && (
        <div className="form-modal" role="dialog" aria-modal="true" aria-label={activeForm.title}>
          <button className="form-backdrop" type="button" aria-label="Close form" onClick={() => setActiveForm(null)} />
          <div className="form-sheet">
            <header>
              <h2>{activeForm.title}</h2>
              <button type="button" onClick={() => setActiveForm(null)} aria-label="Close form">×</button>
            </header>
            {activeForm.preferredPro && <p className="form-preference"><strong>Preferred professional: {activeForm.preferredPro}.</strong> Please include this name in the questionnaire's additional details.</p>}
            <iframe src={activeForm.url} title={activeForm.title} loading="lazy" />
          </div>
        </div>
      )}
    </main>
  );
}

function Story({ story, minimal = false, onOpenForm }: { story: (typeof stories)[number]; minimal?: boolean; onOpenForm?: () => void }) {
  return (
    <article className={`story${minimal ? " minimal-story" : ""}`}>
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

function isPlainClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function ProGroup({ title, pros, onNavigate }: { title: string; pros: ProProfile[]; onNavigate: (href: string) => void }) {
  return (
    <section className="pro-group" aria-labelledby={`${title.toLowerCase().replace(" ", "-")}-heading`}>
      <header className="pro-group-heading">
        <h3 id={`${title.toLowerCase().replace(" ", "-")}-heading`}>{title}</h3>
        <span>{pros.length} professionals</span>
      </header>
      <div className="pro-grid">
        {pros.map((pro) => (
          <article className="pro-card" key={pro.name}>
            <a className="pro-portrait-link" href={profileHref(pro)} aria-label={`Read ${pro.name}'s profile`} onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); onNavigate(profileHref(pro)); } }}>
              <ProfessionalPortrait pro={pro} />
            </a>
            <div className="pro-card-copy">
              <h4><a href={profileHref(pro)} onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); onNavigate(profileHref(pro)); } }}>{pro.name}</a></h4>
              {pro.badge && <p className="pro-badge"><strong>{pro.badge}</strong></p>}
              <p className="pro-bio">{pro.introduction}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfessionalPortrait({ pro }: { pro: ProProfile }) {
  return pro.image ? <img src={pro.image} alt={pro.name} loading="lazy" style={{objectPosition: pro.imagePosition ?? "center 30%"}} /> : <div className="professional-monogram" aria-label={pro.name}><span aria-hidden="true">{pro.initials}</span></div>;
}

function ProfessionalProfile({ pro, onNavigate, onEnquire }: { pro: ProProfile; onNavigate: (href: string) => void; onEnquire: () => void }) {
  return <section className="professional-reader" aria-labelledby="professional-name">
    <a className="professional-back" href="#pros" onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); onNavigate("#pros"); } }}>&lt; Our Pros</a>
    <header className="professional-heading">
      <div className="professional-portrait"><ProfessionalPortrait pro={pro} />{pro.slug === "ljudmila-kamenova" && <small>Portrait: Oberwolfach archives</small>}</div>
      <div><p className="professional-specialty">{pro.specialty}</p><h2 id="professional-name">{pro.name}</h2>{pro.badge && <p className="pro-badge"><strong>{pro.badge}</strong></p>}<p className="professional-introduction">{pro.introduction}</p><p className="professional-location">{pro.location}{pro.agencyRole && <> · {pro.agencyRole}</>}</p></div>
    </header>
    <div className="professional-columns"><div className="professional-biography">{pro.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{pro.links && <nav className="professional-links" aria-label={`More from ${pro.name}`}>{pro.links.map((link) => <a href={link.href} key={link.href} {...(link.href.startsWith("https:") ? {target: "_blank", rel: "noopener noreferrer"} : {})} onClick={(event) => { if (link.href.startsWith("#") && isPlainClick(event)) { event.preventDefault(); onNavigate(link.href); } }}>{link.label}</a>)}</nav>}</div>
    <aside className="professional-facts"><h3>Highlights</h3><ul>{pro.highlights.map((item) => <li key={item}>{item}</li>)}</ul><h3>Playing &amp; Teaching</h3><p>{pro.formats.join(" · ")}</p><p className="professional-availability">{pro.availability ?? "Availability and fees are agreed with WBS before a booking is confirmed."}</p><button className="professional-enquiry" type="button" onClick={onEnquire}>Talk with an Agent</button></aside></div>
  </section>;
}

function AgencyGuide({ onReadHistory }: { onReadHistory: () => void }) {
  return <section className="agency-guide" aria-labelledby="agency-guide-heading">
    <header><h2 id="agency-guide-heading">About WBS</h2><p>Founded by Brian Glubok, WBS is a boutique agency matching bridge players with trusted professionals and teachers.</p></header>
    <div className="agency-guide-grid">
      <section><h3>Who We Are</h3><p>World champions, international players, experienced teachers, and trusted playing partners. Brian Glubok is President, Paulo Brum coordinates professional scheduling, and Hongbo Li serves as Executive Vice-President.</p></section>
      <section><h3>What We Offer</h3><p>Our core business is pairing clients and pros: online games on BBO or your preferred platform, club duplicates, and regional or national tournaments. Private instruction, partnership coaching, and small-group teaching are also available.</p></section>
      <section><h3>Our Story</h3><p>Brian began the operation during the 2020 lockdown. Paulo joined in 2023, and the WBS booth at the July 2026 Minneapolis Nationals marked another step in the agency's deliberate boutique growth.</p><a href="#services" onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); onReadHistory(); } }}>Read our founding story</a></section>
      <section><h3>Where We Play</h3><p>Online across time zones, and wherever bridge is played. Our professionals work in New York, Ohio, Florida, California, Europe, and on the international tournament circuit. In-person partnerships depend on the event and the professional's availability.</p></section>
      <section><h3>Our Purpose</h3><p>To better serve our clients, support our professionals, and help build institutions that contribute to the future of bridge. WBS is a commercial venture, but we also do it because bridge is so much fun.</p></section>
    </div>
  </section>;
}

function TeachingProgram({ onContact, onNavigate }: { onContact: () => void; onNavigate: (href: string) => void }) {
  return <section className="teaching-page" aria-labelledby="teaching-heading">
    <header className="teaching-heading">
      <h2 id="teaching-heading">Lessons &amp; Courses</h2>
      <p>Private coaching and small-group instruction with WBS professionals, online and in person.</p>
    </header>
    <div className="teaching-formats">
      <section>
        <h3>Private Lessons</h3>
        <p>Work one-to-one on bidding methods, declarer play, defense, or deals from your recent games. Your teacher can help you and your regular partner develop a more effective partnership.</p>
        <dl><dt>Format</dt><dd>Individual or partnership coaching</dd><dt>Location</dt><dd>Online or in person, by arrangement</dd></dl>
      </section>
      <section>
        <h3>Group Courses</h3>
        <p>Learn alongside a small group with an experienced teacher. WBS can arrange online teaching through Zoom, BBO, or RealBridge, with a topic and pace suited to the group.</p>
        <dl><dt>Format</dt><dd>Small-group classes</dd><dt>Schedule</dt><dd>Contact WBS for current topics and dates</dd></dl>
      </section>
    </div>
    <div className="teaching-programs">
      <section>
        <h3>Online Teaching Program</h3>
        <p><a href="#pros/ed-zuckerberg" onClick={(event) => { if (isPlainClick(event)) { event.preventDefault(); onNavigate("#pros/ed-zuckerberg"); } }}>Ed Zuckerberg</a> is helping develop WBS's online classes. Contact the agency for the current schedule and registration arrangements.</p>
      </section>
      <section>
        <h3>Aloha Bridge Center</h3>
        <p>WBS is also developing in-person bridge activities at the Aloha Bridge Center in Columbus, Ohio. Ask the agency about current teaching and playing opportunities.</p>
      </section>
    </div>
    <footer className="teaching-enquiries"><button className="professional-enquiry" type="button" onClick={onContact}>Enquire About Lessons</button><a href="https://www.wilsonovichbridge.com/instructional.html" target="_blank" rel="noopener noreferrer">System Notes</a></footer>
  </section>;
}
