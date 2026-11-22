import type { ReactNode } from "react";

export function SectionHeading({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 px-1 pt-11 pb-2">
      <h2
        id={id}
        className="m-0 font-display text-[clamp(30px,4vw,40px)] tracking-[-0.03em]"
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
