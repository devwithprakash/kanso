"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Twitter, Linkedin } from "lucide-react";

const DOCS_URL = process.env.NEXT_PUBLIC_API_DOCS_URL ?? "#";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

const columns = [
  {
    heading: "Product",
    links: [
      { label: "How it Works", href: "/#how-it-works" },
      { label: "Features", href: "/#features" },
      { label: "Explore Forms", href: "/explore" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "API Docs", href: DOCS_URL, external: true },
      { label: "OpenAPI Spec", href: `${DOCS_URL}/openapi.json`, external: true },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign In", href: "/sign-in" },
      { label: "Sign Up", href: "/sign-up" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/devwithprakash/kanso" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

/** Renders a single link, external or internal */
function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const cls =
    "group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {label}
        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* ── Subtle top glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[600px] -translate-x-1/2 rounded-full bg-primary/6 blur-[90px]"
      />

      <div className="mx-auto max-w-6xl px-4">
        {/* ── Upper block ── */}
        <div className="grid grid-cols-2 gap-10 pt-16 pb-12 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-8">
          {/* Brand column */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/25 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
                style={serif}
              >
                K
              </span>
              <span className="text-base font-semibold tracking-tight text-foreground">Kanso</span>
            </Link>

            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
              Beautiful, opinionated forms — crafted for teams that care about every detail.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/8 hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          {columns.map((col, ci) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * (ci + 1) }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-border" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Kanso. All rights reserved.</p>

          <div className="flex items-center gap-1.5">
            {/* Tiny animated status dot */}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary/80" />
            </span>
            <span>All systems operational</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
