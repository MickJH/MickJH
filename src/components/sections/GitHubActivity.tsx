import type { CSSProperties } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { Tile } from "@/components/ui/Tile";
import { profile } from "@/content/profile";
import type { ContributionLevel } from "@/lib/contributions";
import { getContributions } from "@/lib/github";

const shades: Record<ContributionLevel, string> = {
  0: "bg-heat-0",
  1: "bg-cobalt",
  2: "bg-brand",
  3: "bg-brand-bright",
  4: "bg-sky",
};

const numberFormat = new Intl.NumberFormat("nl-NL");
const dateFormat = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Amsterdam",
});

/** Async server component: the data is fetched while building, not in the browser. */
export async function GitHubActivity() {
  const data = await getContributions(profile.activityGithubUser);
  if (!data) return null;

  const total = numberFormat.format(data.total);

  return (
    <Reveal className="mt-8">
      <Tile aria-labelledby="activity-title" className="p-[26px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pb-[18px]">
          <h2
            id="activity-title"
            className="m-0 font-display text-[22px] font-bold"
          >
            {total} contributions in het afgelopen jaar
          </h2>
          <a
            href={`https://github.com/${profile.activityGithubUser}`}
            className="font-mono text-xs text-fg-faint hover:text-sky"
          >
            via GitHub · bijgewerkt{" "}
            {dateFormat.format(new Date(data.fetchedAt))}
          </a>
        </div>
        <div
          aria-hidden="true"
          className="grid grid-flow-col grid-rows-7 gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${data.weekCount}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: data.leadingBlanks }, (_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {data.days.map((day, i) => (
            <span
              key={day.date}
              title={`${day.date}: ${day.count}`}
              className={`aspect-square pop-in rounded-[1px] ${shades[day.level]}`}
              style={
                {
                  "--delay": `${Math.floor((i + data.leadingBlanks) / 7) * 0.012}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </Tile>
    </Reveal>
  );
}
