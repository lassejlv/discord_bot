import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
  server: {
    TOKEN: z.string(),
    PREFIX: z.string(),
  },
  runtimeEnv: process.env
})

export default env;
