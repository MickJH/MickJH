"use client";

import { useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/content/types";

type ProjectListProps = {
  projects: readonly Project[];
  /** Slug of the project that starts open; `null` starts with all closed. */
  initialOpen?: string | null;
};

/**
 * Accordion: at most one project open. The only state is `openId`;
 * everything else (expanded, sign, colours) is derived from it during render.
 */
export function ProjectList({
  projects,
  initialOpen = null,
}: ProjectListProps) {
  const [openId, setOpenId] = useState<string | null>(initialOpen);

  return (
    <ol className="m-0 list-none p-0">
      {projects.map((project, index) => {
        const isOpen = project.slug === openId;
        const buttonId = `project-${project.slug}-button`;
        const panelId = `project-${project.slug}-panel`;

        return (
          <li
            key={project.slug}
            className={index > 0 ? "border-t border-line" : undefined}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : project.slug)}
                className={`group flex min-h-[76px] w-full cursor-pointer flex-wrap items-center gap-x-5 gap-y-2 border-0 px-6 py-[18px] text-left font-sans text-fg transition-colors hover:bg-raised ${isOpen ? "bg-raised" : "bg-transparent"}`}
              >
                <span
                  aria-hidden="true"
                  className={`size-2.5 flex-none rounded-[1px] transition-[rotate,background-color] duration-250 group-hover:rotate-45 group-hover:bg-brand-bright ${isOpen ? "bg-brand-bright" : "bg-line-strong"}`}
                />
                <span
                  aria-hidden="true"
                  className="w-7 flex-none font-mono text-[13px] font-normal text-fg-faint"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 font-display text-2xl font-bold tracking-[-0.02em] sm:flex-[1_1_200px]">
                  {project.title}
                </span>
                <span className="hidden flex-[0_1_auto] font-mono text-[13px] font-normal text-fg-muted sm:inline">
                  {project.stack.slice(0, 3).join(" · ")}
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-7 flex-none items-center justify-center rounded-chip border border-line-strong font-mono text-base font-normal text-sky"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              hidden={!isOpen}
              className="animate-open flex-wrap gap-x-8 gap-y-4 bg-raised px-6 pb-[26px] sm:pl-[82px] [&:not([hidden])]:flex"
            >
              <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3.5">
                <p className="m-0 text-base text-fg-soft">
                  {project.description}
                </p>
                <ul
                  aria-label="Gebruikte technieken"
                  className="m-0 flex list-none flex-wrap gap-1.5 p-0"
                >
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-[0_1_220px] flex-col gap-3">
                <span className="font-mono text-xs text-fg-faint">
                  {project.kind}
                </span>
                {project.href ? (
                  <ButtonLink
                    href={project.href}
                    size="md"
                    className="self-start"
                  >
                    Bekijk op GitHub <span aria-hidden="true">↗</span>
                    <span className="sr-only"> ({project.title})</span>
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
