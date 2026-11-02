import type { Outlet, OpeningSlot } from "@/types";

/**
 * OUTLETS — single source of truth for cards, maps, detail pages, footer, sitemap and SEO.
 * To add an outlet, append one object here. Nothing else needs to change.
 *
 * SAMPLE DATA: names, street addresses and phone numbers below are placeholders.
 * Coordinates are approximate locality centres only (coordinatesVerified: false);
 * replace with surveyed outlet coordinates and flip the flag to true.
 */

const everyDay = (open: string, close: string): OpeningSlot => ({
  days: [0, 1, 2, 3, 4, 5, 6],
  open,
  close,
});

export const outlets: Outlet[] = [
  {
    id: "out-gn",
    name: "Greater Noida Outlet",
    slug: "greater-noida",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    locality: "Knowledge Park",
    completeAddress: "[Sample] Shop No. 00, Knowledge Park, Greater Noida, Uttar Pradesh",
    phone: "+91 00000 00001",
    email: "greaternoida@example.com",
    latitude: 28.4595,
    longitude: 77.5025,
    coordinatesVerified: false,
    openingHours: [everyDay("10:00", "23:00")],
    images: [{ alt: "Greater Noida outlet — sample image" }, { alt: "Greater Noida outlet seating — sample image" }, { alt: "Greater Noida outlet counter — sample image" }],
    facilities: ["Dine-in", "Takeaway", "Air conditioned", "Family seating", "Parking nearby"],
    activeStatus: true,
    description: "Our flagship neighbourhood outlet — a bright, relaxed space for quick lunches and late-evening cravings.",
  },
  {
    id: "out-pc",
    name: "Pari Chowk Outlet",
    slug: "pari-chowk",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    locality: "Pari Chowk",
    completeAddress: "[Sample] Shop No. 00, Pari Chowk, Greater Noida, Uttar Pradesh",
    phone: "+91 00000 00002",
    email: "parichowk@example.com",
    latitude: 28.4744,
    longitude: 77.503,
    coordinatesVerified: false,
    openingHours: [everyDay("11:00", "23:30")],
    images: [{ alt: "Pari Chowk outlet — sample image" }, { alt: "Pari Chowk outlet interior — sample image" }],
    facilities: ["Dine-in", "Takeaway", "Air conditioned", "Wi-Fi", "Parking nearby"],
    activeStatus: true,
    description: "A busy, energetic outlet right on the Pari Chowk circle — built for grab-and-go and group hangouts.",
  },
  {
    id: "out-a1",
    name: "Alpha 1 Outlet",
    slug: "alpha-1",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    locality: "Alpha 1",
    completeAddress: "[Sample] Shop No. 00, Alpha 1 Commercial Belt, Greater Noida, Uttar Pradesh",
    phone: "+91 00000 00003",
    email: "alpha1@example.com",
    latitude: 28.4721,
    longitude: 77.5148,
    coordinatesVerified: false,
    openingHours: [
      { days: [0, 1, 2, 3, 4], open: "10:30", close: "23:00" },
      { days: [5, 6], open: "10:30", close: "00:30" },
    ],
    images: [{ alt: "Alpha 1 outlet — sample image" }, { alt: "Alpha 1 outlet seating — sample image" }],
    facilities: ["Dine-in", "Takeaway", "Air conditioned", "Family seating", "Wi-Fi"],
    activeStatus: true,
    description: "Open later on weekends — the go-to spot for post-movie and weekend-evening bites.",
  },
  {
    id: "out-nd",
    name: "Noida Outlet",
    slug: "noida",
    city: "Noida",
    state: "Uttar Pradesh",
    locality: "Noida Central",
    completeAddress: "[Sample] Shop No. 00, Sector 00, Noida, Uttar Pradesh",
    phone: "+91 00000 00004",
    email: "noida@example.com",
    latitude: 28.5355,
    longitude: 77.391,
    coordinatesVerified: false,
    openingHours: [everyDay("10:00", "23:30")],
    images: [{ alt: "Noida outlet — sample image" }, { alt: "Noida outlet interior — sample image" }],
    facilities: ["Dine-in", "Takeaway", "Air conditioned", "Family seating", "Wi-Fi", "Parking nearby"],
    activeStatus: true,
    description: "Our Noida outlet brings the full menu to the heart of the city.",
  },
];
