import type { CSSProperties } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { Tile } from "@/components/ui/Tile";
import { career } from "@/content/career";
import type { CareerItem } from "@/content/types";
import { SectionHeading } from "./SectionHeading";

const items: readonly CareerItem[] = career;

export function Career() {
  return (
    <section
      id="loopbaan"
      aria-labelledby="loopbaan-title"
      className="flex flex-col gap-3"
    >
      <SectionHeading id="loopbaan-title" title="Loopbaan" />
      <Reveal>
        <Tile as="div" className="px-[clamp(20px,4vw,32px)] py-7">
          <ol className="relative m-0 list-none p-0 before:absolute before:top-2 before:bottom-2 before:left-1.5 before:w-0.5 before:bg-line">
            {items.map((item, i) => (
              <li
                key={item.slug}
                className="relative flex flex-wrap items-baseline gap-x-6 gap-y-1 pb-6 pl-9 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 left-0 box-border size-3.5 pop-in rounded-[2px] border-2 ${item.current ? "border-sky bg-brand" : "border-line-strong bg-tile"}`}
                  style={{ "--delay": `${0.2 + i * 0.08}s` } as CSSProperties}
                />
                <span
                  className={`flex-[0_0_190px] font-mono text-[13px] ${item.current ? "text-sky" : "text-fg-faint"}`}
                >
                  {item.when}
                </span>
                <div className="flex min-w-0 flex-[1_1_260px] flex-col">
                  <h3 className="m-0 font-display text-xl font-bold tracking-[-0.01em]">
                    {item.role}
                  </h3>
                  <p className="m-0 text-[15px] text-fg-muted">{item.org}</p>
                  {item.roles ? (
                    <ul className="m-0 mt-3.5 flex list-none flex-col gap-2 p-0">
                      {item.roles.map((sub) => (
                        <li
                          key={sub.role}
                          className="flex items-center gap-3 rounded-control border border-line bg-raised px-3.5 py-2.5"
                        >
                          <span
                            aria-hidden="true"
                            className="size-2 flex-none rounded-[1px] bg-brand-bright"
                          />
                          <span className="min-w-0 flex-1 text-[15px] font-medium">
                            {sub.role}
                          </span>
                          <span className="flex-none font-mono text-xs text-sky">
                            {sub.since}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Tile>
      </Reveal>
    </section>
  );
}
