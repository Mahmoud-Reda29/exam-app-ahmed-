"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type React from "react";

export default function ActiveLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  const pathname = usePathname();

  // first segment: "/account/settings" -> "account", "/" -> ""
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const isAccount = firstSegment === "account";

  let isActive: boolean;
  if (href === "/account") {
    // Only active on /account/*
    isActive = isAccount;
  } else if (href === "/") {
    // active on everything that's NOT /account/*
    isActive = !isAccount;
  } else {
    // Fallback: match by first segment for any other links you might add later
    const hrefFirst = href.split("/").filter(Boolean)[0] ?? "";
    isActive = firstSegment === hrefFirst;
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-4 font-medium transition ${
        isActive
          ? "bg-blue-100 text-blue-600 border-2 border-blue-500"
          : "hover:bg-blue-100 text-gray-500 border-2 border-transparent"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
