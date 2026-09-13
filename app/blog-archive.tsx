"use client";

import Link from "next/link";
import { useState } from "react";

export type BlogSummary = {slug: string; title: string; author: string; date: string; displayDate: string};

export function BlogArchive({ posts }: { posts: BlogSummary[] }) {
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const authors = [...new Set(posts.map((post) => post.author))];
  const years = [...new Set(posts.map((post) => post.date.slice(0, 4)))];
  const query = search.trim().toLocaleLowerCase();
  const matches = posts.filter((post) => (!author || post.author === author) && (!year || post.date.startsWith(year)) && (!query || `${post.title} ${post.author}`.toLocaleLowerCase().includes(query)));
  const groups = years.map((groupYear) => ({year: groupYear, posts: matches.filter((post) => post.date.startsWith(groupYear))})).filter((group) => group.posts.length);
  return <><div className="archive-tools"><label>Search<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} /></label><label>Author<select value={author} onChange={(event) => setAuthor(event.target.value)}><option value="">All authors</option>{authors.map((name) => <option key={name}>{name}</option>)}</select></label><label>Year<select value={year} onChange={(event) => setYear(event.target.value)}><option value="">All years</option>{years.map((value) => <option key={value}>{value}</option>)}</select></label></div>
    <p className="archive-result-count" role="status">{matches.length} {matches.length === 1 ? "article" : "articles"}</p>
    {groups.map((group) => <section className="archive-year" key={group.year}><h2>{group.year}</h2><ul>{group.posts.map((post) => <li key={post.slug}><Link href={`/blogs/${post.slug}/`}><time dateTime={post.date}>{post.displayDate}</time><h3>{post.title}</h3><span>{post.author}</span></Link></li>)}</ul></section>)}
    {!matches.length && <p className="archive-empty">No articles match these filters. <button type="button" className="text-button" onClick={() => {setSearch(""); setAuthor(""); setYear("");}}>Clear filters</button></p>}
  </>;
}
