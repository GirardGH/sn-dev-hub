"use client";
import { Funnel } from "lucide-react";

type FilterButtonProps = {
  onClick: () => void;
  active?: boolean;
};

export default function FilterButton({ onClick, active }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors ${
        active ? "bg-sky-600/20" : "hover:bg-slate-800"
      }`}
    >
      <Funnel className={`w-4 h-4 ${active ? "text-sky-400" : "text-slate-400"}`} />
      <span className="text-[11px] text-slate-400">Filter</span>
    </button>
  );
}
