"use client";
import { addDays } from "date-fns";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FieldSet } from "../ui/field";
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";
import "@majidh1/jalalidatepicker";
import { useEffect } from "react";
import DatePickerField from "./DatePicker";

const transactionTypeEnum = {
  income: "درآمد",
  expense: "هزینه",
} as const;

type TRANSACTION_TYPE = keyof typeof transactionTypeEnum;

const transactionTypeEnumKeys = Object.keys(transactionTypeEnum) as [
  ...TRANSACTION_TYPE[],
  TRANSACTION_TYPE,
];

const transactionFormSchema = z.object({
  transaction: z.enum(transactionTypeEnumKeys, {
    message: "لطفاً نوع تراکنش را مشخص کنید",
  }),
  categoryId: z.number().positive("لطفا یک دسته بندی را انتخاب کنید"),
  transactionDate: z
    .date()
    .max(addDays(new Date(), 1), "حد اکثر روز مجاز امروز است"),
  amount: z.number().positive("مقدار باید بزرگ تر از 0 باشد"),
  description: z
    .string()
    .min(10, "حداقل توضیحات باید ده کارکتر")
    .max(300, "توضیحات بیش از اندازه میباشد"),
});

export type TransactionFormType = z.infer<typeof transactionFormSchema>;

function TransactionForm() {
  const method = useForm<TransactionFormType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      categoryId: 0,
      description: "",
      transaction: "income",
      transactionDate: new Date(),
    },
  });

  const { register, control, handleSubmit, watch } = method;
  const submitHandler = (data: TransactionFormType) => {};
  console.log(watch());
  return (
    <Form {...method}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-4 max-w-md mx-auto p-4"
      >
        <FieldSet className="grid grid-cols-2 gap-y-5 gap-x-2">
          <FormField
            control={control}
            name="transaction"
            render={({ field }) => (
              <FormItem className="space-y-2 text-right" dir="rtl">
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  نوع تراکنش
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="w-full h-11 px-4 text-sm font-medium rounded-xl
                   border-border bg-background shadow-xs hover:bg-accent/40 focus:ring-2
                    focus:ring-ring/20 transition-all"
                    >
                      <SelectValue>
                        {transactionTypeEnum[field.value]}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      sideOffset={4}
                      className="rounded-xl shadow-lg border-border"
                    >
                      {transactionTypeEnumKeys.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          className="cursor-pointer py-2.5 rounded-lg focus:bg-accent font-medium text-sm"
                        >
                          {transactionTypeEnum[item]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="space-y-2 text-right" dir="rtl">
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  نوع تراکنش
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="w-full h-11 px-4 text-sm font-medium rounded-xl
                   border-border bg-background shadow-xs hover:bg-accent/40 focus:ring-2
                    focus:ring-ring/20 transition-all"
                    >
                      <SelectValue>
                        {/* {transactionTypeEnum[field.value]} */}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      sideOffset={4}
                      className="rounded-xl shadow-lg border-border"
                    >
                      {/* {transactionTypeEnumKeys.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          className="cursor-pointer py-2.5 rounded-lg focus:bg-accent font-medium text-sm"
                        >
                          {transactionTypeEnum[item]}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="transactionDate"
            render={({ field }) => (
              <FormItem className="space-y-2 text-right" dir="rtl">
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  تاریخ تراکنش
                </FormLabel>
                <FormControl>
                  <DatePickerField field={field} />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
        </FieldSet>
      </form>
    </Form>
  );
}

export default TransactionForm;
