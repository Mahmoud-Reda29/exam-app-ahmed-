"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      className={cn(
        "flex bg-white  w-full justify-start space-x-2 text-gray-400 text-sm ",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {items.length - 1 === index ? (
            <Link href={item.href} className=" text-blue-600 ">
              {item.label}
            </Link>
          ) : (
            <Link
              href={item.href}
              className="hover:text-gray-500 transition-colors"
            >
              {item.label}
            </Link>
          )}
          {index < items.length - 1 && <span className="mx-2">/</span>}
        </div>
      ))}
    </nav>
  );
}
