/** Pure helpers for the GitHub contribution calendar. No I/O, so they are easy to test. */

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

/** GitHub's GraphQL `ContributionLevel` enum. */
export type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type GitHubCalendar = {
  totalContributions: number;
  weeks: readonly {
    contributionDays: readonly {
      date: string;
      contributionCount: number;
      contributionLevel: GitHubContributionLevel;
    }[];
  }[];
};

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type Contributions = {
  total: number;
  weekCount: number;
  /** Empty cells before the first day, so each column starts on Sunday like on GitHub. */
  leadingBlanks: number;
  days: ContributionDay[];
  /** ISO timestamp of the build that fetched the data. */
  fetchedAt: string;
};

const levels: Record<GitHubContributionLevel, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Maps GitHub's quartile enum to a 0–4 shade. Unknown values count as "no activity". */
export function toLevel(level: string): ContributionLevel {
  return levels[level as GitHubContributionLevel] ?? 0;
}

/** Day of the week (0 = Sunday) of a `YYYY-MM-DD` date, independent of the build machine's time zone. */
export function weekdayOf(isoDate: string): number {
  return new Date(`${isoDate}T00:00:00Z`).getUTCDay();
}

export function parseCalendar(
  calendar: GitHubCalendar,
  fetchedAt: string,
): Contributions {
  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: toLevel(day.contributionLevel),
    })),
  );
  const first = days[0];

  return {
    total: calendar.totalContributions,
    weekCount: calendar.weeks.length,
    leadingBlanks: first ? weekdayOf(first.date) : 0,
    days,
    fetchedAt,
  };
}
