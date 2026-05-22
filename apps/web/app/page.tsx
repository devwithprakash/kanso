"use client";

import { SignInButton, SignOutButton, useAuth, UserButton } from "@clerk/nextjs";

import { useEffect } from "react";
import { trpc } from "~/trpc/client";

export default function Home() {
  const { userId } = useAuth();

  const { mutate, data } = trpc.auth.me.useMutation();

  useEffect(() => {
    if (userId) {
      mutate();
    }
  }, [userId, mutate]);

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        {!userId ? (
          <SignInButton>
            <button>Sign In</button>
          </SignInButton>
        ) : (
          <>
            <UserButton />

            <SignOutButton>
              <button>Sign Out</button>
            </SignOutButton>
          </>
        )}

        <h1>{data?.fullName}</h1>
      </div>
    </main>
  );
}
