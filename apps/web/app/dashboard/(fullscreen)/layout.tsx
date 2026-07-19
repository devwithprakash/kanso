import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Form Builder — Kanso",
    template: "%s — Kanso",
  },
  description:
    "Build and edit your forms with the Kanso drag-and-drop form builder.",
};

export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
