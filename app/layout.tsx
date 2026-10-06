import type { Metadata } from "next";
import "./globals.css";
import { Vazirmatn } from "next/font/google";
import Link from "next/link";
import { ChartColumnBigIcon } from "lucide-react";
import { ClerkProvider, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import UserDropDown from "@/components/manual/UserDropDown";
import { Toaster } from "@/components/ui/toast";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "سیستم مدیریت صورتحساب",
  description: "سامانه مدیریت و صدور صورتحساب",
};

// دیکشنری جامع فارسی برای تمام بخش‌های فرم Clerk
const faIR = {
  badge__other: "سایر",
  dividerText: "یا",
  formButtonPrimary: "ادامه",
  footerActionLink__signIn: "ورود",
  footerActionLink__signUp: "ثبت‌نام",
  backButton: "بازگشت",
  signIn: {
    start: {
      title: "ورود به حساب کاربری",
      subtitle: "برای ادامه به حساب خود وارد شوید",
      actionText: "حساب کاربری ندارید؟",
      actionLink: "ثبت‌نام کنید",
    },
    password: {
      title: "رمز عبور را وارد کنید",
      subtitle: "برای ورود، رمز عبور خود را وارد نمایید",
      actionLink: "ورود با روش دیگر",
    },
    emailCode: {
      title: "کد تایید ایمیل",
      subtitle: "کد ارسال‌شده به ایمیلتان را وارد کنید",
    },
  },
  signUp: {
    start: {
      title: "ایجاد حساب کاربری",
      subtitle: "برای شروع، اطلاعات خود را وارد کنید",
      actionText: "قبلاً ثبت‌نام کرده‌اید؟",
      actionLink: "وارد شوید",
    },
    emailCode: {
      title: "تایید ایمیل",
      subtitle: "کد ارسال‌شده به ایمیل خود را وارد نمایید",
    },
  },
  formFieldLabel__emailAddress: "آدرس ایمیل",
  formFieldLabel__password: "رمز عبور",
  formFieldLabel__confirmPassword: "تکرار رمز عبور",
  formFieldLabel__firstName: "نام",
  formFieldLabel__lastName: "نام خانوادگی",
  formFieldLabel__username: "نام کاربری",
  formFieldInputPlaceholder__emailAddress: "ایمیل خود را وارد کنید",
  formFieldInputPlaceholder__password: "رمز عبور را وارد کنید",
  socialButtonsBlockButton: "ادامه با {{provider}}",
  userButton: {
    action__manageAccount: "مدیریت حساب کاربری",
    action__signOut: "خروج از حساب",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = await auth();
  const { userId } = authUser;

  return (
    <ClerkProvider
      localization={faIR as any}
      appearance={{
        variables: {
          fontFamily: "var(--font-vazir), sans-serif",
          fontSize: "14px",
        },
        elements: {
          // راست‌به‌چپ کردن کل کارت و اینپوت‌ها
          card: "direction-rtl text-right font-[family-name:var(--font-vazir)]",
          rootBox: "direction-rtl text-right",
          formFieldLabel: "text-right font-medium",
          formFieldInput: "text-right",
          headerTitle: "font-bold text-lg",
          headerSubtitle: "text-neutral-500",
          footerAction: "flex-row-reverse justify-center gap-1",
        },
      }}
    >
      <html
        lang="fa"
        dir="rtl"
        className={`${vazir.variable} h-full antialiased font-[family-name:var(--font-vazir)]`}
      >
        <body className="min-h-full flex flex-col bg-background text-foreground">
          <nav className="bg-primary/90 text-primary-foreground  fixed top-0 left-0 right-0 h-20 px-6 flex items-center justify-between shadow-sm">
            <Link
              href="/"
              className="font-black text-2xl flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <ChartColumnBigIcon className="text-lime-400 w-7 h-7" />
              <span>صورتحساب</span>
            </Link>

            <div className="flex items-center gap-3">
              {userId ? (
                <UserDropDown />
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button
                      variant="link"
                      className="text-sm px-4 py-2 rounded-lg bg-neutral-700 text-neutral-900 hover:bg-neutral-950 hover:text-neutral-200 transition-all duration-300 font-bold"
                    >
                      ورود
                    </Button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <Button
                      className="text-sm px-4 py-2 rounded-lg bg-lime-500 text-neutral-900 hover:bg-lime-400 transition font-bold"
                      variant={"link"}
                    >
                      ثبت‌نام
                    </Button>
                  </SignUpButton>
                </>
              )}
            </div>
          </nav>

          <main className="h-200">
            {children}
            <Toaster />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
