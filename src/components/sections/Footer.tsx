import { profile } from "@/content/profile";

/** Rendered at build time; the daily rebuild keeps the year current. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-1 pt-5 font-mono text-xs text-fg-faint">
      © {year} {profile.name}
    </footer>
  );
}
