import { Reveal } from "@/components/motion/Reveal";
import { Tile } from "@/components/ui/Tile";
import { githubUrl } from "@/content/profile";
import { projects } from "@/content/projects";
import { SectionHeading } from "./SectionHeading";
import { ProjectList } from "./ProjectList";

export function Projects() {
  return (
    <section
      id="werk"
      aria-labelledby="werk-title"
      className="flex flex-col gap-3"
    >
      <SectionHeading id="werk-title" title="Projecten">
        <a
          href={githubUrl}
          className="font-mono text-[13px] text-fg-muted hover:text-sky"
        >
          Alles op GitHub <span aria-hidden="true">↗</span>
        </a>
      </SectionHeading>
      <Reveal>
        <Tile as="div" lift={false} className="overflow-hidden">
          <ProjectList projects={projects} initialOpen={projects[0].slug} />
        </Tile>
      </Reveal>
    </section>
  );
}
