import {
  Development,
  emptyDevByType,
  ArtifactType,
  BusinessRuleDev,
  ClientScriptDev,
  ScriptIncludeDev,
  UiActionDev,
} from "@/lib/developmentTypes";

const firstText = (el: Element, tag: string) =>
  el.querySelector(tag)?.textContent?.trim() ?? "";

const boolText = (el: Element, tag: string, def = false) => {
  const v = firstText(el, tag);
  if (v === "") return def;
  return v === "true" || v === "1";
};

const numText = (el: Element, tag: string, def?: number) => {
  const v = firstText(el, tag);
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : def;
};

export function parseServiceNowXML(xmlContent: string): Development {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlContent, "text/xml");

  const element =
    doc.querySelector("sys_script") ||
    doc.querySelector("sys_script_client") ||
    doc.querySelector("sys_script_include") ||
    doc.querySelector("sys_ui_action");

  if (!element) {
    return emptyDevByType("business_rule");
  }

  const tagName = element.tagName;

  const typeMap: Record<string, ArtifactType> = {
    sys_script: "business_rule",
    sys_script_client: "client_script",
    sys_script_include: "script_include",
    sys_ui_action: "ui_action",
  };

  const type = typeMap[tagName] ?? "business_rule";
  let dev = emptyDevByType(type);

  // base
  dev.name = firstText(element, "name") || firstText(element, "sys_name");
  dev.description = firstText(element, "description");
  dev.linkedTable =
    firstText(element, "collection") ||
    firstText(element, "table") ||
    firstText(element, "table_name");

  // by type
  if (type === "business_rule") {
    const br = dev as BusinessRuleDev;
    br.data.table = br.linkedTable || "";
    br.data.when = (firstText(element, "when") as any) || "before";
    br.data.order = numText(element, "order", 100);
    br.data.filterCondition = firstText(element, "filter_condition");
    br.data.condition = firstText(element, "condition");
    br.data.script = firstText(element, "script");
    br.data.active = boolText(element, "active", true);
    br.data.advanced = boolText(element, "advanced", false);
    br.data.actions = {
      insert: boolText(element, "action_insert", true),
      update: boolText(element, "action_update", true),
      delete: boolText(element, "action_delete", false),
      query: boolText(element, "action_query", false),
    };
    return br;
  }

  if (type === "client_script") {
    const cs = dev as ClientScriptDev;
    cs.data.table = cs.linkedTable || "";
    cs.data.when = (firstText(element, "type") as any) || "onLoad";
    cs.data.fieldName = firstText(element, "field");
    cs.data.view = firstText(element, "view");
    cs.data.script = firstText(element, "script");
    cs.data.scriptInclude = firstText(element, "script_include");
    cs.data.active = boolText(element, "active", true);
    cs.data.global = boolText(element, "global", false);
    cs.data.inherited = boolText(element, "applies_extended", false);
    cs.data.isolateScript = !(
      firstText(element, "isolate_script") === "false"
    );
    const uiTypeCode = numText(element, "ui_type", 0);
    cs.data.uiType =
      uiTypeCode === 10 ? "desktop" : uiTypeCode === 1 ? "mobile" : "all";
    return cs;
  }

  if (type === "script_include") {
    const si = dev as ScriptIncludeDev;
    si.data.apiName =
      firstText(element, "api_name") ||
      (si.name || "").replace(/\s+/g, "");
    si.data.access =
      firstText(element, "access") === "public"
        ? "public"
        : "package_private";
    si.data.callerAccess = firstText(element, "caller_access");
    si.data.clientCallable = boolText(element, "client_callable", false);
    si.data.active = boolText(element, "active", true);
    si.data.script = firstText(element, "script");
    return si;
  }

  if (type === "ui_action") {
    const ua = dev as UiActionDev;
    ua.data.table = ua.linkedTable || "";
    ua.data.order = numText(element, "order", 100);
    ua.data.condition = firstText(element, "condition");
    ua.data.hint = firstText(element, "hint");
    ua.data.onclick = firstText(element, "onclick");
    ua.data.active = boolText(element, "active", true);
    ua.data.client = boolText(element, "client", false);

    ua.data.formButton = boolText(element, "form_button");
    ua.data.formContextMenu = boolText(element, "form_context_menu");
    ua.data.formLink = boolText(element, "form_link");
    ua.data.listButton = boolText(element, "list_button");
    ua.data.listContextMenu = boolText(element, "list_context_menu");

    ua.data.showInsert = boolText(element, "show_insert");
    ua.data.showUpdate = boolText(element, "show_update");
    ua.data.showQuery = boolText(element, "show_query");
    ua.data.showMultipleUpdate = boolText(element, "show_multiple_update");

    ua.data.script = firstText(element, "script");
    return ua;
  }

  return dev;
}
