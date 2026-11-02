# Multi-outlet QSR website

Informational brand site (no ordering/cart/payments/login) built with Next.js App Router, React, TypeScript, Tailwind CSS v4, Framer Motion, Lucide and Leaflet/OpenStreetMap.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit content (no code changes needed)

| What | File |
| --- | --- |
| Brand name, tagline, logo, hero photo, phone, email, social links, `showSampleNotices` | `src/data/brand.ts` |
| Outlets (add/remove/edit — pages, cards, map, footer, sitemap and SEO all follow) | `src/data/outlets.ts` |
| Menu categories & dishes, outlet-specific prices/availability | `src/data/menu.ts` |
| Gallery images & categories | `src/data/gallery.ts` |
| Customer reviews (section appears only when non-empty) | `src/data/testimonials.ts` |
| Colours / fonts | `src/app/globals.css`, `src/app/layout.tsx` |

Images: drop files in `public/images/...` and reference them as `{ src: "/images/menu/x.jpg", alt: "…" }`. Until `src` is set, a branded "Sample image" placeholder is shown. For remote images, add the host to `images.remotePatterns` in `next.config.ts`.

## Going live checklist

1. Replace every item marked **SAMPLE** (brand name, outlet names/addresses/phones, menu, prices, copy).
2. Enter surveyed outlet `latitude`/`longitude` and set `coordinatesVerified: true`. Until then pins are approximate locality positions, directions use the written address, and `geo` is omitted from structured data.
3. Add real photography and the logo.
4. Set `NEXT_PUBLIC_SITE_URL` (canonical URLs, sitemap, Open Graph).
5. Connect the contact form: replace the simulated submit in `src/components/contact/contact-form.tsx` (currently a labelled **demo**; nothing is sent).
6. Set `showSampleNotices: false` in `brand.ts`.

## Structure

```
src/app            routes (/, /about, /menu, /outlets, /outlets/[slug], /gallery, /contact, sitemap, robots)
src/components     layout, ui, home, menu, outlets, gallery, contact
src/data           all editable content (typed)
src/lib            helpers: open/closed status (IST), distance, directions, menu resolution, SEO/JSON-LD
src/types          TypeScript interfaces
```
