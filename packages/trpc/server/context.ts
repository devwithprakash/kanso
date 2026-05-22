import { getAuth } from "@clerk/express";

export async function createContext({ req }: { req: any }) {
  const auth = getAuth(req);

  return {
    userId: auth.userId,
  };
}