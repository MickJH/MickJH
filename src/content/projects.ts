import type { Project } from "./types";

export const projects = [
  {
    slug: "rma-portaal",
    title: "RMA-portaal",
    kind: "ervaringsstage · Monta",
    description:
      "Onderzoek naar en herstructurering van het RMA-portaal voor retouren, van backend tot een volledig nieuw frontend-design. De backend volgt Clean Architecture met CQRS via MediatR, met Redis als cache en een koppeling met Mollie voor betalingen.",
    stack: [
      "C#",
      "Next.js",
      "EF Core",
      "Clean Architecture",
      "CQRS / MediatR",
      "SQL",
      "Mantine",
      "Redis",
      "Docker",
      "Mollie API",
      "i18next",
    ],
  },
  {
    slug: "templates",
    title: "Templates",
    kind: "afstudeerstage · Monta",
    description:
      "Afstudeeronderzoek binnen team MontaPortal: het uploaden en bewerken van templates voor onder meer pakbonnen, inkooporders en inkoopverschillen opnieuw opgezet.",
    stack: ["C#", ".NET", "React", "Onderzoek"],
  },
  {
    slug: "the-circle",
    title: "The Circle",
    kind: "teamproject · Avans",
    description:
      "Streamingplatform waarop gebruikers altijd live kunnen gaan en elkaar volgen. Samen met een klasgenoot bouwde ik het streamen met WebRTC en SignalR, beveiligd met encryptie en keys zodat de integriteit van elke stream gewaarborgd is.",
    stack: ["WebRTC", "SignalR", "C#"],
    href: "https://github.com/MickJH/TheCircle",
  },
  {
    slug: "spelavonden",
    title: "Spelavonden",
    kind: "solo · Avans",
    description:
      "Platform voor spelavonden waar mensen op een gezellige manier Nederlands leren. Gebouwd met ASP.NET en C# volgens de Onion Architecture, met een SQL-database en gehost op Azure.",
    stack: ["ASP.NET", "SQL", "Azure"],
    href: "https://github.com/MickJH/SpelavondenApp",
  },
  {
    slug: "client-side",
    title: "Client Side",
    kind: "solo · Avans",
    description:
      "Angular-app in TypeScript waarin gebruikers elkaar volgen en aanbevelingen krijgen. MongoDB voor de data, Neo4j als graph database voor de relaties.",
    stack: ["Angular", "MongoDB", "Neo4j"],
    href: "https://github.com/MickJH/client-side",
  },
  {
    slug: "sofa",
    title: "SOFA",
    kind: "duo · Avans",
    description:
      "Zeven design patterns in één codebase: Factory, Adapter, Composite, Strategy, Observer, State en Template Method.",
    stack: ["Design patterns", "OOP"],
    href: "https://github.com/MickJH/SOFA_Eindopdracht",
  },
  {
    slug: "naamgeving",
    title: "Naamgeving",
    kind: "werk · Zorgwaard",
    description:
      "Elke medewerker had per applicatie een andere inlognaam. Ik bedacht een aanpak om de namen online om te zetten in plaats van met de medewerker erbij, pitchte die aan de directie en voerde hem door. Het project was daardoor veel sneller klaar.",
    stack: ["Identity", "Procesverbetering"],
  },
] as const satisfies readonly Project[];
