/** "mjh" word mark with the blue square. The square flips when its parent link is hovered. */
export function Logo() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-baseline font-display text-2xl leading-none font-bold tracking-[-0.05em] text-fg"
    >
      mjh
      <span className="ml-[3px] inline-block size-[7px] rounded-[1px] bg-brand-bright group-hover:animate-dot-flip" />
    </span>
  );
}
