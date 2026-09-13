import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

// Execute trusted content modules without creating generated source files.
function loadContent(relativePath) {
  const source = readFileSync(resolve(root, relativePath), "utf8");
  const { outputText } = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX}});
  const module = {exports: {}};
  runInNewContext(outputText, {module, exports: module.exports, require, URLSearchParams}, {filename: relativePath});
  return module.exports;
}

const {proProfiles, requestHref} = loadContent("app/profiles.ts");
const {archivedBlogPosts} = loadContent("app/blog-posts.ts");
const {BlogBody, blogHref, blogPageHref, blogDisplayTitle} = loadContent("app/blog-ui.tsx");
const routes = new Set(["/", "/pros/", "/services/", "/lessons/", "/about/", "/request/", "/blogs/", "/blogs/archive/"]);
assert.equal(new Set(proProfiles.map((pro) => pro.slug)).size, proProfiles.length, "Duplicate professional slug");
assert.equal(new Set(archivedBlogPosts.map((post) => post.slug)).size, archivedBlogPosts.length, "Duplicate article slug");
for (const pro of proProfiles) {
  assert(pro.paragraphs.length >= 2, `Incomplete biography: ${pro.name}`);
  assert(pro.highlights.length && pro.formats.length, `Missing profile details: ${pro.name}`);
  assert(!/exclusive/i.test(JSON.stringify(pro)), `Unconfirmed exclusivity: ${pro.name}`);
  if (pro.image) assert(existsSync(resolve(root, "public", pro.image.slice(1))), `Missing portrait: ${pro.name}`);
  assert.equal(new URL(requestHref(pro), "https://worldbridge.services").searchParams.get("pro"), pro.slug);
  routes.add(`/pros/${pro.slug}/`);
}
assert(!proProfiles.some((pro) => /Keith Hafen|Shannon Cappelletti/.test(pro.name)), "Pending recruits must not have public routes");
for (const post of archivedBlogPosts) {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(post.date) && !Number.isNaN(Date.parse(post.date)), `Invalid article date: ${post.slug}`);
  assert(post.author && post.body && blogDisplayTitle(post), `Incomplete article: ${post.slug}`);
  const html = renderToStaticMarkup(BlogBody({post}));
  assert(html.length > 100, `Empty reader: ${post.slug}`);
  assert(!html.includes("Originally published by Wilsonovich Bridge Services"), "Source disclaimer was reintroduced");
  if (post.slug === "five-and-a-beer") assert(html.includes('href="https://live.acbl.org/event/2609120/01A/2/board-detail/H?board_num=26"'), "The ACBL link must remain clickable");
  if (post.slug === "spingold-26-lets-go-dutch") assert(html.includes("bridge-deal") && html.includes("bridge-auction"), "Bridge diagrams and auctions must be retained");
  routes.add(blogHref(post));
}
const pageCount = Math.ceil(archivedBlogPosts.length / 9);
for (let page = 1; page <= pageCount; page++) routes.add(`/blogs/page/${page}/`);
assert.equal(blogPageHref(1), "/blogs/");

function sourceFiles(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap((entry) => entry.isDirectory() ? sourceFiles(resolve(directory, entry.name)) : entry.name.endsWith(".tsx") ? [resolve(directory, entry.name)] : []);
}
for (const path of sourceFiles(resolve(root, "app"))) {
  const source = readFileSync(path, "utf8");
  assert(!/^(<<<<<<<|=======|>>>>>>>)/m.test(source), `Conflict marker in ${path}`);
  const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    if (ts.isJsxAttribute(node) && node.name.getText(ast) === "href" && node.initializer && ts.isStringLiteral(node.initializer)) {
      const href = node.initializer.text;
      if (href.startsWith("/")) assert(routes.has(href.split(/[?#]/)[0]), `Unknown internal link: ${href}`);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}

if (process.argv.includes("--export")) {
  for (const route of routes) {
    assert(existsSync(resolve(root, "out", route.slice(1), "index.html")), `Missing exported page: ${route}`);
  }
  for (const path of ["out/index.html", "out/pros/index.html", "out/blogs/five-and-a-beer/index.html"]) {
    const html = readFileSync(resolve(root, path), "utf8");
    assert(html.includes('aria-label="Main navigation"'), `Missing shared navigation: ${path}`);
    assert(!html.includes('class="saloon-entry"'), `Entrance gate returned: ${path}`);
  }
}
console.log(`Verified ${proProfiles.length} profiles, ${archivedBlogPosts.length} article renderers, ${routes.size} routes, portraits, and internal links.`);
