"use client";

import { MotionConfig } from "framer-motion";

/** Respects the visitor's reduced-motion preference for every Framer Motion animation. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
