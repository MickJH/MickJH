import { Tile } from "@/components/ui/Tile";
import { profile } from "@/content/profile";

export function About() {
  return (
    <Tile
      aria-labelledby="over-title"
      className="flex animate-pack flex-col gap-3.5 p-7 [--dx:40px] [animation-delay:.26s]"
    >
      <h2
        id="over-title"
        className="m-0 font-display text-[26px] tracking-[-0.03em]"
      >
        Over mij
      </h2>
      {profile.about.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="m-0 text-base text-fg-soft">
          {paragraph}
        </p>
      ))}
    </Tile>
  );
}
