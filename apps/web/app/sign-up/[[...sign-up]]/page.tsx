import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up — Kanso",
  description: "Create your free Kanso account and start building beautiful forms in minutes.",
};


export default function SignUpPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zinc-950">
      <SignUp path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/dashboard" />
    </main>
  );
}
