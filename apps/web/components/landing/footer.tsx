"use client";

import Link from "next/link";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Login", href: "/sign-in" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="font-serif text-lg text-primary-foreground">
                F
              </span>
            </div>

            <span className="font-serif text-2xl text-foreground">
              FormZen
            </span>
          </Link>

          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Beautiful forms that people actually want to fill out.
          </p>

          {/* Links */}
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 h-px w-24 bg-border" />

          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} FormZen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}