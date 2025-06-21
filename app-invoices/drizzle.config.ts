import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env?.DATABASE_URL ||
      "postgres://user:password@localhost:5482/orders"
  },
  schema: "src/db/schema/*",
  out: "src/db/migrations",
  casing: "snake_case"
});
