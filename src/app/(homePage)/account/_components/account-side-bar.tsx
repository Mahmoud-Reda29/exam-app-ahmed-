"use client";

import { CircleUserRound, Lock, LogOut } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AccountSideBar() {
  return (
    <aside className="flex flex-col w-72   ">
      <TabsList className="flex-1 justify-start p-4 flex flex-col space-y-2 ">
        <TabsTrigger value="profile" asChild>
          <Button
            variant="ghost"
            className="justify-start w-60 
            data-[state=active]:bg-blue-100 
             data-[state=active]:text-blue-600"
          >
            <CircleUserRound className="w-6 h-6 mr-3" />
            <span className="text-base font-medium">Profile</span>
          </Button>
        </TabsTrigger>

        <TabsTrigger value="password" asChild>
          <Button
            variant="ghost"
            className="w-60  justify-start border-2 border-transparent text-gray-600 hover:bg-gray-100 data-[state=active]:bg-blue-100 
              data-[state=active]:text-blue-600"
          >
            <Lock className="w-6 h-6 mr-3" />
            <span className="text-base font-medium">Change Password</span>
          </Button>
        </TabsTrigger>
      </TabsList>

      <div className="p-4">
        <Button
          variant="delete"
          className="w-full justify-start "
          onClick={() => signOut()}
        >
          <LogOut className="w-6 h-6 mr-3" />
          <span className="text-base font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
