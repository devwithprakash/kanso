import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Forms — Kanso",
  description:
    "Discover and interact with public forms created by the Kanso community. Browse, submit, and get inspired.",
  openGraph: {
    title: "Explore Forms — Kanso",
    description:
      "Discover and interact with public forms created by the Kanso community.",
    type: "website",
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
