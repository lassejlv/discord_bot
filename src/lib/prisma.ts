import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import env from "./env";

const client = createClient({
  url: env.TURSO_URL,
  authToken: env.TURSO_TOKEN,
})

const adapter = new PrismaLibSQL(client);
export const prisma = new PrismaClient({ adapter })
