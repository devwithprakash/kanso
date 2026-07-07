import { Eye } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;
  return (
    <header className="fixed inset-x-0 top-3 z-40 mx-auto w-full max-w-5xl px-4">
      <nav className="flex items-center justify-between rounded-full border border-border/70 bg-background/70 px-3 py-2 backdrop-blur-md backdrop-saturate-150 shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(40,60,40,0.15)]">
        <Link href="/" className="flex items-center gap-2 pl-2">
          <span
            className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-[13px] font-semibold"
            style={serif}
          >
            K
          </span>
          <span className="text-sm font-medium tracking-tight">Kanso</span>
        </Link>
        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
          <button className="rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:-translate-y-px transition-transform">
            Save
          </button>
        </div>
      </nav>
    </header>
  );
}
