"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/Navigation/Sidebar";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
    );
}