import { TRPCError } from "@trpc/server";

type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR";

export function throwTRPCError(code: ErrorCode, message: string): never {
  throw new TRPCError({
    code,
    message,
  });
}
