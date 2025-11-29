"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavItem({
  href,
  label,
  small,
}: {
  href: string;
  label: string;
  small?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={cn(
        `
        block rounded-md px-3 py-2 transition-colors
        ${small ? "text-sm" : "text-[15px]"}
      `,
        active
          ? `
          bg-sky-500/10 text-sky-50 border border-green-200/40
          dark:bg-sky-500/15 dark:text-sky-400
        `
          : `
          text-[#b9dbe4] hover:bg-[#032d42] hover:text-sky-50 hover:underline
          dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-300
        `
      )}
    >
      {label}
    </Link>
  );
}
