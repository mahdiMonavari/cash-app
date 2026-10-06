import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toJalaali } from "jalaali-js";
import Link from "next/link";
const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

async function page({
  searchParams,
}: {
  searchParams: Promise<{ month: string; year: string }>;
}) {
  const search = await searchParams;
  const { month, year } = search;
  const { jy, jm } = toJalaali(
    +year || new Date().getFullYear(),
    +month || new Date().getMonth() + 1,
    1,
  );

  return (
    <div className="mt-20 max-w-7xl py-10 mx-auto px-4" dir="rtl">
      <Breadcrumb>
        <BreadcrumbList>
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
            <BreadcrumbPage>تراکنش‌ها</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mt-4 px-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>
              تراکنشهای {persianMonths[jm - 1]} {jy}
            </span>
            <div>dropdowns</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Link href={"/dashboard/transaction/new"}>
            <Button className="px-7 py-1">تراکنش جدید</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
