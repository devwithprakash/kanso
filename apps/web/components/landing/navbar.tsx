"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, UserButton } from "@clerk/nextjs";

const DOCS_URL = process.env.NEXT_PUBLIC_API_DOCS_URL ?? "#";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/explore", label: "Explore" },
];

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 z-50 w-full max-w-6xl -translate-x-1/2 px-4 transition-all duration-500",
        scrolled && "top-3",
      )}
    >
      <nav
        className={cn(
          "flex items-center justify-between rounded-full border backdrop-blur-xl px-3 py-2 transition-all duration-500",
          scrolled
            ? "bg-background/90 border-border shadow-xl"
            : "bg-background/70 border-border/70 shadow-lg",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 pl-2 transition-transform duration-300 hover:scale-105"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-[13px] font-semibold transition-transform duration-500 group-hover:rotate-[8deg]"
            style={serif}
          >
            K
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">Kanso</span>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {isSignedIn && (
            <li>
              <Link
                href={"/dashboard"}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <div className="flex items-center gap-1.5">
            <Link
              href="/sign-in"
              className="hidden rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="group/btn inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:gap-2.5 hover:shadow-[0_8px_20px_-8px_rgba(40,60,40,0.4)]"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
