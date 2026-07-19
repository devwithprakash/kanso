import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forms",
  description:
    "Manage, organize, and share all your Kanso forms. Create new forms, view responses, and track analytics.",
};

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
