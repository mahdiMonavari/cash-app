import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="mt-20 max-w-7xl py-10 mx-auto px-4" dir="rtl">
      <Breadcrumb>
        <BreadcrumbList>
          {/* استفاده مستقیم از Link داخل BreadcrumbItem */}
          <BreadcrumbItem>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              داشبورد
            </Link>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="rtl:rotate-180" />

          <BreadcrumbItem>
            <Link
              href="/dashboard/transaction"
              className="transition-colors hover:text-foreground"
            >
              تراکنش‌ها
            </Link>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="rtl:rotate-180" />

          <BreadcrumbItem>
            <BreadcrumbPage>تراکنش جدید</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default Page;
