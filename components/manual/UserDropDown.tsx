"use client";

import { UserButton } from "@clerk/nextjs";
import { ChartColumnBigIcon } from "lucide-react";

export default function UserDropDown() {
  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonOuterIdentifier:
            "p-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-colors focus:shadow-none",
          avatarBox: "w-10 h-10 border-2 border-lime-400",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="داشبورد"
          labelIcon={<ChartColumnBigIcon size={16} />}
          href="/dashboard"
        />
        <UserButton.Action label="manageAccount" />
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
    </UserButton>
  );
}
