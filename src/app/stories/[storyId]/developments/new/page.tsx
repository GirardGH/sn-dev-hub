"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getStoryById,
  getClientById,
} from "@/lib/mockData";
import type { ScriptTypeOption, ExecutionOption } from "../../../../../lib/devOptions";
import { SCRIPT_TYPES, EXECUTION_OPTIONS } from "../../../../../lib/devOptions";
import { cn } from "@/lib/utils";

type Props = {
  params: { storyId: string };
};

export default function NewDevelopmentPage({ params }: Props) {
  const router = useRouter();
  const story = getStoryById(params.storyId);
  const client = story ? getClientById(story.clientId) : undefined;

  if (!story || !client) {
    // côté client ce sera rare, mais au cas où
    return (
      <div className="p-6">
        <p className="text-sm text-red-400">
          Story not found. Go back to{" "}
          <Link href="/clients" className="underline">
            Clients
          </Link>
          .
        </p>
      </div>
    );
  }

  const [mode, setMode] = useState<"manual" | "xml">("manual");

  // State pour Manual
  const [scriptType, setScriptType] = useState<ScriptTypeOption>("Business Rule");
  const [execution, setExecution] = useState<ExecutionOption>("before");
  const [name, setName] = useState("");
  const [tableName, setTableName] = useState("");
  const [scope, setScope] = useState("");
  const [version, setVersion] = useState("");
  const [scriptBody, setScriptBody] = useState("");

  // State pour Import XML
  const [xmlFileName, setXmlFileName] = useState<string | null>(null);
  const [xmlPreview, setXmlPreview] = useState<string>("");

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Pour l'instant on simule : plus tard on fera appel API / DB.
    console.log("Create dev (manual):", {
      clientId: client.id,
      storyId: story.id,
      scriptType,
      execution,
      name,
      tableName,
      scope,
      version,
      scriptBody,
    });

    alert("Dev created (mock). In real app: save to DB & redirect.");
    router.push(`/stories/${story.id}`);
  };

  const handleXmlChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setXmlFileName(file.name);

    const text = await file.text();
    // Ici, plus tard :
    // - parse du XML
    // - détection type (BR, Client Script, etc.)
    // - remplissage auto des champs
    // Pour l'instant : simple preview tronquée.
    setXmlPreview(text.slice(0, 2000));
  };

  const handleXmlSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Create dev (from XML) - TODO: parse & map:", {
      clientId: client.id,
      storyId: story.id,
      xmlFileName,
      xmlPreviewLength: xmlPreview.length,
    });

    alert(
      "XML import mock. Next step: parse XML & prefill fields before saving."
    );
    router.push(`/stories/${story.id}`);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Breadcrumb */}
      <div className="text-[9px] text-slate-500 flex gap-1">
        <Link
          href={`/clients/${client.id}`}
          className="hover:text-sky-400"
        >
          {client.name}
        </Link>
        <span>/</span>
        <Link
          href={`/stories/${story.id}`}
          className="hover:text-sky-400"
        >
          {story.reference}
        </Link>
        <span>/</span>
        <span className="text-sky-400">New development</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
            New development
          </div>
          <h1 className="text-lg font-semibold text-slate-100">
            {story.reference} — {story.title}
          </h1>
          <div className="mt-1 text-[10px] text-slate-400 flex gap-3 flex-wrap">
            <span>Client: {client.name}</span>
            <span>Story ID: {story.id}</span>
          </div>
        </div>
        <Link
          href={`/stories/${story.id}`}
          className="px-3 py-1.5 rounded-md border border-slate-700 text-[9px] hover:border-sky-500 hover:text-sky-400"
        >
          ← Back to story
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-900 flex gap-2 text-[10px]">
        <button
          onClick={() => setMode("manual")}
          className={cn(
            "px-3 py-2 border-b-2",
            mode === "manual"
              ? "border-sky-500 text-sky-400 font-medium"
              : "border-transparent text-slate-500 hover:text-sky-400"
          )}
        >
          Manual
        </button>
        <button
          onClick={() => setMode("xml")}
          className={cn(
            "px-3 py-2 border-b-2",
            mode === "xml"
              ? "border-sky-500 text-sky-400 font-medium"
              : "border-transparent text-slate-500 hover:text-sky-400"
          )}
        >
          Import XML
        </button>
      </div>

      {/* Content */}
      {mode === "manual" ? (
        <form
          onSubmit={handleManualSubmit}
          className="space-y-4 text-[10px]"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-slate-400">
                Script type
              </label>
              <select
                value={scriptType}
                onChange={(e) =>
                  setScriptType(e.target.value as ScriptTypeOption)
                }
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 outline-none text-slate-100 text-[10px]"
              >
                {SCRIPT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-slate-400">
                Execution (when)
              </label>
              <select
                value={execution}
                onChange={(e) =>
                  setExecution(e.target.value as ExecutionOption)
                }
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 outline-none text-slate-100 text-[10px]"
              >
                {EXECUTION_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[9px] text-slate-500">
                (Later: filter options per script type, like Business
                Rule: before/after/display/async)
              </p>
            </div>
            <div>
              <label className="block mb-1 text-slate-400">
                Target table
              </label>
              <input
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="e.g. incident, sc_req_item, sys_user..."
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 outline-none text-slate-100"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-slate-400">
                Script name / label
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. BR - Set manager from dept"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 outline-none text-slate-100"
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-400">
                Scope
              </label>
              <input
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="e.g. global, x_hwi_custom..."
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 outline-none text-slate-100"
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-400">
                Version / ref
              </label>
              <input
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="e.g. v1, v2, CHG012345"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 outline-none text-slate-100"
              />
            </div>
          </div>

          {/* Script editor */}
          <div>
            <label className="block mb-1 text-slate-400">
              Script
            </label>
            <div className="border border-slate-800 rounded bg-[#050812]">
              <div className="px-3 py-1.5 border-b border-slate-900 flex justify-between items-center">
                <span className="text-[9px] text-slate-500">
                  JavaScript (ServiceNow style)
                </span>
                <span className="text-[8px] text-slate-600">
                  (Later: Monaco/CodeMirror, syntax highlight, etc.)
                </span>
              </div>
              <textarea
                value={scriptBody}
                onChange={(e) => setScriptBody(e.target.value)}
                placeholder={`(function executeRule(current, previous /*null when async*/) {\n  // Your BR / script here\n})();`}
                className="w-full h-56 bg-transparent px-3 py-2 text-[10px] font-mono text-slate-100 outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => router.push(`/stories/${story.id}`)}
              className="px-3 py-1.5 rounded-md border border-slate-700 text-[9px] text-slate-300 hover:border-slate-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-sky-600 text-[9px] font-semibold hover:bg-sky-500"
            >
              Save development
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleXmlSubmit}
          className="space-y-4 text-[10px]"
        >
          <div>
            <label className="block mb-1 text-slate-400">
              Import ServiceNow XML export
            </label>
            <input
              type="file"
              accept=".xml"
              onChange={handleXmlChange}
              className="block text-[10px] text-slate-300"
            />
            <p className="mt-1 text-[9px] text-slate-500">
              Drop a Business Rule / Script Include / UI Action XML. Next
              step: auto-detect type, table, scope & script body.
            </p>
          </div>

          {xmlFileName && (
            <div className="border border-slate-900 rounded-lg p-3 bg-slate-950">
              <div className="text-[9px] text-sky-400 mb-1">
                {xmlFileName}
              </div>
              <pre className="max-h-64 overflow-auto text-[8px] text-slate-300 leading-snug">
                {xmlPreview || "(empty file?)"}
              </pre>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => router.push(`/stories/${story.id}`)}
              className="px-3 py-1.5 rounded-md border border-slate-700 text-[9px] text-slate-300 hover:border-slate-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!xmlFileName}
              className="px-4 py-1.5 rounded-md bg-sky-600 text-[9px] font-semibold hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500"
            >
              Import & save (mock)
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
