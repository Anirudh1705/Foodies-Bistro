"use client";

import dynamic from "next/dynamic";
import type { OutletMapProps } from "./outlet-map";

const Map = dynamic(() => import("./outlet-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-64 w-full place-items-center bg-cream-deep text-sm text-charcoal/60">Loading map…</div>
  ),
});

export function OutletMap(props: OutletMapProps) {
  return <Map {...props} />;
}
