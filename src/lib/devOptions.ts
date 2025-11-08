export const SCRIPT_TYPES = [
  "Business Rule",
  "Client Script",
  "UI Action",
  "UI Policy",
  "Script Include",
  "Scheduled Script",
  "Fix Script",
  "Flow Action",
  "UI Macro",
  "Widget Server Script",
  "Widget Client Script",
] as const;

export type ScriptTypeOption = (typeof SCRIPT_TYPES)[number];

export const EXECUTION_OPTIONS = [
  "before",
  "after",
  "async",
  "display",
  "onChange",
  "onSubmit",
  "onLoad",
  "onCellEdit",
  "onUpdate",
] as const;

export type ExecutionOption = (typeof EXECUTION_OPTIONS)[number];
