"use client";

import { parseServiceNowXML } from "./xmlParser";
import { Development } from "@/lib/developmentTypes";

export default function XmlImporter({
  onImported,
}: {
  onImported: (dev: Development) => void;
}) {
  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const xml = e.target?.result as string;
      const dev = parseServiceNowXML(xml);
      onImported(dev);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 rounded-lg border border-slate-700 dark:bg-slate-900/60 space-y-2">
      <div className="text-[12px] dark:text-slate-300 font-semibold">
        Upload ServiceNow XML Export
      </div>
      <input
        type="file"
        accept=".xml"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        className="text-[12px] dark:text-slate-300 file:mr-3 file:px-3 file:py-1.5 file:rounded file:border-0 file:bg-sky-600 file:text-white hover:file:bg-sky-500"
      />
      <p className="text-[11px] dark:text-slate-500">
        sys_script / sys_script_client / sys_script_include / sys_ui_action
      </p>
    </div>
  );
}
