import { cn } from "@/lib/cn";
import type { DietaryType } from "@/types";

const meta: Record<DietaryType, { label: string; color: string }> = {
  veg: { label: "Vegetarian", color: "#2e7d32" },
  "non-veg": { label: "Non-vegetarian", color: "#b3261e" },
  egg: { label: "Contains egg", color: "#c58a00" },
};

/** Standard Indian FSSAI-style veg / non-veg mark. */
export function DietBadge({ type, className }: { type: DietaryType; className?: string }) {
  const { label, color } = meta[type];
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={cn("inline-flex size-5 shrink-0 items-center justify-center rounded-[4px] border-2 bg-white", className)}
      style={{ borderColor: color }}
    >
      <span className="size-2.5 rounded-full" style={{ background: color }} />
    </span>
  );
}
