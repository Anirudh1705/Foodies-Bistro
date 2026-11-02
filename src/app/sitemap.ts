import type { MetadataRoute } from "next";
import { getActiveOutlets } from "@/lib/outlets";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/menu", priority: 0.9 },
    { path: "/outlets", priority: 0.9 },
    { path: "/gallery", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified, changeFrequency: "monthly" as const, priority: p.priority })),
    ...getActiveOutlets().map((o) => ({
      url: absoluteUrl(`/outlets/${o.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
