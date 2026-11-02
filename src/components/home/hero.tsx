"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Utensils } from "lucide-react";
import { brand } from "@/data/brand";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { getCategoryIcon } from "@/lib/icons";

const words = brand.tagline.split(". ").map((s, i, a) => (i < a.length - 1 ? `${s}.` : s));
const floaters = [
  { icon: "pizzas", className: "right-[7%] top-[16%] size-24", delay: 0 },
  { icon: "burgers", className: "right-[30%] top-[42%] size-28", delay: 0.4 },
  { icon: "beverages", className: "right-[10%] bottom-[14%] size-20", delay: 0.8 },
];

export function Hero() {
  return (
    <section className="grain relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-charcoal text-cream">
      {brand.heroImage ? (
        <>
          <Image src={brand.heroImage} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20" />
        </>
      ) : (
        <>
          {/* Brand-coloured composition used until cinematic photography is supplied */}
          <motion.div aria-hidden initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="absolute -right-[18%] top-1/2 -z-10 size-[min(90vw,52rem)] -translate-y-1/2 rounded-full bg-accent" />
          <div aria-hidden className="absolute -right-[8%] top-1/2 -z-10 size-[min(60vw,34rem)] -translate-y-1/2 rounded-full bg-[#f2a36f]/60" />
          <div aria-hidden className="absolute -left-24 bottom-0 -z-10 size-[26rem] rounded-full bg-sage/40 blur-3xl" />
          {floaters.map((f) => {
            const Icon = getCategoryIcon(f.icon);
            return (
              <motion.div
                key={f.icon}
                aria-hidden
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                transition={{ opacity: { delay: 0.6 + f.delay * 0.3 }, scale: { delay: 0.6 + f.delay * 0.3 }, y: { duration: 6, repeat: Infinity, delay: f.delay, ease: "easeInOut" } }}
                className={`absolute hidden place-items-center rounded-full bg-cream/95 text-accent shadow-lift lg:grid ${f.className}`}
              >
                <Icon className="size-1/2" strokeWidth={1.5} />
              </motion.div>
            );
          })}
        </>
      )}

      <Container className="relative pb-24 pt-32">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
          <Utensils className="size-3.5 text-[#f2a36f]" aria-hidden /> {brand.cuisine}
        </motion.p>

        <h1 className="max-w-4xl text-[2.9rem] font-bold leading-[0.98] sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${i === 1 ? "text-[#f2a36f]" : ""}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
          {brand.description}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/menu" size="lg" className="bg-cream !text-charcoal hover:!bg-white !shadow-none">
            Explore Menu
          </Button>
          <Button href="/outlets" size="lg" variant="outline-light">
            <MapPin className="size-5" aria-hidden /> Find Your Nearest Outlet
          </Button>
        </motion.div>
      </Container>

      <a href="#popular" aria-label="Scroll to popular dishes" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs uppercase tracking-widest text-cream/60 hover:text-cream sm:flex">
        Scroll
        <ChevronDown className="animate-scroll-cue size-5" aria-hidden />
      </a>
    </section>
  );
}
