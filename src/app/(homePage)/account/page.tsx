import { UserRound } from "lucide-react";
import AccountTabsClient from "./_components/account-tabs";
import HomePageHeader from "../_components/home-page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your account preferences and settings.",
};

export default function AccountTabsPage() {
  const breadCrumbIems = [
    { label: "Home", href: "/" },
    { label: "Account", href: "/account" },
  ];

  return (
    <main className="h-full">
      <HomePageHeader
        items={breadCrumbIems}
        Icon={UserRound}
        title={"Account Settings"}
      />

      <AccountTabsClient />
    </main>
  );
}
