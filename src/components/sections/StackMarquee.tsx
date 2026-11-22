import { Reveal } from "@/components/motion/Reveal";
import { Tile } from "@/components/ui/Tile";
import { stack } from "@/content/stack";

const tones = [
  "bg-brand text-white",
  "bg-chip text-fg-chip",
  "bg-cobalt text-white",
  "bg-chip text-fg-chip",
] as const;

function Chips({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="m-0 flex shrink-0 list-none gap-2 p-0 pr-2"
    >
      {stack.map((name, i) => (
        <li
          key={name}
          className={`inline-flex h-10 items-center rounded-chip px-4 font-mono text-sm whitespace-nowrap ${tones[i % tones.length]}`}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

/** Endless strip: the list is rendered twice and shifted by half its width (pure CSS). */
export function StackMarquee() {
  return (
    <Reveal dy={40}>
      <Tile aria-labelledby="stack-title" className="overflow-hidden py-5">
        <div className="flex justify-between gap-3 px-[26px] pb-3.5 font-mono text-xs tracking-[0.08em] text-fg-faint">
          <h2 id="stack-title" className="m-0 text-xs font-normal">
            STACK
          </h2>
          <span aria-hidden="true">backend → frontend</span>
        </div>
        <div className="overflow-hidden pl-[26px]">
          {/* Two identical lists, each with trailing gap, so -50% lands exactly on the seam. */}
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            <Chips />
            <Chips hidden />
          </div>
        </div>
      </Tile>
    </Reveal>
  );
}
