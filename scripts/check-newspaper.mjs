import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import ts from 'typescript';

const baseline = 'af252253c143fbb98605b3aab389854ab070daaa';
const normalize = (text) => text.replace(/\r\n/g, '\n').trim();
const original = (path) => execFileSync('git', ['show', `${baseline}:${path}`], {encoding: 'utf8'});
for (const path of ['app/globals.css', 'app/weather.tsx', 'app/blog-posts.ts', '.openai/hosting.json']) {
  assert.equal(normalize(readFileSync(path, 'utf8')), normalize(original(path)), `${path} must preserve the deployed baseline`);
}

const sandbox = {exports: {}};
vm.runInNewContext(ts.transpileModule(readFileSync('app/profiles.ts', 'utf8'), {
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022}
}).outputText, sandbox);
const {proProfiles, corePros, otherPros, profileHref} = sandbox.exports;
assert.equal(proProfiles.length, 15);
assert.equal(corePros.length, 5);
assert.equal(otherPros.length, 10);
assert.equal(new Set([...corePros, ...otherPros].map((pro) => pro.slug)).size, 15);
assert.equal(new Set(proProfiles.map((pro) => pro.slug)).size, 15);
for (const pro of proProfiles) {
  assert.match(pro.slug, /^[a-z]+(?:-[a-z]+)*$/);
  assert.ok(pro.paragraphs.length >= 2 && pro.paragraphs.every((text) => text.trim()) && pro.paragraphs.join(' ').length > 300, pro.name);
  assert.ok(pro.introduction && pro.location && pro.specialty && pro.formats.length && pro.highlights.length, pro.name);
  assert.equal(profileHref(pro), `#inside/pros/${pro.slug}`);
  if (pro.image) assert.ok(existsSync(`public${pro.image}`), `Missing portrait: ${pro.name}`);
  for (const link of pro.links ?? []) assert.match(link.href, /^(https:\/\/|#blogs)/);
}
assert.equal(proProfiles.find((pro) => pro.slug === 'bob-hamman').badge, 'Available exclusively through WBS');
assert.ok(proProfiles.find((pro) => pro.slug === 'ljudmila-kamenova').image);
assert.ok(proProfiles.find((pro) => pro.slug === 'ed-zuckerberg').image);
assert.ok(!proProfiles.some((pro) => /keith-hafen|shannon-cappelletti/.test(pro.slug)));

const currentPage = readFileSync('app/page.tsx', 'utf8');
const parse = (text) => ts.createSourceFile('page.tsx', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const currentTree = parse(currentPage);
const functions = new Map(currentTree.statements.filter(ts.isFunctionDeclaration).map((node) => [node.name?.text, node]));
let preservedHelpers = 0;
for (const node of parse(original('app/page.tsx')).statements.filter(ts.isFunctionDeclaration)) {
  if (['Home', 'Story', 'ProGroup'].includes(node.name?.text)) continue;
  assert.equal(normalize(functions.get(node.name?.text)?.getText() ?? ''), normalize(node.getText()), `Changed article helper: ${node.name?.text}`);
  preservedHelpers++;
}
for (const url of ['https://tally.so/r/RG11B9', 'https://tally.so/r/D499lZ', 'https://tally.so/r/LZBL1G']) assert.ok(currentPage.includes(url));
assert.ok(currentPage.includes('Boutique Bridge Services'));
assert.ok(currentPage.includes('What Would You Like to Do Next?'));
assert.ok(currentPage.includes('Talk with Brian'));
assert.ok(currentPage.includes('Get a Free Play'));
assert.ok(currentPage.includes('Hatch, Match and Dispatch'));
assert.ok(!/What Players Say|Jane Doe|testimonials/.test(currentPage));
assert.ok(currentPage.includes('window.history.pushState'));
assert.ok(currentPage.includes('window.addEventListener("popstate"'));
assert.ok(currentPage.includes('window.addEventListener("hashchange"'));
assert.ok(currentPage.indexOf('aria-labelledby="gallery-heading"') < currentPage.indexOf('aria-labelledby="inside-heading"'));
for (const font of ['libre-caslon-text-regular-400.ttf', 'libre-caslon-text-italic-400.ttf', 'libre-caslon-text-bold-700.ttf', 'unifrakturcook-bold-700.ttf']) assert.ok(existsSync(`public/fonts/${font}`));
console.log(`Verified original theme, weather, all blog content, ${preservedHelpers} article helpers, 15 profiles, bundled portraits/fonts, and three enquiry paths.`);
