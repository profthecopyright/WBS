import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const modules = new Map();
function loadModule(path) {
  const file = resolve(path);
  if (modules.has(file)) return modules.get(file);
  const module = { exports: {} };
  modules.set(file, module.exports);
  vm.runInNewContext(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module, exports: module.exports,
    require: (name) => name.startsWith(".")
      ? loadModule([".ts", ".tsx"].map((extension) => resolve(dirname(file), name + extension)).find(existsSync))
      : require(name),
  }, { filename: file });
  return module.exports;
}

const { sitePaths, resolvePage, legacyHashPath } = loadModule("app/site-routes.ts");
const { pageMetadata, SITE_URL } = loadModule("app/seo.tsx");
const paths = sitePaths();
assert.equal(new Set(paths).size, paths.length);
for (const path of paths) {
  assert.equal(resolvePage(path).path, path);
  assert.equal(pageMetadata(path).alternates.canonical, SITE_URL + path);
}
for (const path of ["/missing/", "/blogs/page/0/", "/blogs/page/999/", "/blogs/page/2.5/", "/blogs/no-such-article/", "/pros/unknown/", "/services/extra/"]) {
  assert.equal(resolvePage(path), null, path);
}
for (const [hash, path] of [
  ["#front", "/services/"], ["#services", "/services/"], ["#inside", "/pros/"],
  ["#inside/about", "/services/"], ["#inside/resources", "/courses/"],
  ["#inside/pros/brian-glubok", "/pros/brian-glubok/"],
  ["#pros/sam-hwang", "/pros/sam-kwang/"], ["#lessons", "/courses/"],
  ["#blog", "/blogs/"], ["#blogs/archive/2024", "/blogs/"],
  ["#blogs/page/2", "/blogs/page/2/"], ["#blogs/page/99", "/blogs/"],
  ["#blogs/five-and-a-beer", "/blogs/five-and-a-beer/"],
  ["#pros/jackie-thomas", "/pros/jackie-thomas/"], ["#board-26", null], ["", null],
]) assert.equal(legacyHashPath(hash), path, hash);

if (process.argv.includes("--built")) {
  const titles = new Set();
  for (const path of paths) {
    const html = readFileSync(`out${path}index.html`, "utf8");
    const page = resolvePage(path);
    const metadata = pageMetadata(path);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `Missing or duplicated title: ${path}`);
    titles.add(title);
    assert.ok(html.includes(`<link rel="canonical" href="${metadata.alternates.canonical}"/>`), path);
    assert.ok(html.includes('<meta name="robots" content="index, follow"/>'), path);
    assert.ok(!/<meta[^>]+content="[^"]*noindex/.test(html), path);
    assert.ok(!/href="#(?:pros|blogs|services|courses)/.test(html), path);
    for (const match of html.matchAll(/href="(\/(?!\/)[^"#?]*)"/g)) {
      const href = match[1];
      if (href.startsWith("/_next/") || /\.[a-z0-9]+$/i.test(href)) continue;
      assert.ok(existsSync(`out${href}index.html`), `Broken internal link on ${path}: ${href}`);
    }
    const body = html.split("</head>")[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    if (page.pro) assert.ok(body.includes("professional-biography") && body.includes("professional-name"), path);
    if (page.post) assert.ok(body.includes("blog-article-body") && body.includes("blog-article-byline"), path);
    if (path !== "/") assert.ok(!html.includes('class="saloon-entry '), path);
    const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .flatMap((match) => JSON.parse(match[1])["@graph"] ?? []);
    assert.ok(graph.some((item) => item["@type"] === "WebSite"), path);
    if (page.post) {
      const article = graph.find((item) => item["@type"] === "BlogPosting");
      assert.equal(article.datePublished, page.post.date);
      assert.deepEqual(article.author.map((author) => author.name), page.post.author.split(" and "));
    }
  }
  const sitemap = readFileSync("out/sitemap.xml", "utf8");
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, paths.length);
  for (const path of paths) assert.ok(sitemap.includes(`<loc>${SITE_URL}${path}</loc>`));
  const robots = readFileSync("out/robots.txt", "utf8");
  assert.ok(robots.includes("Allow: /") && robots.includes("Sitemap: " + SITE_URL + "/sitemap.xml"));
  assert.ok(!robots.includes("Disallow: /"));
  assert.ok(readFileSync("out/404.html", "utf8").includes('content="noindex"'));
}
console.log(`Verified ${paths.length} crawlable pages, unique metadata, canonical URLs, structured data, and legacy links${process.argv.includes("--built") ? ", including exported HTML, robots.txt and sitemap.xml" : ""}.`);
