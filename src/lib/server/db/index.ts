import { env } from '$env/dynamic/private';
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
export const db = drizzle(client, { schema, logger: true });
