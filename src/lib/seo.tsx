import type { Metadata } from "next";
import { brand } from "@/data/brand";
import type { Outlet } from "@/types";

export const absoluteUrl = (path = "/") => `${brand.siteUrl.replace(/\/$/, "")}${path}`;

/** Page metadata helper with canonical + Open Graph defaults. */
export function pageMetadata(opts: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = absoluteUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} | ${brand.name}`,
      description: opts.description,
      url,
      siteName: brand.name,
      type: "website",
      locale: "en_IN",
      ...(opts.image ? { images: [{ url: absoluteUrl(opts.image) }] } : {}),
    },
    twitter: { card: "summary_large_image", title: `${opts.title} | ${brand.name}`, description: opts.description },
  };
}

const DAY_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function brandJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl("/#restaurant"),
    name: brand.name,
    description: brand.description,
    url: absoluteUrl("/"),
    servesCuisine: brand.cuisine,
    telephone: brand.phone,
    email: brand.email,
    ...(brand.logo ? { logo: absoluteUrl(brand.logo), image: absoluteUrl(brand.logo) } : {}),
    sameAs: Object.values(brand.social).filter(Boolean),
  };
}

export function outletJsonLd(outlet: Outlet) {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": absoluteUrl(`/outlets/${outlet.slug}#outlet`),
    name: `${brand.name} — ${outlet.name}`,
    url: absoluteUrl(`/outlets/${outlet.slug}`),
    description: outlet.description ?? brand.description,
    telephone: outlet.phone,
    ...(outlet.email ? { email: outlet.email } : {}),
    servesCuisine: brand.cuisine,
    parentOrganization: { "@id": absoluteUrl("/#restaurant") },
    address: {
      "@type": "PostalAddress",
      streetAddress: outlet.completeAddress,
      addressLocality: outlet.city,
      addressRegion: outlet.state,
      addressCountry: "IN",
    },
    // Only publish geo once real coordinates are confirmed.
    ...(outlet.coordinatesVerified
      ? { geo: { "@type": "GeoCoordinates", latitude: outlet.latitude, longitude: outlet.longitude } }
      : {}),
    openingHoursSpecification: outlet.openingHours.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days.map((d) => DAY_SCHEMA[d]),
      opens: s.open,
      closes: s.close,
    })),
    amenityFeature: outlet.facilities.map((f) => ({ "@type": "LocationFeatureSpecification", name: f, value: true })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
