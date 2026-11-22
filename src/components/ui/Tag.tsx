import type { ReactNode } from "react";

/** Small mono label for a technology. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-chip bg-chip px-[9px] py-[5px] font-mono text-xs text-fg-chip">
      {children}
    </span>
  );
}
