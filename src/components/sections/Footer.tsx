import { profile } from "@/content/profile";

/** Rendered at build time; the daily rebuild keeps the year current. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-wrap justify-between gap-2 px-1 pt-5 font-mono text-xs text-fg-faint">
      <span>
        © {year} {profile.name}
      </span>
      <span>gebouwd met React · tegel voor tegel</span>
    </footer>
  );
}
