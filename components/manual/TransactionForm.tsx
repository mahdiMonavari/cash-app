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
import DatePickerField from "./DatePicker";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const transactionTypeEnum = {
  income: "درآمد",
  expense: "هزینه",
} as const;

export type TRANSACTION_TYPE = keyof typeof transactionTypeEnum;

export const transactionTypeEnumKeys = Object.keys(transactionTypeEnum) as [
  TRANSACTION_TYPE,
  ...TRANSACTION_TYPE[],
];

// schema فقط validate می‌کنه، transform ندارد
const transactionFormSchema = z.object({
  transaction: z.enum(transactionTypeEnumKeys, {
    message: "لطفاً نوع تراکنش را مشخص کنید",
  }),
  categoryId: z.string().superRefine((val, ctx) => {
    const num = Number(val);
    if (val === "" || isNaN(num)) {
      ctx.addIssue({ code: "custom", message: "دسته‌بندی معتبر نیست" });
    } else if (num <= 0) {
      ctx.addIssue({
        code: "custom",
        message: "لطفاً دسته‌بندی را انتخاب کنید",
      });
    }
  }),
  transactionDate: z
    .date()
    .nullable()
    .superRefine((value, ctx) => {
      if (value === null) {
        ctx.addIssue({ code: "custom", message: "انتخاب تاریخ الزامی است" });
        return;
      }
      if (value > addDays(new Date(), 1)) {
        ctx.addIssue({ code: "custom", message: "حداکثر روز مجاز امروز است" });
      }
    }),
  amount: z.string().superRefine((val, ctx) => {
    if (val === "" || isNaN(Number(val))) {
      ctx.addIssue({ code: "custom", message: "مبلغ باید عدد باشد" });
    } else if (Number(val) <= 0) {
      ctx.addIssue({
        code: "custom",
        message: "مبلغ باید بزرگ‌تر از صفر باشد",
      });
    }
  }),
  description: z
    .string()
    .min(10, "حداقل توضیحات باید ده کاراکتر باشد")
    .max(300, "توضیحات بیش از اندازه است"),
});

export type TransactionFormType = z.infer<typeof transactionFormSchema>;

// تایپ خروجی نهایی با مقادیر تبدیل‌شده
export type TransactionFormSubmitType = Omit<
  TransactionFormType,
  "amount" | "categoryId"
> & {
  amount: number;
  categoryId: number;
};

function TransactionForm() {
  const method = useForm<TransactionFormType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: "0",
      categoryId: "0",
      description: "",
      transaction: "income",
      transactionDate: null,
    },
  });

  const { control, handleSubmit, watch } = method;

  const submitHandler = (data: TransactionFormType) => {
    // تبدیل اینجا انجام می‌شه
    const payload: TransactionFormSubmitType = {
      ...data,
      amount: Number(data.amount),
      categoryId: Number(data.categoryId),
    };
    console.log(payload);
  };

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
                  دسته‌بندی
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="w-full h-11 px-4 text-sm font-medium rounded-xl
                       border-border bg-background shadow-xs hover:bg-accent/40 focus:ring-2
                        focus:ring-ring/20 transition-all"
                    >
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      sideOffset={4}
                      className="rounded-xl shadow-lg border-border"
                    >
                      {/* آیتم‌های دسته‌بندی را اینجا map کنید */}
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

          <FormField
            control={control}
            name="amount"
            render={({ field }) => (
              <FormItem className="space-y-2 text-right" dir="rtl">
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  مبلغ
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
        </FieldSet>

        <fieldset>
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2 text-right" dir="rtl">
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  توضیحات
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <Button className="w-full mt-5" type="submit">
            تایید
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}

export default TransactionForm;
