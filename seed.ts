import dotenv from "dotenv";
import { categoriesTabel } from "./db/schema";
import { db } from "./db";

dotenv.config({
  path: ".env.local",
});
const categories: (typeof categoriesTabel.$inferInsert)[] = [
  { name: "حقوق", type: "income" },
  { name: "فریلنسر", type: "income" },
  { name: "سود سرمایه‌گذاری", type: "income" },
  { name: "هدیه دریافتی", type: "income" },
  { name: "خوراک و رستوران", type: "expense" },
  { name: "حمل‌ونقل", type: "expense" },
  { name: "قبوض و اشتراک‌ها", type: "expense" },
  { name: "خرید پوشاک", type: "expense" },
  { name: "تفریح و سرگرمی", type: "expense" },
  { name: "بهداشت و درمان", type: "expense" },
  { name: "آموزش", type: "expense" },
  { name: "اجاره مسکن", type: "expense" },
];

async function main() {
  const res = await db.insert(categoriesTabel).values(categories);
}
main();
