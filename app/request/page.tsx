import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteShell, PageHeading } from "../site-elements";
import { RequestForm } from "../request-form";
export const metadata: Metadata = {title: "Request a Professional | World Bridge Services", description: "Tell WBS your plans for professional bridge play, lessons, or coaching."};
export default function Page() { return <SiteShell active="request"><PageHeading title="Request a Pro">Tell us your playing or learning goals. We will help find a suitable professional and discuss the arrangements with you.</PageHeading><Suspense fallback={<p>Loading the contact form...</p>}><RequestForm /></Suspense></SiteShell>; }
