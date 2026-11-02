/**
 * BRAND CONFIGURATION — edit this file to rebrand the whole website.
 *
 * Everything marked SAMPLE is placeholder content, not real business information.
 * Replace it before launch (see README.md → "Going live checklist").
 */
export const brand = {
  /** SAMPLE working name — replace with the real brand name. */
  name: "Bite Republic",
  tagline: "Big Flavours. Fresh Bites. Unforgettable Moments.",
  cuisine: "Quick Service · Multi-cuisine",
  description:
    "A quick-service kitchen built around fresh ingredients, bold flavours and fast, friendly service — now at four outlets across Noida and Greater Noida.",
  primaryCity: "Greater Noida",

  /** Path under /public, e.g. "/brand/logo.svg". When empty a typographic logo is rendered. */
  logo: undefined as string | undefined,
  /** Optional full-bleed hero photograph, e.g. "/images/hero.jpg". */
  heroImage: undefined as string | undefined,

  /** SAMPLE contact details. */
  phone: "+91 00000 00000",
  email: "hello@example.com",
  address: "[Sample] Registered office address, Greater Noida, Uttar Pradesh",

  /** Used for canonical URLs, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",

  /** SAMPLE links — point these to the real profiles. Empty strings are hidden. */
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    x: "https://x.com/",
    youtube: "https://www.youtube.com/",
  },

  /** Shows the "sample content" notices across the site. Set to false when real data is in. */
  showSampleNotices: true,
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/menu", label: "Our Menu" },
  { href: "/outlets", label: "Our Outlets" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
] as const;
