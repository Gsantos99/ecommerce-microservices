import { date } from "drizzle-orm/pg-core";
import { pgTable, text } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  phone: text().notNull(),
  address: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
  country: text().notNull(),
  dateOfBirth: date({ mode: "date" })
});
