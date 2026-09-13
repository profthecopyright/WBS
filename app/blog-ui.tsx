import { Fragment } from "react";
import type { ArchivedBlogPost } from "./blog-posts";

export const BLOGS_PER_PAGE = 9;
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

export function blogDisplayTitle(post: ArchivedBlogPost) {
  return editorialBlogTitles[post.slug] ?? post.title;
}

export function blogStandfirst(post: ArchivedBlogPost) {
  if (editorialBlogStandfirsts[post.slug]) return editorialBlogStandfirsts[post.slug];

  const firstParagraph = blogBodyBlocks(post).find((block) => block.type === "paragraph");
  const text = post.excerpt || (firstParagraph?.type === "paragraph" ? firstParagraph.text : "");
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

export function blogHref(post: ArchivedBlogPost) {
  return `/blogs/${post.slug}/`;
}

export function blogPageHref(page: number) {
  return page === 1 ? "/blogs/" : `/blogs/page/${page}/`;
}

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" })
    .format(new Date(`${value}T12:00:00`));
}


export function BlogBody({ post }: { post: ArchivedBlogPost }) {
  return <div className="blog-article-body">{blogBodyBlocks(post).map((block, index) => {
    const key = `${post.slug}-${index}`;
    if (block.type === "divider") return <hr aria-hidden="true" key={key} />;
    if (block.type === "heading") return <h2 className={`blog-section-heading blog-section-heading-${block.level}`} key={key}>{block.text}</h2>;
    if (block.type === "seed-list") return <ol className="bridge-seeds" key={key}>{block.teams.map((team) => <li key={team}>{team}</li>)}</ol>;
    if (block.type === "deal") return <BridgeDealDiagram block={block} key={key} />;
    if (block.type === "auction") return <BridgeAuction block={block} key={key} />;
    return <p className={block.type === "dateline" ? "blog-article-dateline" : undefined} key={key}>{renderLinkedText(block.text)}</p>;
  })}</div>;
}
