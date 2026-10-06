import {
  date,
  integer,
  numeric,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const categoriesTabel = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type", {
    enum: ["income", "expense"],
  }).notNull(),
});

export type CategorySelect = typeof categoriesTabel.$inferSelect;

export const transactionsTabel = pgTable("transaction", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  description: text("description").notNull(),
  amount: numeric("amount").notNull(),
  transactionDate: date("transaction_date").notNull(),
  categoryId: integer("category_id")
    .references(() => categoriesTabel.id)
    .notNull(),
});
