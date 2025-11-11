// components/ui/StickyHeader.tsx
"use client";
import { ReactNode } from "react";
import FilterButton from "@/components/ui/FilterButton";
import NewButton from "@/components/ui/NewButton";

type Props = {
  title: string;
  onToggleFilter?: () => void;
  filterActive?: boolean;
  showFilter?: boolean;
  newHref?: string;
  children: ReactNode;
};

export default function StickyHeader({
  title,
  onToggleFilter,
  filterActive,
  showFilter = false,
  newHref,
  children,
}: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-20 px-8 py-3 dark:bg-slate-950 border-b dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold dark:text-slate-200">{title}</h2>
          {showFilter && onToggleFilter && (
            <FilterButton onClick={onToggleFilter} active={filterActive} />
          )}
        </div>
        {newHref && <NewButton href={newHref} />}
      </div>

      <div className="flex-1 px-8 pb-8 dark:bg-slate-950">{children}</div>
    </div>
  );
}
