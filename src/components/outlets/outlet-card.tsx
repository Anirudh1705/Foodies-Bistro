"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Navigation, Phone, Star } from "lucide-react";
import type { Outlet } from "@/types";
import { directionsUrl, formatDistance, hoursSummary, telHref } from "@/lib/outlets";
import { cn } from "@/lib/cn";
import { Visual } from "@/components/ui/visual";
import { Button } from "@/components/ui/button";
import { OutletStatusBadge } from "./status-badge";

interface Props {
  outlet: Outlet;
  /** Distance from the visitor in km (when location was granted). */
  distance?: number;
  isNearest?: boolean;
  selected?: boolean;
  onSelect?: (slug: string) => void;
  /** Compact layout for homepage previews. */
  compact?: boolean;
}

const stop = (e: React.MouseEvent) => e.stopPropagation();

export function OutletCard({ outlet, distance, isNearest, selected, onSelect, compact }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect?.(outlet.slug)}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow hover:shadow-lift",
        isNearest && "ring-2 ring-accent",
        selected && "ring-2 ring-charcoal",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Visual image={outlet.images[0]} seed={outlet.id} kind="outlet" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="transition-transform duration-500 group-hover:scale-105" />
        {isNearest && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow">
            <Star className="size-3.5 fill-current" aria-hidden /> Nearest to you
          </span>
        )}
        {distance !== undefined && (
          <span className="absolute right-3 top-3 rounded-full bg-charcoal/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            ≈ {formatDistance(distance)} away
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">{outlet.locality} · {outlet.city}</p>
        <h3 className="mt-1 text-2xl font-bold">{outlet.name}</h3>

        <ul className="mt-4 space-y-2.5 text-sm text-charcoal/75">
          <li className="flex gap-2.5">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <span>{outlet.completeAddress}</span>
          </li>
          <li className="flex gap-2.5">
            <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <span>{hoursSummary(outlet)}</span>
          </li>
          {!compact && (
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <a href={telHref(outlet.phone)} className="hover:text-accent" onClick={stop}>
                {outlet.phone}
              </a>
            </li>
          )}
        </ul>

        <div className="mt-4">
          <OutletStatusBadge outlet={outlet} />
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-6">
          <Button href={`/outlets/${outlet.slug}`} variant="dark" size="sm" onClick={stop}>
            View Details
          </Button>
          <Button href={directionsUrl(outlet)} variant="outline" size="sm" onClick={stop}>
            <Navigation className="size-4" aria-hidden /> Directions
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
