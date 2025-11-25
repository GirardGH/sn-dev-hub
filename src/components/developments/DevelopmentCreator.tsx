"use client";

import { useState } from "react";
import { Development, emptyDevByType } from "@/lib/developmentTypes";
import DevelopmentForm from "./DevelopmentForm";
import XmlImporter from "./XmlImporter";

export default function DevelopmentCreator({
  storyId,
  onSubmit,
}: {
  storyId?: string;
  onSubmit: (dev: Development) => void;
}) {
  const [method, setMethod] = useState<"manual" | "xml">("manual");
  const [dev, setDev] = useState<Development>(() => {
    const d = emptyDevByType("business_rule");
    d.storyId = storyId;
    return d;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={() => setMethod("manual")}
          className={`px-3 py-1.5 rounded text-[12px] ${
            method === "manual"
              ? "bg-sky-600 text-white"
              : "bg-slate-800/40 dark:text-slate-300 hover:bg-slate-800/70"
          }`}
        >
          Manual Entry
        </button>
        <button
          onClick={() => setMethod("xml")}
          className={`px-3 py-1.5 rounded text-[12px] ${
            method === "xml"
              ? "bg-sky-600 text-white"
              : "bg-slate-800/40 dark:text-slate-300 hover:bg-slate-800/70"
          }`}
        >
          Upload XML
        </button>
      </div>

      {method === "xml" && (
        <XmlImporter
          onImported={(imported) => {
            imported.storyId = storyId;
            setDev(imported);
            setMethod("manual"); // comme ServiceNow: tu peux corriger ensuite
          }}
        />
      )}

      <DevelopmentForm value={dev} onChange={setDev} />

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => onSubmit(dev)}
          className="px-4 py-2 rounded bg-emerald-600 text-white text-[12px] hover:bg-emerald-500"
        >
          Create Development
        </button>
      </div>
    </div>
  );
}
