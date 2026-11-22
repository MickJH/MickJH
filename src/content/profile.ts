import type { Profile } from "./types";

export const profile = {
  name: "Mick Holster",
  firstName: "Mick",
  tagline: "software developer · scrum master",
  intro:
    "Hoi, ik ben Mick. Ik ontwikkel webapplicaties in C#/.NET en React, van de database tot de interface.",
  headline: "Junior Software Developer",
  badge: "Scrum Master",
  employerLine: "@ Monta · dev sinds feb 2026 · scrum master sinds mei 2026",
  about: [
    "Bij Monta werk ik fulltime aan C#/.NET-backends en React/Next.js-frontends, met PostgreSQL en MS SQL eronder. Daarnaast ben ik scrum master van ons team.",
    "Mijn basis: de bachelor Informatica aan Avans Hogeschool, met een minor Cybersecurity, en vier jaar ICT bij Zorgwaard. Ik woon in Dordrecht en buiten werk voetbal ik en speel ik saxofoon.",
  ],
  email: "mickjholster@gmail.com",
  githubUser: "MickJH",
  activityGithubUser: "MontaMick",
  linkedin: "https://www.linkedin.com/in/mick-holster/",
} as const satisfies Profile;

export const githubUrl = `https://github.com/${profile.githubUser}`;
