"use client";

import * as m from "motion/react-m";
import { useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Horizontal start offset in px; the tile slides in from there. */
  dx?: number;
  /** Vertical start offset in px. */
  dy?: number;
  delay?: number;
  className?: string;
};

/**
 * Slides a tile into place the first time it scrolls into view.
 *
 * Its children stay server components. It also sets `data-inview`, which starts
 * the CSS `pop-in` animations inside (heatmap cells, timeline markers), so those
 * play on scroll without each cell being a Motion component.
 */
export function Reveal({
  children,
  dx = 0,
  dy = 30,
  delay = 0,
  className,
}: RevealProps) {
  const [inView, setInView] = useState(false);

  return (
    <m.div
      className={className}
      data-inview={inView}
      initial={{ opacity: 0, x: dx, y: dy }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", bounce: 0.35, duration: 0.9, delay }}
      onViewportEnter={() => setInView(true)}
    >
      {children}
    </m.div>
  );
}
