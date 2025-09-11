"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import AccountSideBar from "./account-side-bar";
import ProfileAccount from "./profile-account";
import AccountChangePassword from "./account-change-password";

export default function AccountTabsClient() {
  return (
    <Tabs defaultValue="profile" className="flex flex-1 h-full">
      <AccountSideBar />

      <div className="flex-1 p-6">
        <TabsContent value="profile" className="mt-0">
          <ProfileAccount />
        </TabsContent>

        <TabsContent value="password" className="mt-0">
          <AccountChangePassword />
        </TabsContent>
      </div>
    </Tabs>
  );
}
