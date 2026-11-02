import {
  Armchair,
  Beef,
  Car,
  CupSoda,
  Cookie,
  IceCreamCone,
  Package,
  Pizza,
  Popcorn,
  Sandwich,
  ShoppingBag,
  Snowflake,
  Users,
  Utensils,
  UtensilsCrossed,
  Wheat,
  Wifi,
  type LucideIcon,
} from "lucide-react";

/** Category icon by key (MenuCategory.icon). */
export const categoryIcons: Record<string, LucideIcon> = {
  burgers: Beef,
  pizzas: Pizza,
  sandwiches: Sandwich,
  wraps: Wheat,
  sides: Popcorn,
  snacks: Cookie,
  combos: Package,
  desserts: IceCreamCone,
  beverages: CupSoda,
};

export const getCategoryIcon = (key: string): LucideIcon => categoryIcons[key] ?? Utensils;

/** Facility label → icon. Unknown labels fall back to a utensils icon. */
export const facilityIcons: Record<string, LucideIcon> = {
  "Dine-in": UtensilsCrossed,
  Takeaway: ShoppingBag,
  "Air conditioned": Snowflake,
  "Family seating": Users,
  "Wi-Fi": Wifi,
  "Parking nearby": Car,
  Seating: Armchair,
};

export const getFacilityIcon = (label: string): LucideIcon => facilityIcons[label] ?? Utensils;
