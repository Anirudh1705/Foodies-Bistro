import { menuCategories, menuItems, outletMenu } from "@/data/menu";
import type { MenuItem, ResolvedMenuItem } from "@/types";

export { menuCategories, menuItems };

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const getSignatureItems = (): MenuItem[] => menuItems.filter((m) => m.isSignature && m.isAvailable);

/** Merge base menu with outlet-specific price / availability. */
export function resolveMenu(outletId?: string): ResolvedMenuItem[] {
  return menuItems.map((item) => {
    const entry = outletId
      ? outletMenu.find((e) => e.outletId === outletId && e.menuItemId === item.id)
      : undefined;
    const overridden = entry?.outletSpecificPrice !== undefined && entry.outletSpecificPrice !== item.price;
    return {
      ...item,
      effectivePrice: entry?.outletSpecificPrice ?? item.price,
      available: item.isAvailable && (entry ? entry.availability : true),
      priceOverridden: overridden,
    };
  });
}
