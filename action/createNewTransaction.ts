"use server";
import { transactionTypeEnumKeys } from "@/components/manual/TransactionForm";
import { db } from "@/db";
import { transactionsTabel } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { addDays } from "date-fns";
import z from "zod";

type createNewTransactionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

const sunbmitTransactionSchema = z.object({
  categoryId: z.number().positive("مقدار کتگوری آیدی نامعتبر است"),
  transactionDate: z
    .date()
    .max(addDays(new Date(), 1), "مقدار تاریخ معتبر نمیباشد"),
  amount: z.number().positive("مقدار مبلغ نامعتبر است"),
  description: z
    .string()
    .min(10, "حداقل توضیحات باید ده کاراکتر باشد")
    .max(300, "توضیحات بیش از اندازه است"),
});

const createNewTransaction = async (
  rowDate: unknown,
): Promise<createNewTransactionResult> => {
  const { userId } = await auth();
  if (!userId) {
    return {
      success: false,
      message: "عدم اهراز حویت",
    };
  }
  const parsed = sunbmitTransactionSchema.safeParse(rowDate);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0].message,
    };
  }
  const { amount, categoryId, description, transactionDate } = parsed.data;
  const [transaction] = await db
    .insert(transactionsTabel)
    .values({
      amount: String(amount),
      description,
      categoryId: categoryId,
      transactionDate: transactionDate.toISOString().split("T")[0],
      userId,
    })
    .returning();

  return {
    success: true,
  };
};
export default createNewTransaction;
