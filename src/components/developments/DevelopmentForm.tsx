"use client";

import { useMemo } from "react";
import {
  Development,
  ArtifactType,
  ARTIFACT_LABELS,
  emptyDevByType,
} from "@/lib/developmentTypes";

type Props = {
  value: Development;
  onChange: (next: Development) => void;
};

export default function DevelopmentForm({ value, onChange }: Props) {
  const type = value.type;

  const setBase = (patch: Partial<Development>) =>
    onChange({ ...value, ...patch } as Development);

  const setData = (patch: any) =>
    onChange({ ...value, data: { ...value.data, ...patch } } as Development);

  const Header = useMemo(
    () => (
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold dark:text-slate-200">
          Create Development — {ARTIFACT_LABELS[type]}
        </div>
        <select
          value={type}
          onChange={(e) => onChange(emptyDevByType(e.target.value as ArtifactType))}
          className="text-[12px] px-2 py-1 rounded border dark:border-slate-700 dark:bg-slate-900"
        >
          {(Object.keys(ARTIFACT_LABELS) as ArtifactType[])
            .filter((t) => t !== "other")
            .map((t) => (
              <option key={t} value={t}>
                {ARTIFACT_LABELS[t]}
              </option>
            ))}
        </select>
      </div>
    ),
    [type, onChange]
  );

  return (
    <div className="space-y-6">
      {Header}

      {/* BASE FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name *">
          <input
            value={value.name}
            onChange={(e) => setBase({ name: e.target.value })}
            className="input"
          />
        </Field>

        <Field label="Scope">
          <input
            value={value.scope ?? ""}
            onChange={(e) => setBase({ scope: e.target.value })}
            className="input"
            placeholder="Global / x_app"
          />
        </Field>
      </div>

      <Field label="Description *">
        <textarea
          value={value.description}
          onChange={(e) => setBase({ description: e.target.value })}
          className="input h-24"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field label="Linked table">
          <input
            value={value.linkedTable ?? ""}
            onChange={(e) => setBase({ linkedTable: e.target.value })}
            className="input"
            placeholder="incident, sc_req_item..."
          />
        </Field>

        <Field label="Version">
          <input
            value={value.version ?? ""}
            onChange={(e) => setBase({ version: e.target.value })}
            className="input"
          />
        </Field>

        <Field label="Comment">
          <input
            value={value.comment ?? ""}
            onChange={(e) => setBase({ comment: e.target.value })}
            className="input"
          />
        </Field>
      </div>

      {/* TYPE-SPECIFIC */}
      {type === "business_rule" && (
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Table *">
              <input
                value={value.data.table}
                onChange={(e) => setData({ table: e.target.value })}
                className="input"
              />
            </Field>

            <Field label="When *">
              <select
                value={value.data.when}
                onChange={(e) => setData({ when: e.target.value })}
                className="input"
              >
                <option value="before">Before</option>
                <option value="after">After</option>
                <option value="async">Async</option>
                <option value="display">Display</option>
              </select>
            </Field>

            <Field label="Order">
              <input
                type="number"
                value={value.data.order ?? 100}
                onChange={(e) => setData({ order: Number(e.target.value) })}
                className="input"
              />
            </Field>
          </div>

          <Field label="Filter (encoded query)">
            <input
              value={value.data.filterCondition ?? ""}
              onChange={(e) => setData({ filterCondition: e.target.value })}
              className="input"
              placeholder="active=true^category=software"
            />
          </Field>

          <Field label="Condition Script">
            <textarea
              value={value.data.condition ?? ""}
              onChange={(e) => setData({ condition: e.target.value })}
              className="input h-20 font-mono"
              placeholder="return current.active;"
            />
          </Field>

          <div className="flex flex-wrap gap-4 text-[12px] dark:text-slate-300">
            <Check
              label="Active"
              checked={value.data.active ?? true}
              onChange={(v) => setData({ active: v })}
            />
            <Check
              label="Advanced"
              checked={value.data.advanced ?? false}
              onChange={(v) => setData({ advanced: v })}
            />
          </div>

          <div className="flex flex-wrap gap-4 text-[12px] dark:text-slate-300">
            <Check
              label="Insert"
              checked={value.data.actions?.insert ?? true}
              onChange={(v) =>
                setData({ actions: { ...value.data.actions, insert: v } })
              }
            />
            <Check
              label="Update"
              checked={value.data.actions?.update ?? true}
              onChange={(v) =>
                setData({ actions: { ...value.data.actions, update: v } })
              }
            />
            <Check
              label="Delete"
              checked={value.data.actions?.delete ?? false}
              onChange={(v) =>
                setData({ actions: { ...value.data.actions, delete: v } })
              }
            />
            <Check
              label="Query"
              checked={value.data.actions?.query ?? false}
              onChange={(v) =>
                setData({ actions: { ...value.data.actions, query: v } })
              }
            />
          </div>

          <Field label="Fields impacted">
            <input
              value={value.data.fieldsImpacted ?? ""}
              onChange={(e) => setData({ fieldsImpacted: e.target.value })}
              className="input"
              placeholder="short_description, state..."
            />
          </Field>

          <Field label="Script *">
            <textarea
              value={value.data.script}
              onChange={(e) => setData({ script: e.target.value })}
              className="input h-52 font-mono"
              placeholder="(function executeRule(current, previous){ ... })();"
            />
          </Field>
        </section>
      )}

      {type === "client_script" && (
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Table *">
              <input
                value={value.data.table}
                onChange={(e) => setData({ table: e.target.value })}
                className="input"
              />
            </Field>

            <Field label="Type *">
              <select
                value={value.data.when}
                onChange={(e) => setData({ when: e.target.value })}
                className="input"
              >
                <option value="onLoad">onLoad</option>
                <option value="onChange">onChange</option>
                <option value="onSubmit">onSubmit</option>
                <option value="onCellEdit">onCellEdit</option>
              </select>
            </Field>

            <Field label="UI Type">
              <select
                value={value.data.uiType ?? "all"}
                onChange={(e) => setData({ uiType: e.target.value })}
                className="input"
              >
                <option value="all">All</option>
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Field name">
              <input
                value={value.data.fieldName ?? ""}
                onChange={(e) => setData({ fieldName: e.target.value })}
                className="input"
                placeholder="only if onChange"
              />
            </Field>

            <Field label="View">
              <input
                value={value.data.view ?? ""}
                onChange={(e) => setData({ view: e.target.value })}
                className="input"
              />
            </Field>
          </div>

          <div className="flex flex-wrap gap-4 text-[12px] dark:text-slate-300">
            <Check
              label="Active"
              checked={value.data.active ?? true}
              onChange={(v) => setData({ active: v })}
            />
            <Check
              label="Global"
              checked={value.data.global ?? false}
              onChange={(v) => setData({ global: v })}
            />
            <Check
              label="Inherited"
              checked={value.data.inherited ?? false}
              onChange={(v) => setData({ inherited: v })}
            />
            <Check
              label="Isolate script"
              checked={value.data.isolateScript ?? true}
              onChange={(v) => setData({ isolateScript: v })}
            />
          </div>

          <Field label="Fields impacted">
            <input
              value={value.data.fieldsImpacted ?? ""}
              onChange={(e) => setData({ fieldsImpacted: e.target.value })}
              className="input"
            />
          </Field>

          <Field label="Script *">
            <textarea
              value={value.data.script}
              onChange={(e) => setData({ script: e.target.value })}
              className="input h-52 font-mono"
              placeholder="function onLoad(){ ... }"
            />
          </Field>

          <Field label="Script include (optional)">
            <textarea
              value={value.data.scriptInclude ?? ""}
              onChange={(e) => setData({ scriptInclude: e.target.value })}
              className="input h-32 font-mono"
            />
          </Field>
        </section>
      )}

      {type === "script_include" && (
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="API Name *">
              <input
                value={value.data.apiName}
                onChange={(e) => setData({ apiName: e.target.value })}
                className="input"
                placeholder="MyUtils"
              />
            </Field>

            <Field label="Access">
              <select
                value={value.data.access}
                onChange={(e) => setData({ access: e.target.value })}
                className="input"
              >
                <option value="package_private">This application scope only</option>
                <option value="public">All application scopes</option>
              </select>
            </Field>
          </div>

          <Field label="Caller access (roles)">
            <input
              value={value.data.callerAccess ?? ""}
              onChange={(e) => setData({ callerAccess: e.target.value })}
              className="input"
              placeholder="itil, admin..."
            />
          </Field>

          <div className="flex flex-wrap gap-4 text-[12px] dark:text-slate-300">
            <Check
              label="Active"
              checked={value.data.active ?? true}
              onChange={(v) => setData({ active: v })}
            />
            <Check
              label="Client callable"
              checked={value.data.clientCallable ?? false}
              onChange={(v) => setData({ clientCallable: v })}
            />
          </div>

          <Field label="Script *">
            <textarea
              value={value.data.script}
              onChange={(e) => setData({ script: e.target.value })}
              className="input h-52 font-mono"
              placeholder="var MyUtils = Class.create(); ..."
            />
          </Field>
        </section>
      )}

      {type === "ui_action" && (
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Table *">
              <input
                value={value.data.table}
                onChange={(e) => setData({ table: e.target.value })}
                className="input"
              />
            </Field>

            <Field label="Order">
              <input
                type="number"
                value={value.data.order ?? 100}
                onChange={(e) => setData({ order: Number(e.target.value) })}
                className="input"
              />
            </Field>

            <Field label="Hint">
              <input
                value={value.data.hint ?? ""}
                onChange={(e) => setData({ hint: e.target.value })}
                className="input"
              />
            </Field>
          </div>

          <Field label="Condition">
            <input
              value={value.data.condition ?? ""}
              onChange={(e) => setData({ condition: e.target.value })}
              className="input"
            />
          </Field>

          <div className="flex flex-wrap gap-4 text-[12px] dark:text-slate-300">
            <Check
              label="Active"
              checked={value.data.active ?? true}
              onChange={(v) => setData({ active: v })}
            />
            <Check
              label="Client"
              checked={value.data.client ?? false}
              onChange={(v) => setData({ client: v })}
            />
          </div>

          <Group title="Display on">
            <Check label="Form button" checked={!!value.data.formButton} onChange={(v)=>setData({formButton:v})} />
            <Check label="Form context menu" checked={!!value.data.formContextMenu} onChange={(v)=>setData({formContextMenu:v})} />
            <Check label="Form link" checked={!!value.data.formLink} onChange={(v)=>setData({formLink:v})} />
            <Check label="List button" checked={!!value.data.listButton} onChange={(v)=>setData({listButton:v})} />
            <Check label="List context menu" checked={!!value.data.listContextMenu} onChange={(v)=>setData({listContextMenu:v})} />
          </Group>

          <Group title="Visibility">
            <Check label="Show insert" checked={!!value.data.showInsert} onChange={(v)=>setData({showInsert:v})} />
            <Check label="Show update" checked={!!value.data.showUpdate} onChange={(v)=>setData({showUpdate:v})} />
            <Check label="Show query" checked={!!value.data.showQuery} onChange={(v)=>setData({showQuery:v})} />
            <Check label="Show multiple update" checked={!!value.data.showMultipleUpdate} onChange={(v)=>setData({showMultipleUpdate:v})} />
          </Group>

          <Field label="Onclick">
            <textarea
              value={value.data.onclick ?? ""}
              onChange={(e) => setData({ onclick: e.target.value })}
              className="input h-20 font-mono"
            />
          </Field>

          <Field label="Fields impacted">
            <input
              value={value.data.fieldsImpacted ?? ""}
              onChange={(e) => setData({ fieldsImpacted: e.target.value })}
              className="input"
            />
          </Field>

          <Field label="Script *">
            <textarea
              value={value.data.script}
              onChange={(e) => setData({ script: e.target.value })}
              className="input h-52 font-mono"
              placeholder="(function onClick(){ ... })();"
            />
          </Field>
        </section>
      )}
    </div>
  );
}

// ---------- small UI ----------

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <label className="text-[11px] absolute -top-2 left-2 px-1 rounded dark:bg-slate-950 bg-[#032d42] dark:text-slate-400 text-slate-50">
        {label}
      </label>
      {children}
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500 focus:ring-sky-500"
      />
      {label}
    </label>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] uppercase tracking-wide dark:text-slate-500">{title}</div>
      <div className="flex flex-wrap gap-4 text-[12px] dark:text-slate-300">
        {children}
      </div>
    </div>
  );
}
