import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
import { cn } from "@/lib/cn";

/** Uses brand.logo when provided, otherwise a typographic wordmark. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" aria-label={`${brand.name} — home`} className={cn("inline-flex items-center gap-2.5", className)}>
      {brand.logo ? (
        <Image src={brand.logo} alt={brand.name} width={160} height={48} className="h-10 w-auto" priority />
      ) : (
        <>
          <span className="grid size-10 place-items-center rounded-xl bg-accent font-display text-lg font-bold text-white shadow-[0_6px_14px_-6px_rgb(230_106_50/0.8)]">
            {brand.name.charAt(0)}
          </span>
          <span className={cn("font-display text-xl font-bold tracking-tight", tone === "light" ? "text-cream" : "text-charcoal")}>
            {brand.name}
          </span>
        </>
      )}
    </Link>
  );
}
