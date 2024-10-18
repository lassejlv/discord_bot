import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
  server: {
    TOKEN: z.string(),
    PREFIX: z.string(),
    NODE_ENV: z.enum(["development", "production"]),
    TURSO_URL: z.string(),
    TURSO_TOKEN: z.string(),
    REDIS_URL: z.string(),
    DEVELOPER_ID: z.string()
  },
  runtimeEnv: process.env
})

export default env;
