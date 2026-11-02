"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GalleryCategory, GalleryImage } from "@/types";
import { galleryCategories } from "@/data/gallery";
import { cn } from "@/lib/cn";
import { Visual, type VisualKind } from "@/components/ui/visual";
import { Container } from "@/components/ui/section";

const ratioClass: Record<GalleryImage["ratio"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
};

const kindFor = (c: GalleryCategory): VisualKind =>
  c === "interiors" ? "interior" : c === "outlets" ? "outlet" : c === "kitchen" ? "kitchen" : c === "brand-moments" ? "brand" : "food";

const iconKeyFor = (c: GalleryCategory) => (c === "burgers-snacks" ? "burgers" : "combos");

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const shown = useMemo(() => (filter === "all" ? images : images.filter((i) => i.category === filter)), [images, filter]);
  const index = shown.findIndex((i) => i.id === openId);
  const current = index >= 0 ? shown[index] : null;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index < 0) return;
      setOpenId(shown[(index + dir + shown.length) % shown.length].id);
    },
    [index, shown],
  );

  const close = useCallback(() => {
    setOpenId(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!current) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [current, close, step]);

  return (
    <Container className="py-10 sm:py-14">
      <div role="group" aria-label="Filter gallery" className="no-scrollbar -mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1">
        {[{ slug: "all" as const, label: "All" }, ...galleryCategories].map((c) => (
          <button
            key={c.slug}
            aria-pressed={filter === c.slug}
            onClick={() => setFilter(c.slug)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors",
              filter === c.slug ? "bg-charcoal text-cream" : "bg-white text-charcoal/70 hover:text-charcoal",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <motion.div layout className="columns-1 gap-4 min-[480px]:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4">
        <AnimatePresence mode="popLayout">
          {shown.map((img) => (
            <motion.button
              layout
              key={img.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpenId(img.id);
              }}
              aria-label={`Open image: ${img.caption}`}
              className={cn("group relative block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-card", ratioClass[img.ratio])}
            >
              <Visual image={img.image} seed={img.id} kind={kindFor(img.category)} iconKey={iconKeyFor(img.category)} sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, 50vw" className="transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-transparent p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-sm font-semibold text-white">{img.caption}</span>
                <Expand className="size-4 shrink-0 text-white" aria-hidden />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-charcoal/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button ref={closeRef} onClick={close} aria-label="Close" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="size-6" />
            </button>
            {shown.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronLeft className="size-6" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl"
            >
              <div className="relative h-[70dvh]">
                <Visual image={current.image} seed={current.id} kind={kindFor(current.category)} iconKey={iconKeyFor(current.category)} sizes="100vw" />
              </div>
            </motion.div>
            <p className="mt-4 text-center text-sm text-cream/85" aria-live="polite">
              {current.caption} <span className="text-cream/45">· {index + 1} / {shown.length}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
