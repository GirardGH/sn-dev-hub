"use client";
import { useState } from "react";

type FilterField = {
  label: string;
  name: string;
  type?: "text" | "select";
  options?: string[];
};

type FilterPanelProps = {
  fields: FilterField[];
  onApply: (values: Record<string, string>) => void;
  onClose: () => void;
};

export default function FilterPanel({ fields, onApply, onClose }: FilterPanelProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  function handleChange(name: string, value: string) {
    setValues({ ...values, [name]: value });
  }

  return (
    <div className="absolute top-12 right-8 z-30 bg-slate-900 border border-slate-800 rounded-lg shadow-lg p-4 text-sm text-slate-300 w-64">
      <div className="font-semibold mb-2">Filters</div>

      {fields.map((f) => (
        <div key={f.name} className="mb-3">
          <label className="block text-[11px] text-slate-400 mb-1">
            {f.label}
          </label>
          {f.type === "select" && f.options ? (
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-slate-200 text-xs"
              onChange={(e) => handleChange(f.name, e.target.value)}
            >
              <option value="">-- All --</option>
              {f.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-slate-200 text-xs"
              onChange={(e) => handleChange(f.name, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="flex justify-between mt-3">
        <button
          onClick={() => onApply(values)}
          className="px-3 py-1 bg-sky-600 text-white rounded-md text-xs hover:bg-sky-500"
        >
          Apply
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-slate-700 text-white rounded-md text-xs hover:bg-slate-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
