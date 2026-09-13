"use client";

import Script from "next/script";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { findPro } from "./profiles";

declare global { interface Window { Tally?: {loadEmbeds: () => void}; } }

const serviceNames: Record<string, string> = {online: "online play", tournaments: "tournament partnerships", club: "club play", coaching: "coaching and hand analysis", lessons: "lessons", "private-lessons": "private lessons", "partnership-coaching": "partnership coaching", classes: "small groups and classes"};

export function RequestForm() {
  const params = useSearchParams();
  const pro = findPro(params.get("pro") ?? "");
  const service = serviceNames[params.get("service") ?? ""];
  const embedUrl = "https://tally.so/embed/LZBL1G?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
  return <div className="request-layout"><div>
    {(pro || service) && <div className="request-preference"><p>{pro ? <>Preferred professional: <strong>{pro.name}</strong></> : <>Interest: <strong>{service}</strong></>}</p><p>Mention this preference in the additional details so WBS can follow up on your request.</p>{pro && <Link href={`/pros/${pro.slug}/`}>Return to {pro.name.split(" ")[0]}'s profile</Link>}</div>}
    <iframe className="request-iframe" data-tally-src={embedUrl} src={embedUrl} title="Contact World Bridge Services" width="100%" height="860" loading="eager" />
    <Script id="wbs-tally-embed" src="https://tally.so/widgets/embed.js" strategy="afterInteractive" onReady={() => window.Tally?.loadEmbeds()} />
    <p className="request-fallback"><a href="https://tally.so/r/LZBL1G" target="_blank" rel="noopener noreferrer">Open the contact form in a separate tab</a></p>
  </div><aside className="request-aside"><h2>A personal arrangement</h2><p>Tell us what you want from your next bridge partnership or lesson. You do not need to choose a professional before contacting us.</p><ul><li>Online, club, and tournament play</li><li>Private and small-group teaching</li><li>Partnership coaching and deal review</li></ul><h2>What happens next?</h2><p>WBS will discuss your goals, suitable professionals, and the practical details with you. Availability and fees are agreed before booking.</p><p className="request-note">Your details are sent to WBS through its existing contact form. Submitting an enquiry does not make a booking or commit you to a fee.</p></aside></div>;
}
