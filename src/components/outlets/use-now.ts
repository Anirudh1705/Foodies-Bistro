"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
}

/** Current time in whole minutes since epoch. Returns 0 on the server / first render (avoids hydration mismatch). */
export function useNowMinute(): number {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 60_000),
    () => 0,
  );
}
