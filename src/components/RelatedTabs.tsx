"use client";

import { useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export default function RelatedTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <div className="mt-4  border-slate-800 rounded-lg overflow-hidden dark:bg-slate-950">

      {/* --- TAB HEADER --- */}
      <div className="flex border-b border-slate-800 dark:bg-slate-900/50 backdrop-blur">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`
              px-4 py-2 text-sm rounded-lg font-medium
              transition-colors border-r border-slate-800
              ${active === t.id 
                ? "text-sky-400 bg-slate-800" 
                : "text-slate-400 hover:text-sky-400"}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* --- TAB CONTENT --- */}
      <div className="scrollbar-thin p-2">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}
