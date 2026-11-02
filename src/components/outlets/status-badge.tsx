"use client";

import { Clock } from "lucide-react";
import type { Outlet } from "@/types";
import { getOutletStatus } from "@/lib/outlets";
import { cn } from "@/lib/cn";
import { useNowMinute } from "./use-now";

export function OutletStatusBadge({ outlet, className, onDark }: { outlet: Outlet; className?: string; onDark?: boolean }) {
  const minute = useNowMinute();
  if (!minute) {
    // Server / first paint: neutral placeholder keeps layout stable
    return <span className={cn("inline-block h-7 w-32 rounded-full bg-charcoal/5", onDark && "bg-white/10", className)} aria-hidden />;
  }
  const status = getOutletStatus(outlet, new Date(minute * 60_000));
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        status.isOpen ? "bg-sage-light text-sage" : "bg-red-100 text-red-800",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", status.isOpen ? "bg-sage" : "bg-red-600")} aria-hidden />
      <Clock className="size-3.5" aria-hidden />
      {status.label}
    </span>
  );
}
