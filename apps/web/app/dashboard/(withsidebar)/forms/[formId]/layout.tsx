import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Form Details",
    template: "%s — Kanso",
  },
  description:
    "View form responses, analytics, and manage your form settings on Kanso.",
};

export default function FormDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
