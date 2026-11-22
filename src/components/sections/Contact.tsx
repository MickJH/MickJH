import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Tile } from "@/components/ui/Tile";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Reveal className="mt-8">
      <Tile
        id="contact"
        tone="brand"
        aria-labelledby="contact-title"
        className="flex flex-wrap items-center justify-between gap-6 p-[clamp(28px,5vw,48px)]"
      >
        <div className="flex flex-col gap-2">
          <p className="m-0 font-mono text-xs tracking-[0.08em] text-white">
            CONTACT
          </p>
          <h2
            id="contact-title"
            className="m-0 font-display text-[clamp(30px,5vw,44px)] leading-[1.05] font-bold tracking-[-0.03em]"
          >
            Laten we iets bouwen.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <ButtonLink href={`mailto:${profile.email}`} variant="light">
            Stuur een mail
          </ButtonLink>
          <ButtonLink href={profile.linkedin} variant="outline-light">
            LinkedIn
          </ButtonLink>
        </div>
      </Tile>
    </Reveal>
  );
}
