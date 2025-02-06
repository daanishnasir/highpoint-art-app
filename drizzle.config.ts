import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:password@localhost:5432/highpoint-art-app",
  },
  tablesFilter: ["highpoint-art-app_*"],
} satisfies Config;
