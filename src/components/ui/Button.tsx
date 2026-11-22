import type { ComponentPropsWithoutRef } from "react";

const variants = {
  /** Blue on dark. */
  primary: "bg-brand text-white font-semibold hover:bg-brand-bright",
  /** Outlined on dark. */
  outline: "border border-line-strong text-fg hover:border-sky hover:text-sky",
  /** White on blue. */
  light: "bg-white text-cobalt font-semibold hover:bg-fg",
  /** Outlined on blue. */
  "outline-light": "border border-sky text-white font-medium hover:bg-white/10",
} as const;

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: keyof typeof variants;
  size?: "md" | "lg";
};

/** A link styled as a button. Every call-to-action on this site navigates, so it is always an <a>. */
export function ButtonLink({
  variant = "primary",
  size = "lg",
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={[
        "inline-flex items-center gap-2.5 rounded-control no-underline transition-colors",
        size === "lg" ? "min-h-12 px-[22px]" : "min-h-11 px-4 text-sm",
        variants[variant],
        className,
      ].join(" ")}
      {...rest}
    />
  );
}
