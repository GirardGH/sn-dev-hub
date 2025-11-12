"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  clientId: string;
};

export function ClientTabs({ clientId }: Props) {
  const pathname = usePathname();
  const base = `/clients/${clientId}`;

  const tabs = [
    { href: `${base}/stories`, label: "Stories" },
    { href: `${base}/developments`, label: "Developments" },
  ];

  return (
    <div className="flex gap-2 border-b border-slate-900 px-6">
      {tabs.map((tab) => {
        const active =
          pathname === tab.href ||
          (tab.href !== base && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "px-3 py-2 text-[10px] font-medium text-slate-400 border-b-2 border-transparent hover:text-sky-400",
              active && "text-sky-400 border-sky-500"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
