import { Info } from "lucide-react";
import { brand } from "@/data/brand";
import { cn } from "@/lib/cn";

/** Clearly flags placeholder content. Hidden when brand.showSampleNotices is false. */
export function SampleNotice({ children, className, dark }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  if (!brand.showSampleNotices) return null;
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-xl border px-4 py-3 text-sm leading-snug",
        dark ? "border-cream/20 bg-cream/5 text-cream/80" : "border-accent/30 bg-accent/10 text-charcoal/80",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
