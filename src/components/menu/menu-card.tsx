"use client";

import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import type { ResolvedMenuItem } from "@/types";
import { formatPrice, menuCategories } from "@/lib/menu";
import { cn } from "@/lib/cn";
import { Visual } from "@/components/ui/visual";
import { DietBadge } from "@/components/ui/diet-badge";

export function MenuCard({ item, outletSelected }: { item: ResolvedMenuItem; outletSelected: boolean }) {
  const cat = menuCategories.find((c) => c.slug === item.category);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={item.available ? { y: -4 } : undefined}
      transition={{ duration: 0.28 }}
      className={cn("group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow", item.available && "hover:shadow-lift")}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Visual
          image={item.image}
          seed={item.id}
          iconKey={cat?.icon}
          sizes="(min-width:1280px) 25vw, (min-width:640px) 33vw, 100vw"
          className={cn("transition-transform duration-500", item.available ? "group-hover:scale-105" : "grayscale")}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {item.isBestseller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
              <Star className="size-3 fill-current" aria-hidden /> Bestseller
            </span>
          )}
          {item.isSpicy && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
              <Flame className="size-3" aria-hidden /> Spicy
            </span>
          )}
        </div>
        {!item.available && (
          <div className="absolute inset-0 grid place-items-center bg-charcoal/60 p-4 text-center">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-charcoal">
              {outletSelected ? "Not available at this outlet" : "Currently unavailable"}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-2.5">
          <DietBadge type={item.dietaryType} className="mt-1" />
          <h3 className="flex-1 text-lg font-bold leading-snug">{item.name}</h3>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/65">{item.description}</p>
        <div className="mt-4 flex items-baseline justify-between border-t border-charcoal/10 pt-3">
          <span className={cn("font-display text-xl font-bold", !item.available && "text-charcoal/40 line-through")}>
            {formatPrice(item.effectivePrice)}
          </span>
          {item.priceOverridden && item.available && (
            <span className="text-xs text-charcoal/50">Outlet price · base {formatPrice(item.price)}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
