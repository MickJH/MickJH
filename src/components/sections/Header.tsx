import { Logo } from "@/components/ui/Logo";

const links = [
  { href: "#werk", label: "Werk" },
  { href: "#over", label: "Over" },
  { href: "#loopbaan", label: "Loopbaan" },
] as const;

const linkClass =
  "rounded-control px-4 py-[11px] no-underline transition-colors";

export function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 pt-[22px] pb-[18px]">
      <a
        href="#top"
        aria-label="mjh, naar boven"
        className="group flex min-h-11 items-center"
      >
        <Logo />
      </a>
      <nav aria-label="Hoofdmenu">
        <ul className="m-0 flex list-none flex-wrap gap-1 p-0 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${linkClass} block text-fg-muted hover:bg-tile hover:text-fg`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={`${linkClass} block bg-brand text-white hover:bg-brand-bright`}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
