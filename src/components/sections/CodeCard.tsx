import type { ReactNode } from "react";

import { Tile } from "@/components/ui/Tile";

const Kw = ({ children }: { children: ReactNode }) => (
  <span className="text-code-keyword">{children}</span>
);
const Ty = ({ children }: { children: ReactNode }) => (
  <span className="text-code-type">{children}</span>
);
const Str = ({ children }: { children: ReactNode }) => (
  <span className="text-code-string">&quot;{children}&quot;</span>
);

/** Each line "types" itself in with a CSS clip-path animation; no JS needed. */
const lines: { content: ReactNode; punct?: boolean }[] = [
  {
    content: (
      <>
        <Kw>var</Kw> mick = <Kw>new</Kw> <Ty>Developer</Ty>
      </>
    ),
  },
  { content: "{", punct: true },
  {
    content: (
      <>
        {"    "}Company = <Str>Monta</Str>,
      </>
    ),
  },
  {
    content: (
      <>
        {"    "}Roles = [<Str>Junior Software Developer</Str>,
      </>
    ),
  },
  {
    content: (
      <>
        {"             "}
        <Str>Scrum Master</Str>],
      </>
    ),
  },
  {
    content: (
      <>
        {"    "}Backend = [<Str>C#</Str>, <Str>.NET</Str>, <Str>EF Core</Str>],
      </>
    ),
  },
  {
    content: (
      <>
        {"    "}Frontend = [<Str>React</Str>, <Str>Next.js</Str>]
      </>
    ),
  },
  {
    content: (
      <>
        {"}; "}
        <span
          aria-hidden="true"
          className="inline-block h-4 w-2 animate-caret bg-sky align-[-3px]"
        />
      </>
    ),
    punct: true,
  },
];

export function CodeCard() {
  return (
    <Tile
      tone="code"
      aria-label="Mick, beschreven als C#-object"
      className="animate-pack overflow-x-auto px-[26px] py-6 [--dx:-40px] [animation-delay:.18s]"
    >
      <pre className="m-0 font-mono text-[13.5px] leading-[1.8] text-fg-soft">
        <code>
          {lines.map((line, i) => (
            <span
              // Static, never reordered: the line number is a stable key.
              key={i}
              className={`block animate-type-line whitespace-pre ${line.punct ? "text-code-punct" : ""}`}
              style={{ animationDelay: `${0.9 + i * 0.4}s` }}
            >
              {line.content}
            </span>
          ))}
        </code>
      </pre>
    </Tile>
  );
}
