/** Shared domain types. Every page reads from these via the data layer in /src/data. */

export interface ImageAsset {
  /** Path under /public (e.g. "/images/menu/veg-burger.jpg") or an allowed remote URL.
   *  Leave undefined to render the branded placeholder. */
  src?: string;
  alt: string;
}

export type DietaryType = "veg" | "non-veg" | "egg";

/** Opening hours slot. `days` uses 0 = Sunday … 6 = Saturday. Times are 24h "HH:mm" (IST).
 *  A close time earlier than the open time (e.g. "00:30") means the outlet closes after midnight. */
export interface OpeningSlot {
  days: number[];
  open: string;
  close: string;
}

export interface Outlet {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  locality: string;
  completeAddress: string;
  phone: string;
  email?: string;
  latitude: number;
  longitude: number;
  /** true only once exact surveyed coordinates have been entered. While false the map shows
   *  an "approximate location" note and directions use the written address. */
  coordinatesVerified: boolean;
  openingHours: OpeningSlot[];
  /** First image is used as the banner / card image. */
  images: ImageAsset[];
  facilities: string[];
  activeStatus: boolean;
  description?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  /** Key into the icon map in /src/lib/icons.ts */
  icon: string;
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  /** MenuCategory.slug */
  category: string;
  description: string;
  image?: ImageAsset;
  /** Base price in INR. Outlets may override it in OutletMenuEntry. */
  price: number;
  dietaryType: DietaryType;
  isBestseller?: boolean;
  isSpicy?: boolean;
  /** Mark as one of the homepage signature dishes. */
  isSignature?: boolean;
  /** Global switch: false = unavailable at every outlet. */
  isAvailable: boolean;
}

/** Per-outlet override. Items without an entry use the base price and are available. */
export interface OutletMenuEntry {
  outletId: string;
  menuItemId: string;
  outletSpecificPrice?: number;
  availability: boolean;
}

export interface ResolvedMenuItem extends MenuItem {
  /** Effective price at the selected outlet (or base price when none selected). */
  effectivePrice: number;
  available: boolean;
  priceOverridden: boolean;
}

export type GalleryCategory =
  | "signature-food"
  | "burgers-snacks"
  | "interiors"
  | "outlets"
  | "kitchen"
  | "brand-moments";

export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  image: ImageAsset;
  caption: string;
  /** Layout hint for the masonry grid and placeholder shape. */
  ratio: "portrait" | "landscape" | "square" | "tall";
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  outletSlug?: string;
  source?: string;
}
