"use client";

import Link from "next/link";

const DOCS_URL = process.env.NEXT_PUBLIC_API_DOCS_URL ?? "#";

const links = [
  { label: "Features", href: "/#features" },
  { label: "Explore", href: "/explore" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: DOCS_URL, external: true },
  { label: "Login", href: "/sign-in" },
];

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export function Footer() {
  return (
    <footer className="px-4 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <span
            className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground text-sm font-semibold"
            style={serif}
          >
            K
          </span>
          <span className="text-base font-medium text-foreground">Kanso</span>
        </div>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          Less friction. More responses.
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {links.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-10 h-px w-full max-w-md bg-border" />
        <p className="mt-5 text-xs text-muted-foreground">© 2026 Kanso. All rights reserved.</p>
      </div>
    </footer>
  );
}
