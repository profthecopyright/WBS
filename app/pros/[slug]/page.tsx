import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPro, proProfiles } from "../../profiles";
import { ProfilePage } from "../../site-pages";

export function generateStaticParams() { return proProfiles.map((pro) => ({slug: pro.slug})); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{slug: string}> }): Promise<Metadata> {
  const pro = findPro((await params).slug);
  return {title: pro ? `${pro.name} | World Bridge Services` : "Professional not found | WBS", description: pro?.introduction};
}
export default async function Page({ params }: { params: Promise<{slug: string}> }) {
  const pro = findPro((await params).slug);
  if (!pro) notFound();
  return <ProfilePage pro={pro} />;
}
