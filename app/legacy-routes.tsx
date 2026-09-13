"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LegacyRoutes() {
  const router = useRouter();
  useEffect(() => {
    function resolveHash() {
      const hash = window.location.hash.slice(1);
      const [section, ...rest] = hash.split("/");
      if (section === "blogs" || section === "blog") {
        const tail = rest.filter(Boolean).map(encodeURIComponent).join("/");
        router.replace(`/blogs/${tail ? `${tail}/` : ""}`);
      } else if (section === "inside") {
        router.replace("/pros/");
      } else if (section === "a3") {
        router.replace("/blogs/");
      } else if (section === "front") {
        window.history.replaceState(null, "", "/");
      }
    }
    resolveHash();
    window.addEventListener("hashchange", resolveHash);
    return () => window.removeEventListener("hashchange", resolveHash);
  }, [router]);
  return null;
}
