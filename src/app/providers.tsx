"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * The only provider on the site.
 * - LazyMotion loads just the DOM animation features (smaller bundle than `motion.*`).
 * - MotionConfig makes every Motion animation respect `prefers-reduced-motion`.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
