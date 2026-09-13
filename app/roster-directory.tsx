"use client";

import { useState } from "react";
import { proProfiles } from "./profiles";
import { ProCard } from "./site-elements";

export function RosterDirectory() {
  const [format, setFormat] = useState("");
  const profiles = format ? proProfiles.filter((pro) => pro.formats.includes(format) || (format === "Lessons" && pro.formats.includes("Coaching"))) : proProfiles;
  return <>
    <div className="directory-tools">
      <span aria-live="polite">{profiles.length} professionals</span>
      <label>Format <select value={format} onChange={(event) => setFormat(event.target.value)}><option value="">All formats</option>{["Online play", "Tournaments", "Club play", "Lessons", "Hand analysis"].map((mode) => <option value={mode} key={mode}>{mode === "Lessons" ? "Lessons & coaching" : mode}</option>)}</select></label>
    </div>
    <div className="roster-grid">{profiles.map((pro) => <ProCard pro={pro} key={pro.slug} />)}</div>
  </>;
}
