import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const origin = "https://www.wilsonovichbridge.com";
const archiveMonths = ["10-2024", "09-2024", "08-2024", "07-2024", "06-2024", "05-2024", "04-2024", "03-2024"];

function decodeEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    bull: "•",
    copy: "©",
    egrave: "è",
    hellip: "…",
    ldquo: "“",
    lsquo: "‘",
    mdash: "—",
    middot: "·",
    nbsp: " ",
    ndash: "–",
    quot: '"',
    rdquo: "”",
    rsquo: "’",
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, key) => {
    if (key.startsWith("#")) {
      const hexadecimal = key[1].toLowerCase() === "x";
      const codePoint = Number.parseInt(key.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
    }
    return named[key.toLowerCase()] ?? entity;
  });
}

function stripMarkup(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<iframe[^>]+src=["']([^"']+)["'][\s\S]*?<\/iframe>/gi, "\n\nVideo: https:$1\n\n")
      .replace(/<br\s*\/?\s*>/gi, "\n")
      .replace(/<\/(?:div|p|h[1-6]|li|blockquote)>/gi, "\n\n")
      .replace(/<li[^>]*>/gi, "• ")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/\u200b/g, "")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function absoluteUrl(value) {
  if (value.startsWith("//")) return `https:${value}`;
  return new URL(value, origin).toString();
}

function normalizeDate(value) {
  const [month, day, year] = value.split("/").map(Number);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function excerptFrom(body) {
  const sentence = body.replace(/\s+/g, " ").trim();
  if (sentence.length <= 230) return sentence;
  const clipped = sentence.slice(0, 230);
  return `${clipped.slice(0, clipped.lastIndexOf(" "))}…`;
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to fetch ${url}: ${response.status}`);
  return response.text();
}

async function archiveEntries(month) {
  const html = await fetchText(`${origin}/diary-of-a-bridge-pro/archives/${month}`);
  const titleMatches = [...html.matchAll(/<a class="blog-title-link blog-link" href="([^"]+)">([\s\S]*?)<\/a>/g)];
  const dates = [...html.matchAll(/<span class="date-text">\s*([^<]+?)\s*<\/span>/g)];

  return titleMatches.map((match, index) => ({
    title: stripMarkup(match[2]),
    date: normalizeDate(dates[index][1].trim()),
    sourceUrl: absoluteUrl(match[1]),
  }));
}

async function importPost(entry) {
  const html = await fetchText(entry.sourceUrl);
  const content = html.match(/<div class="blog-content">([\s\S]*?)(?=<div class="blog-social)/)?.[1];
  if (!content) throw new Error(`No article body found for ${entry.sourceUrl}`);

  const body = stripMarkup(content);
  return {
    ...entry,
    slug: new URL(entry.sourceUrl).pathname.split("/").filter(Boolean).at(-1),
    author: "Brian Glubok",
    series: "Diary of a Bridge Pro",
    excerpt: excerptFrom(body),
    body,
  };
}

const entries = (await Promise.all(archiveMonths.map(archiveEntries))).flat();
const posts = await Promise.all(entries.map(importPost));
posts.sort((left, right) => right.date.localeCompare(left.date));

const output = `// Migrated from wilsonovichbridge.com. New posts can be added as records below.\n\nexport type ArchivedBlogPost = {\n  slug: string;\n  title: string;\n  date: string;\n  author: string;\n  series: string;\n  excerpt: string;\n  body: string;\n  sourceUrl: string;\n};\n\nexport const archivedBlogPosts: ArchivedBlogPost[] = ${JSON.stringify(posts, null, 2)};\n`;
await writeFile(resolve("app/blog-posts.ts"), output, "utf8");
console.log(`Imported ${posts.length} posts into app/blog-posts.ts`);
