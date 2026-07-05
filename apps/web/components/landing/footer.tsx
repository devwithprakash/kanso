"use client";

import Link from "next/link";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
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
          {["Features", "Pricing", "Docs", "Login"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-foreground">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 h-px w-full max-w-md bg-border" />
        <p className="mt-5 text-xs text-muted-foreground">© 2026 Kanso. All rights reserved.</p>
      </div>
    </footer>
  );
}
