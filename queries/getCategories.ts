"use server";

import { db } from "@/db";
import { categoriesTabel } from "@/db/schema";

export async function getCategories() {
  return await db.select().from(categoriesTabel);
}
