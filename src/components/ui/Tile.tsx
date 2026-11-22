import type { HTMLAttributes } from "react";

const tones = {
  default: "border-line bg-tile",
  code: "border-line bg-deep",
  brand: "border-brand bg-brand text-white",
} as const;

type TileProps = HTMLAttributes<HTMLElement> & {
  /** `section` for a tile with its own heading or label, `div` when the parent section has it. */
  as?: "section" | "div";
  tone?: keyof typeof tones;
  /** Lift on hover. Off for tiles that are themselves interactive lists. */
  lift?: boolean;
};

/** The basic building block: a bordered, rounded tile. */
export function Tile({
  as: Component = "section",
  tone = "default",
  lift = true,
  className = "",
  ...rest
}: TileProps) {
  return (
    <Component
      className={[
        "h-full min-w-0 rounded-tile border",
        "transition-[translate,box-shadow,border-color] duration-250 ease-out",
        lift &&
          "hover:-translate-y-[3px] hover:border-line-hover hover:shadow-[0_18px_40px_rgb(20_60_200/0.28)] motion-reduce:hover:translate-y-0",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
