"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Store } from "lucide-react";
import type { DietaryType, Outlet } from "@/types";
import { menuCategories, resolveMenu } from "@/lib/menu";
import { getCategoryIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { MenuCard } from "./menu-card";
import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

interface Props {
  outlets: Outlet[];
  /** Pin the menu to one outlet (outlet detail page): hides the outlet selector. */
  fixedOutletId?: string;
}

type Diet = "all" | DietaryType;

export function MenuBrowser({ outlets, fixedOutletId }: Props) {
  const params = useSearchParams();
  const initialOutlet = outlets.find((o) => o.slug === params.get("outlet"))?.id ?? "";
  const initialCat = menuCategories.some((c) => c.slug === params.get("category")) ? params.get("category")! : "all";

  const [outletId, setOutletId] = useState(fixedOutletId ?? initialOutlet);
  const [category, setCategory] = useState(initialCat);
  const [diet, setDiet] = useState<Diet>("all");

  const items = useMemo(() => resolveMenu(outletId || undefined), [outletId]);
  const visible = useMemo(
    () => items.filter((i) => (diet === "all" ? true : diet === "veg" ? i.dietaryType === "veg" : i.dietaryType !== "veg")),
    [items, diet],
  );
  const outlet = outlets.find((o) => o.id === outletId);

  const sections = (category === "all" ? menuCategories : menuCategories.filter((c) => c.slug === category))
    .map((c) => ({ cat: c, list: visible.filter((i) => i.category === c.slug) }))
    .filter((s) => s.list.length > 0);

  return (
    <div>
      {/* outlet selector */}
      {!fixedOutletId && (
        <Container className="pt-8">
          <div className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-card sm:flex-row sm:items-center sm:p-5">
            <div className="flex items-center gap-3 sm:flex-1">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
                <Store className="size-5" aria-hidden />
              </span>
              <div>
                <label htmlFor="outlet-select" className="block font-display text-base font-bold">Prices & availability by outlet</label>
                <p className="text-sm text-charcoal/60">Pick an outlet to see its exact prices and what&apos;s available today.</p>
              </div>
            </div>
            <select
              id="outlet-select"
              value={outletId}
              onChange={(e) => setOutletId(e.target.value)}
              className="h-12 rounded-full border-2 border-charcoal/10 bg-cream px-5 text-[15px] font-medium outline-none focus:border-accent sm:w-64"
            >
              <option value="">All outlets (standard prices)</option>
              {outlets.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>
        </Container>
      )}

      {/* sticky category tabs */}
      <div className="sticky top-16 z-30 mt-6 border-y border-charcoal/10 bg-cream/95 backdrop-blur-md lg:top-20">
        <Container>
          <div className="flex items-center gap-3 py-3">
            <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-1 flex flex-1 gap-2 overflow-x-auto px-1">
              {[{ slug: "all", name: "All", icon: "" }, ...menuCategories].map((c) => {
                const Icon = c.slug === "all" ? null : getCategoryIcon(c.icon);
                const active = category === c.slug;
                return (
                  <button
                    key={c.slug}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(c.slug)}
                    className={cn(
                      "relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                      active ? "text-cream" : "bg-white text-charcoal/75 hover:text-charcoal",
                    )}
                  >
                    {active && <motion.span layoutId={`tab-pill-${fixedOutletId ?? "page"}`} className="absolute inset-0 rounded-full bg-charcoal" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                    <span className="relative inline-flex items-center gap-2">
                      {Icon && <Icon className="size-4" aria-hidden />}
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <div role="group" aria-label="Dietary filter" className="hidden shrink-0 gap-1 rounded-full bg-white p-1 md:flex">
              {([["all", "All"], ["veg", "Veg"], ["non-veg", "Non-veg"]] as const).map(([k, label]) => (
                <button
                  key={k}
                  aria-pressed={diet === k}
                  onClick={() => setDiet(k)}
                  className={cn("min-h-9 rounded-full px-3.5 text-xs font-bold transition-colors", diet === k ? "bg-accent text-white" : "text-charcoal/60 hover:text-charcoal")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {/* dietary filter on mobile */}
          <div role="group" aria-label="Dietary filter" className="flex gap-2 pb-3 md:hidden">
            {([["all", "All"], ["veg", "Veg only"], ["non-veg", "Non-veg"]] as const).map(([k, label]) => (
              <button
                key={k}
                aria-pressed={diet === k}
                onClick={() => setDiet(k)}
                className={cn("min-h-9 rounded-full border px-4 text-xs font-bold", diet === k ? "border-accent bg-accent text-white" : "border-charcoal/15 text-charcoal/65")}
              >
                {label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* items */}
      <Container className="py-10 sm:py-14">
        {outlet && !fixedOutletId && (
          <p className="mb-8 text-sm text-charcoal/65">
            Showing prices and availability for <strong className="text-charcoal">{outlet.name}</strong>.{" "}
            <Button href={`/outlets/${outlet.slug}`} variant="ghost" size="sm" className="!min-h-0 !px-1 text-accent underline">View outlet details</Button>
          </p>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${diet}-${outletId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-14"
          >
            {sections.length === 0 && (
              <p className="rounded-3xl border-2 border-dashed border-charcoal/15 px-6 py-16 text-center text-charcoal/60">
                No dishes match this filter. Try another category or dietary option.
              </p>
            )}
            {sections.map(({ cat, list }) => (
              <section key={cat.slug} aria-labelledby={`cat-${cat.slug}${fixedOutletId ?? ""}`}>
                {category === "all" && (
                  <h2 id={`cat-${cat.slug}${fixedOutletId ?? ""}`} className="mb-6 flex items-center gap-3 text-3xl font-bold">
                    {cat.name}
                    <span className="h-px flex-1 bg-charcoal/10" />
                    <span className="text-sm font-medium text-charcoal/45">{list.length} items</span>
                  </h2>
                )}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {list.map((item) => (
                      <MenuCard key={item.id} item={item} outletSelected={!!outletId} />
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}
