
import { ReactNode, useState } from "react";
import FilterButton from "@/components/ui/FilterButton";
import NewButton from "@/components/ui/NewButton";

export default function SubListLayout({
  title,
  newLink,
  filterOpen,
  setFilterOpen,
  children
}: {
  title: string;
  newLink: string;
  filterOpen: boolean;
  setFilterOpen: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden">
      
      {/* Sticky header inside sub-list */}
      <div className="
        sticky top-0 z-20 
        dark:bg-slate-950/90 backdrop-blur 
        px-4 py-2 
        flex items-center justify-between 
        border-b border-slate-800
      ">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold dark:text-slate-200">
            {title}
          </h2>
          <FilterButton 
            onClick={() => setFilterOpen(!filterOpen)} 
            active={filterOpen} 
          />
        </div>

        <NewButton href={newLink} />
      </div>

      {/* Scrollable content */}
      <div className="max-h-[320px] overflow-auto">
        {children}
      </div>
    </div>
  );
}
