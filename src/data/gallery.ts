import type { GalleryCategory, GalleryImage } from "@/types";

/** Gallery categories shown as filters. */
export const galleryCategories: { slug: GalleryCategory; label: string }[] = [
  { slug: "signature-food", label: "Signature Food" },
  { slug: "burgers-snacks", label: "Burgers & Snacks" },
  { slug: "interiors", label: "Restaurant Interiors" },
  { slug: "outlets", label: "Outlets" },
  { slug: "kitchen", label: "Kitchen & Preparation" },
  { slug: "brand-moments", label: "Brand Moments" },
];

type G = [category: GalleryCategory, caption: string, ratio: GalleryImage["ratio"]];

/**
 * SAMPLE placeholders. Add `image: { src: "/images/gallery/xyz.jpg", alt: "…" }`
 * to a row (or replace the list) once real photographs are available.
 */
const rows: G[] = [
  ["signature-food", "Signature burger, fresh off the grill", "tall"],
  ["burgers-snacks", "Crispy snacks, golden and hot", "landscape"],
  ["interiors", "Warm, bright dining area", "square"],
  ["outlets", "Our Pari Chowk storefront", "landscape"],
  ["kitchen", "Fresh ingredients, prepped daily", "portrait"],
  ["brand-moments", "Friends sharing a table", "square"],
  ["signature-food", "Paneer tikka roll", "portrait"],
  ["burgers-snacks", "Peri peri fries", "square"],
  ["interiors", "Counter and open kitchen", "landscape"],
  ["outlets", "Greater Noida outlet", "tall"],
  ["kitchen", "On the line, in the rush", "landscape"],
  ["brand-moments", "Weekend evenings", "portrait"],
  ["signature-food", "Margherita, straight from the oven", "square"],
  ["burgers-snacks", "Chicken popcorn", "portrait"],
  ["interiors", "Cosy corner seating", "tall"],
  ["outlets", "Alpha 1 outlet at night", "square"],
];

export const galleryImages: GalleryImage[] = rows.map(([category, caption, ratio], i) => ({
  id: `gal-${i + 1}`,
  category,
  caption,
  ratio,
  image: { alt: `${caption} — sample placeholder` },
}));
