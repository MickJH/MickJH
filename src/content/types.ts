export type Project = {
  /** Stable id, used as React key and for aria-controls. */
  slug: string;
  title: string;
  /** Short context line, e.g. "solo · Avans". */
  kind: string;
  description: string;
  stack: readonly string[];
  /** Public repository, if there is one. */
  href?: string;
};

export type CareerRole = {
  role: string;
  since: string;
};

export type CareerItem = {
  slug: string;
  when: string;
  role: string;
  org: string;
  /** Marks the position that is still running (highlighted in the timeline). */
  current?: boolean;
  /** Several roles inside one position, e.g. developer + scrum master. */
  roles?: readonly CareerRole[];
};

export type Profile = {
  name: string;
  firstName: string;
  tagline: string;
  intro: string;
  headline: string;
  badge: string;
  employerLine: string;
  about: readonly string[];
  email: string;
  githubUser: string;
  /** Account whose contribution heatmap is shown (the work account). */
  activityGithubUser: string;
  linkedin: string;
};
