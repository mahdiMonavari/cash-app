"use client";
import { CategorySelect } from "@/db/schema";
import TransactionForm, {
  TransactionFormSubmitType,
  TransactionFormType,
} from "./TransactionForm";
import createNewTransaction from "@/action/createNewTransaction";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

function TransactionFormCreate({
  categories,
}: {
  categories: CategorySelect[];
}) {
  const router = useRouter();
  const onsubmit = async (data: TransactionFormType) => {
    const submitData: TransactionFormSubmitType = {
      ...data,
      categoryId: Number(data.categoryId),
      amount: Number(data.amount),
    };
    const res = await createNewTransaction(submitData);
    if (!res.success) {
      toast.add({
        type: "error",
        title: res.message,
      });
    } else {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      toast.add({
        title: "با موفقیت ثبت شد",
        type: "success",
      });
      await new Promise((res) => setTimeout(res, 1000));
      router.push(`/dashboard/transaction?month=${month}&year=${year}`);
    }
  };
  return <TransactionForm categories={categories} onSubmit={onsubmit} />;
}

export default TransactionFormCreate;
