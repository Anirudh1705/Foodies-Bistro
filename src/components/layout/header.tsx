"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Menu, X } from "lucide-react";
import { navLinks } from "@/data/brand";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  // The mobile menu auto-closes when the route changes (it's only "open" for the path it was opened on).
  const open = openPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenPath(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "bg-cream/95 shadow-[0_1px_0_rgb(25_25_25/0.08)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        <Logo tone={solid ? "dark" : "light"} />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  solid ? "text-charcoal/75 hover:text-charcoal" : "text-cream/80 hover:text-cream",
                  isActive(l.href) && (solid ? "text-charcoal" : "text-cream"),
                )}
              >
                {l.label}
                {isActive(l.href) && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-accent" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button href="/outlets" size="sm" className="hidden sm:inline-flex">
            <MapPin className="size-4" aria-hidden /> Find an Outlet
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
            className={cn(
              "grid size-11 place-items-center rounded-full transition-colors lg:hidden",
              solid ? "text-charcoal hover:bg-charcoal/5" : "text-cream hover:bg-cream/10",
            )}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-cream px-5 pb-10 pt-4 lg:hidden"
          >
            <ul className="divide-y divide-charcoal/10">
              {navLinks.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between font-display text-2xl font-bold",
                      isActive(l.href) ? "text-accent" : "text-charcoal",
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Button href="/outlets" size="lg" className="mt-8 w-full">
              <MapPin className="size-5" aria-hidden /> Find an Outlet
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
