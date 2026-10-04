import { toGregorian } from "jalaali-js";
import { useEffect, useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { TransactionFormType } from "./TransactionForm";
import { Calendar1Icon } from "lucide-react";

declare global {
  interface Window {
    jalaliDatepicker: any;
  }
}

export default function DatePickerField({
  field,
}: {
  field: ControllerRenderProps<TransactionFormType, "transactionDate">;
}) {
  useEffect(() => {
    window.jalaliDatepicker.startWatch({
      minDate: "attr",
      maxDate: "attr",
      time: true,
    });
  }, []);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    const handler = () => {
      const parts = el.value.split("/");
      if (parts.length === 3) {
        const { gy, gm, gd } = toGregorian(
          parseInt(parts[0]),
          parseInt(parts[1]),
          parseInt(parts[2]),
        );
        field.onChange(new Date(gy, gm - 1, gd));
      }
    };

    el.addEventListener("change", handler);
    return () => el.removeEventListener("change", handler);
  }, [field]);

  return (
    <div className="relative h-8">
      <span className="absolute top-1/2 -translate-y-1/2 left-2">
        <Calendar1Icon className="text-primary/70 size-5" />
      </span>
      <input
        className="rounded-2xl border focus:outline-none border-primary/20 px-4 max-w-full h-8 block"
        ref={inputRef}
        type="text"
        data-jdp
        data-jdp-only-date
        data-jdp-max-date="today"
        placeholder="لطفا یک تاریخ وارد نمایید"
      />
    </div>
  );
}
