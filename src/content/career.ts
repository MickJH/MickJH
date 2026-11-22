import type { CareerItem } from "./types";

export const career = [
  {
    slug: "monta",
    when: "feb 2026 – nu",
    role: "Developer & Scrum Master",
    org: "Monta · Gorinchem · twee rollen, één team",
    current: true,
    roles: [
      { role: "Junior Software Developer", since: "sinds feb 2026" },
      { role: "Scrum Master", since: "sinds mei 2026" },
    ],
  },
  {
    slug: "afstudeerstage",
    when: "sep 2025 – jan 2026",
    role: "Afstudeerstage",
    org: "Monta · team MontaPortal · templates",
  },
  {
    slug: "ervaringsstage",
    when: "feb 2025 – jul 2025",
    role: "Ervaringsstage",
    org: "Monta · RMA-portaal",
  },
  {
    slug: "minor-cybersecurity",
    when: "sep 2024 – feb 2025",
    role: "Minor Cybersecurity",
    org: "Avans Hogeschool",
  },
  {
    slug: "zorgwaard",
    when: "feb 2022 – feb 2026",
    role: "ICT-medewerker",
    org: "Zorgwaard · Puttershoek",
  },
  {
    slug: "bachelor",
    when: "aug 2021 – nu",
    role: "Bachelor Informatica",
    org: "Avans Hogeschool",
  },
] as const satisfies readonly CareerItem[];
