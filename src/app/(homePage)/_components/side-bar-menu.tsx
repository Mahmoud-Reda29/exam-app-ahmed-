"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, LogOut, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // ✅ app router

import React from "react";

const SideBarMenu = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded hover:bg-red-50 flex justify-center items-center">
          <EllipsisVertical size={18} className="text-gray-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="top" className="w-64 bg-white">
        {/* Account */}
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer p-4 border-b-2 border-gray-100"
          onClick={() => router.push("/account")}
        >
          <UserRound size={18} className="text-gray-500" />
          <span className="text-gray-800 text-sm font-normal">Account</span>
        </DropdownMenuItem>

        {/* Logout */}
        <DropdownMenuItem
          className="flex items-center gap-2 text-red-600 cursor-pointer focus:bg-red-50 p-4"
          onClick={() => signOut()}
        >
          <LogOut size={16} />
          <span className="text-sm">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SideBarMenu;
