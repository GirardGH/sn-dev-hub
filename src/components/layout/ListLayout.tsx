"use client";

import { ReactNode, useState } from "react";
import FilterButton from "@/components/ui/FilterButton";
import NewButton from "@/components/ui/NewButton";

type ListLayoutProps = {
  title: string;
  newLink?: string; // facultatif
  children: ReactNode; // le tableau HTML vient d'enfants
};

export default function ListLayout({ title, newLink, children }: ListLayoutProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Header sticky avec bouton filtre et new */}
      <div className="sticky top-0 z-20 px-8 py-3 dark:bg-slate-950 border-b dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold dark:text-slate-200">{title}</h2>
          <FilterButton onClick={() => setFilterOpen(!filterOpen)} active={filterOpen} />
        </div>
        {newLink && <NewButton href={newLink} />}
      </div>

      {/* Conteneur scrollable */}
      <div className="flex-1 px-8 pb-8 dark:bg-slate-950">
        <div className="max-h-[calc(100vh-200px)] overflow-auto scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
}
