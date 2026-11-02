"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LocateFixed, Map as MapIcon, List, Loader2, Search, X, Navigation } from "lucide-react";
import type { Outlet } from "@/types";
import { distanceKm, formatDistance } from "@/lib/outlets";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { OutletCard } from "./outlet-card";
import { OutletMap } from "./outlet-map-lazy";
import { OutletStatusBadge } from "./status-badge";

type Geo =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "granted"; lat: number; lng: number }
  | { state: "denied" }
  | { state: "unsupported" }
  | { state: "error" };

export function OutletDirectory({ outlets, cities }: { outlets: Outlet[]; cities: string[] }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [view, setView] = useState<"list" | "map">("list");
  const [geo, setGeo] = useState<Geo>({ state: "idle" });
  const [selected, setSelected] = useState<string | null>(null);

  const distances = useMemo(() => {
    if (geo.state !== "granted") return null;
    return new Map(outlets.map((o) => [o.slug, distanceKm(geo.lat, geo.lng, o.latitude, o.longitude)]));
  }, [geo, outlets]);

  const nearestSlug = useMemo(() => {
    if (!distances) return null;
    return [...distances.entries()].sort((a, b) => a[1] - b[1])[0]?.[0] ?? null;
  }, [distances]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = outlets.filter((o) => {
      if (city !== "all" && o.city !== city) return false;
      if (!q) return true;
      return [o.name, o.locality, o.city, o.completeAddress].some((f) => f.toLowerCase().includes(q));
    });
    if (distances) list.sort((a, b) => (distances.get(a.slug) ?? 0) - (distances.get(b.slug) ?? 0));
    return list;
  }, [outlets, query, city, distances]);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setGeo({ state: "unsupported" });
      return;
    }
    setGeo({ state: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeo({ state: "granted", lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => setGeo({ state: err.code === err.PERMISSION_DENIED ? "denied" : "error" }),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 5 * 60_000 },
    );
  };

  const nearest = nearestSlug ? outlets.find((o) => o.slug === nearestSlug) : undefined;
  const selectedOutlet = filtered.find((o) => o.slug === selected);
  const hasFilters = query !== "" || city !== "all";

  return (
    <div>
      {/* ---- controls ---- */}
      <div className="rounded-3xl bg-white p-4 shadow-card sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <span className="sr-only">Search outlets by locality or area</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-charcoal/40" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by locality or area, e.g. Pari Chowk"
              className="h-12 w-full rounded-full border-2 border-charcoal/10 bg-cream pl-12 pr-4 text-[15px] outline-none transition-colors placeholder:text-charcoal/40 focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="sr-only">Filter by city</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-12 w-full rounded-full border-2 border-charcoal/10 bg-cream px-5 text-[15px] outline-none focus:border-accent md:w-52"
            >
              <option value="all">All cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <Button onClick={locate} disabled={geo.state === "loading"} variant="dark">
            {geo.state === "loading" ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <LocateFixed className="size-5" aria-hidden />}
            Use my location
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label="Switch view" className="inline-flex rounded-full bg-cream p-1">
            {([["list", "List", List], ["map", "Map", MapIcon]] as const).map(([key, label, Icon]) => (
              <button
                key={key}
                type="button"
                aria-pressed={view === key}
                onClick={() => setView(key)}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors",
                  view === key ? "bg-charcoal text-cream" : "text-charcoal/70 hover:text-charcoal",
                )}
              >
                <Icon className="size-4" aria-hidden /> {label}
              </button>
            ))}
          </div>
          <p className="text-sm text-charcoal/60" aria-live="polite">
            Showing {filtered.length} of {outlets.length} outlets
            {hasFilters && (
              <button type="button" onClick={() => { setQuery(""); setCity("all"); }} className="ml-3 inline-flex items-center gap-1 font-semibold text-accent hover:underline">
                <X className="size-3.5" aria-hidden /> Clear
              </button>
            )}
          </p>
        </div>
      </div>

      {/* ---- location feedback ---- */}
      <div aria-live="polite" className="mt-4">
        {geo.state === "granted" && nearest && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-accent px-5 py-4 text-white">
            <p className="text-sm sm:text-base">
              <strong>{nearest.name}</strong> is your nearest outlet — approx. {formatDistance(distances!.get(nearest.slug)!)} away
              {!nearest.coordinatesVerified && " (based on approximate outlet location)"}.
            </p>
            <Button href={`/outlets/${nearest.slug}`} variant="light" size="sm">View outlet</Button>
          </motion.div>
        )}
        {geo.state === "denied" && (
          <p className="rounded-2xl bg-cream-deep px-5 py-3 text-sm text-charcoal/80">
            Location access was declined — no problem. Search by locality or area above to find an outlet.
          </p>
        )}
        {(geo.state === "error" || geo.state === "unsupported") && (
          <p className="rounded-2xl bg-cream-deep px-5 py-3 text-sm text-charcoal/80">
            We couldn&apos;t detect your location. Please search by locality or area instead.
          </p>
        )}
      </div>

      {/* ---- results ---- */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-charcoal/15 px-6 py-16 text-center">
            <p className="font-display text-2xl font-bold">No outlets match your search</p>
            <p className="mt-2 text-charcoal/60">Try a different locality, or clear the filters to see every outlet.</p>
            <Button className="mt-6" variant="dark" onClick={() => { setQuery(""); setCity("all"); }}>Show all outlets</Button>
          </div>
        ) : view === "list" ? (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((o) => (
                <OutletCard
                  key={o.id}
                  outlet={o}
                  distance={distances?.get(o.slug)}
                  isNearest={o.slug === nearestSlug}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
            <ul className="order-2 space-y-3 lg:order-1 lg:max-h-[640px] lg:overflow-y-auto lg:pr-1">
              {filtered.map((o) => (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(o.slug)}
                    aria-pressed={selected === o.slug}
                    className={cn(
                      "w-full rounded-2xl bg-white p-4 text-left shadow-card transition-all hover:shadow-lift",
                      selected === o.slug && "ring-2 ring-charcoal",
                      o.slug === nearestSlug && "ring-2 ring-accent",
                    )}
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-display text-lg font-bold">{o.name}</span>
                      {distances && <span className="shrink-0 text-xs font-semibold text-accent">{formatDistance(distances.get(o.slug)!)}</span>}
                    </span>
                    <span className="mt-1 block text-sm text-charcoal/65">{o.locality}, {o.city}</span>
                    <span className="mt-2 block"><OutletStatusBadge outlet={o} /></span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="order-1 space-y-4 lg:order-2">
              <div className="h-[420px] overflow-hidden rounded-3xl shadow-card sm:h-[520px] lg:h-[640px]">
                <OutletMap
                  outlets={filtered}
                  selectedSlug={selected}
                  nearestSlug={nearestSlug}
                  onSelect={setSelected}
                  userLocation={geo.state === "granted" ? { lat: geo.lat, lng: geo.lng } : null}
                />
              </div>
              {selectedOutlet && (
                <div className="max-w-md">
                  <OutletCard outlet={selectedOutlet} distance={distances?.get(selectedOutlet.slug)} isNearest={selectedOutlet.slug === nearestSlug} compact />
                </div>
              )}
              {!selectedOutlet && (
                <p className="flex items-center gap-2 text-sm text-charcoal/60">
                  <Navigation className="size-4" aria-hidden /> Tap a pin or a list item to see outlet details.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {outlets.some((o) => !o.coordinatesVerified) && view === "map" && (
        <p className="mt-4 text-xs text-charcoal/55">
          Map pins are approximate locality positions until exact outlet coordinates are added in <code>src/data/outlets.ts</code>.
        </p>
      )}
    </div>
  );
}
