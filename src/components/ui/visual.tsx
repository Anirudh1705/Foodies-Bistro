import Image from "next/image";
import { Camera, ChefHat, Store, Armchair, Sparkles, Utensils, type LucideIcon } from "lucide-react";
import { getCategoryIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types";

export type VisualKind = "food" | "outlet" | "interior" | "kitchen" | "brand";

const kindIcon: Record<Exclude<VisualKind, "food">, LucideIcon> = {
  outlet: Store,
  interior: Armchair,
  kitchen: ChefHat,
  brand: Sparkles,
};

const tones = [
  "from-accent to-[#f2a36f] text-white",
  "from-sage to-[#7d9877] text-white",
  "from-charcoal to-[#3a3a3a] text-cream",
  "from-[#f2a36f] to-cream-deep text-charcoal",
  "from-[#3c523a] to-sage text-white",
  "from-cream-deep to-[#d9ccb0] text-charcoal",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

interface VisualProps {
  image?: ImageAsset;
  /** Seed for a stable placeholder colour (use the id / slug). */
  seed: string;
  kind?: VisualKind;
  /** Category icon key for food placeholders. */
  iconKey?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Hide the "Sample image" tag (e.g. on tiny thumbs). */
  quiet?: boolean;
}

/**
 * Renders a real photo when `image.src` is set; otherwise a branded placeholder
 * so the layout is complete before photography is supplied. The parent must be `relative`.
 */
export function Visual({ image, seed, kind = "food", iconKey, className, sizes = "(min-width:1024px) 33vw, 100vw", priority, quiet }: VisualProps) {
  if (image?.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }
  const tone = tones[hash(seed) % tones.length];
  const Icon = kind === "food" ? (iconKey ? getCategoryIcon(iconKey) : Utensils) : kindIcon[kind] ?? Camera;
  return (
    <div
      role="img"
      aria-label={image?.alt ?? "Sample placeholder image"}
      className={cn("absolute inset-0 overflow-hidden bg-gradient-to-br", tone, className)}
    >
      <div className="absolute -right-[15%] -top-[20%] size-[70%] rounded-full bg-white/10" />
      <div className="absolute -bottom-[25%] -left-[10%] size-[60%] rounded-full bg-black/10" />
      {/* eslint-disable-next-line react-hooks/static-components -- Icon is a stable module-level lucide component chosen from a static map */}
      <Icon className="absolute left-1/2 top-1/2 size-[34%] max-h-28 min-h-8 -translate-x-1/2 -translate-y-1/2 opacity-90" strokeWidth={1.4} aria-hidden />
      {!quiet && (
        <span className="absolute bottom-2 left-2 rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          Sample image
        </span>
      )}
    </div>
  );
}
