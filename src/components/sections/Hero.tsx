import { ButtonLink } from "@/components/ui/Button";
import { ArrowDownIcon, GitHubIcon } from "@/components/ui/icons";
import { Tile } from "@/components/ui/Tile";
import { githubUrl, profile } from "@/content/profile";

/**
 * Above the fold, so it animates with CSS on load instead of on scroll:
 * the headline is visible as soon as the HTML arrives, without waiting for JS.
 */
export function Hero() {
  return (
    <Tile
      aria-labelledby="hero-title"
      className="flex animate-pack flex-col gap-[22px] p-[clamp(28px,5vw,48px)] [--dx:-40px]"
    >
      <p className="m-0 flex items-center gap-2.5 font-mono text-[13px] text-sky">
        <span
          aria-hidden="true"
          className="size-2 animate-glow bg-brand-bright"
        />
        {profile.tagline}
      </p>
      <h1
        id="hero-title"
        className="m-0 font-display text-[clamp(44px,7vw,72px)] leading-none font-bold tracking-[-0.045em]"
      >
        <span className="block overflow-hidden">
          <span className="inline-block animate-rise [animation-delay:.3s]">
            Ik bouw software
          </span>
        </span>{" "}
        <span className="block overflow-hidden">
          <span className="inline-block animate-rise [animation-delay:.45s]">
            die <span className="text-brand-bright">past</span>.
          </span>
        </span>
      </h1>
      <p className="m-0 max-w-[480px] text-lg text-fg-lead">{profile.intro}</p>
      <div className="flex flex-wrap gap-2.5">
        <ButtonLink href="#werk">
          Bekijk mijn werk
          <ArrowDownIcon />
        </ButtonLink>
        <ButtonLink
          href={githubUrl}
          variant="outline"
          className="px-5 font-mono text-sm"
        >
          <GitHubIcon />
          <span>
            <span className="sr-only">GitHub: </span>@{profile.githubUser}
          </span>
        </ButtonLink>
      </div>
    </Tile>
  );
}
