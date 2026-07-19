import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign In — Kanso",
  description: "Sign in to your Kanso account to manage your forms and view responses.",
};


export default function SignInPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zinc-950">
      <SignIn 
        path="/sign-in" 
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/dashboard" 
      />
    </main>
  );
}