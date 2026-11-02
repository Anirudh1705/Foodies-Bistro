import type { MenuCategory, MenuItem, OutletMenuEntry, DietaryType } from "@/types";

/**
 * MENU — SAMPLE DATA. Dish names, descriptions and prices are placeholders
 * until the real menu is supplied. Categories are fully configurable.
 *
 * Add a photo to any item with:  image: { src: "/images/menu/xyz.jpg", alt: "…" }
 */

export const menuCategories: MenuCategory[] = [
  { id: "cat-burgers", name: "Burgers", slug: "burgers", icon: "burgers" },
  { id: "cat-pizzas", name: "Pizzas", slug: "pizzas", icon: "pizzas" },
  { id: "cat-sandwiches", name: "Sandwiches", slug: "sandwiches", icon: "sandwiches" },
  { id: "cat-wraps", name: "Wraps & Rolls", slug: "wraps-rolls", icon: "wraps" },
  { id: "cat-sides", name: "Fries & Sides", slug: "fries-sides", icon: "sides" },
  { id: "cat-snacks", name: "Snacks", slug: "snacks", icon: "snacks" },
  { id: "cat-combos", name: "Combos & Meals", slug: "combos-meals", icon: "combos" },
  { id: "cat-desserts", name: "Desserts", slug: "desserts", icon: "desserts" },
  { id: "cat-beverages", name: "Beverages", slug: "beverages", icon: "beverages" },
];

type Seed = [
  name: string,
  category: string,
  price: number,
  diet: DietaryType,
  description: string,
  flags?: Partial<Pick<MenuItem, "isBestseller" | "isSpicy" | "isSignature" | "isAvailable">>,
];

const seeds: Seed[] = [
  // Burgers
  ["Classic Veg Burger", "burgers", 99, "veg", "Crisp vegetable patty, lettuce, tomato and house sauce in a toasted bun.", { isBestseller: true, isSignature: true }],
  ["Crispy Chicken Burger", "burgers", 149, "non-veg", "Golden fried chicken fillet, pickles and creamy mayo.", { isBestseller: true, isSignature: true }],
  ["Spicy Paneer Burger", "burgers", 129, "veg", "Masala-crusted paneer slab with mint mayo and onions.", { isSpicy: true }],
  // Pizzas
  ["Margherita Pizza", "pizzas", 179, "veg", "Tomato sauce, mozzarella and fresh basil on a thin base.", { isSignature: true }],
  ["Farmhouse Pizza", "pizzas", 249, "veg", "Loaded with capsicum, onion, mushroom and sweet corn."],
  ["Peri Peri Chicken Pizza", "pizzas", 279, "non-veg", "Peri-peri chicken, onions and jalapeños with extra cheese.", { isSpicy: true }],
  // Sandwiches
  ["Grilled Veg Sandwich", "sandwiches", 89, "veg", "Grilled multigrain bread with seasoned vegetables and cheese."],
  ["Chicken Club Sandwich", "sandwiches", 139, "non-veg", "Triple-layer club with grilled chicken, lettuce and egg-free mayo."],
  ["Cheese Chilli Toastie", "sandwiches", 99, "veg", "Melted cheese and green chilli pressed until golden.", { isSpicy: true }],
  // Wraps & Rolls
  ["Paneer Tikka Roll", "wraps-rolls", 119, "veg", "Smoky paneer tikka, onions and mint chutney in a flaky roll.", { isBestseller: true, isSignature: true }],
  ["Chicken Kathi Roll", "wraps-rolls", 139, "non-veg", "Juicy chicken tikka wrapped in a fresh rumali paratha.", { isSpicy: true }],
  ["Falafel Wrap", "wraps-rolls", 129, "veg", "Crunchy falafel, hummus and fresh greens in a soft wrap."],
  // Fries & Sides
  ["Classic Salted Fries", "fries-sides", 79, "veg", "Hot, crisp and perfectly salted."],
  ["Peri Peri Fries", "fries-sides", 99, "veg", "Tossed in our house peri-peri seasoning.", { isSpicy: true, isBestseller: true, isSignature: true }],
  ["Cheesy Loaded Fries", "fries-sides", 129, "veg", "Fries topped with cheese sauce and jalapeños."],
  // Snacks
  ["Crispy Veg Nuggets", "snacks", 99, "veg", "Golden bite-sized veg nuggets with a tangy dip."],
  ["Chicken Popcorn", "snacks", 149, "non-veg", "Crunchy bite-sized chicken pieces with a spicy dip.", { isSpicy: true, isSignature: true }],
  ["Garlic Bread with Cheese", "snacks", 109, "veg", "Toasted garlic bread topped with melted mozzarella."],
  // Combos
  ["Veg Burger Combo", "combos-meals", 199, "veg", "Classic veg burger, regular fries and a cold drink."],
  ["Chicken Burger Combo", "combos-meals", 249, "non-veg", "Crispy chicken burger, regular fries and a cold drink."],
  ["Roll & Fries Combo", "combos-meals", 219, "veg", "Paneer tikka roll with peri peri fries and a cold drink."],
  // Desserts
  ["Chocolate Brownie", "desserts", 99, "veg", "Warm, fudgy brownie with a rich chocolate finish.", { isBestseller: true }],
  ["Soft Serve Cup", "desserts", 59, "veg", "Creamy vanilla soft serve in a cup."],
  ["Choco Lava Cake", "desserts", 89, "veg", "Soft cake with a molten chocolate centre."],
  // Beverages
  ["Fresh Lime Soda", "beverages", 59, "veg", "Sweet, salted or mixed — served chilled."],
  ["Classic Cold Coffee", "beverages", 109, "veg", "Blended cold coffee with a creamy top."],
  ["Mango Shake", "beverages", 119, "veg", "Thick and chilled mango shake.", { isAvailable: false }],
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const menuItems: MenuItem[] = seeds.map(([name, category, price, dietaryType, description, flags], i) => ({
  id: `item-${String(i + 1).padStart(3, "0")}`,
  name,
  slug: slugify(name),
  category,
  price,
  dietaryType,
  description,
  isAvailable: true,
  ...flags,
}));

const idOf = (slug: string) => {
  const found = menuItems.find((m) => m.slug === slug);
  if (!found) throw new Error(`Unknown menu item slug in outletMenu: ${slug}`);
  return found.id;
};

/** SAMPLE outlet-specific overrides. Anything not listed = base price, available. */
export const outletMenu: OutletMenuEntry[] = [
  { outletId: "out-pc", menuItemId: idOf("classic-veg-burger"), outletSpecificPrice: 105, availability: true },
  { outletId: "out-pc", menuItemId: idOf("choco-lava-cake"), availability: false },
  { outletId: "out-nd", menuItemId: idOf("classic-veg-burger"), outletSpecificPrice: 109, availability: true },
  { outletId: "out-nd", menuItemId: idOf("margherita-pizza"), outletSpecificPrice: 189, availability: true },
  { outletId: "out-nd", menuItemId: idOf("falafel-wrap"), availability: false },
  { outletId: "out-a1", menuItemId: idOf("soft-serve-cup"), availability: false },
  { outletId: "out-a1", menuItemId: idOf("classic-cold-coffee"), outletSpecificPrice: 115, availability: true },
  { outletId: "out-gn", menuItemId: idOf("garlic-bread-with-cheese"), outletSpecificPrice: 115, availability: true },
];
