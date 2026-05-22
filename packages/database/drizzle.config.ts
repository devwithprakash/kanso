import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "./env";

const DATABASE_URL = process.env.DATABASE_URL as string

export default defineConfig({
  out: "./drizzle",
  schema: "./schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
