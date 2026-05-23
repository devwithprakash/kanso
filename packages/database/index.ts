import { config } from "dotenv";
import { Pool } from "pg";
import { resolve } from "path";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

config({ path: resolve(__dirname, "../../.env") });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, { schema });
export * from "drizzle-orm";
export default db;
