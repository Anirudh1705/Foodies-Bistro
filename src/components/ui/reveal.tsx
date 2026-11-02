"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport"> {
  delay?: number;
  y?: number;
}

/** Scroll-triggered fade/slide-up. Plays once. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
