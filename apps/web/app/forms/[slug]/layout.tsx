import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fill in a Form — Kanso",
  description:
    "Submit your response to a public Kanso form. Quick, easy, and secure.",
};

export default function FormSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
