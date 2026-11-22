import Image from "next/image";

import { Tile } from "@/components/ui/Tile";
import { profile } from "@/content/profile";

/** Pre-sized once from the original 1135×1600 PNG (2.1 MB → 50 kB). */
const portrait = { src: "/mick.webp", width: 720, height: 1015 } as const;

export function NowCard() {
  return (
    <Tile
      tone="brand"
      aria-label="Huidige rol"
      className="flex animate-pack flex-col gap-[22px] px-3 pt-3 pb-[26px] [--dx:40px] [animation-delay:.1s]"
    >
      <Image
        src={portrait.src}
        width={portrait.width}
        height={portrait.height}
        alt={`Portret van ${profile.name}`}
        preload
        sizes="(min-width: 1000px) 320px, 100vw"
        className="block max-h-[300px] min-h-[220px] w-full flex-auto rounded-chip object-cover object-[center_25%]"
      />
      <div className="flex flex-col gap-2.5 px-3.5">
        <p className="m-0 font-display text-2xl leading-[1.15] font-bold tracking-[-0.02em]">
          {profile.headline}
        </p>
        <p className="m-0">
          <span className="inline-flex items-center gap-2 rounded-chip bg-white px-2.5 py-1.5 font-display text-base font-bold text-cobalt">
            <span
              aria-hidden="true"
              className="size-2 rounded-[1px] bg-brand"
            />
            {profile.badge}
          </span>
        </p>
        <p className="m-0 text-sm text-white">{profile.employerLine}</p>
      </div>
    </Tile>
  );
}
