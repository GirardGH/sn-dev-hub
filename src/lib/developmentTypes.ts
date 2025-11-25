export type ArtifactType =
  | "business_rule"
  | "client_script"
  | "script_include"
  | "ui_action"
  | "scheduled_job"
  | "transform_map"
  | "background_script"
  | "mail_script"
  | "service_portal_widget"
  | "other";

export type ExecutionWhenBR = "before" | "after" | "async" | "display";
export type ClientScriptWhen = "onLoad" | "onChange" | "onSubmit" | "onCellEdit";
export type UiType = "all" | "desktop" | "mobile";

export interface BaseDevelopment {
  id?: string;
  storyId?: string;          // lié à la story
  scope?: string;            // Global / x_app
  name: string;
  description: string;
  comment?: string;
  version?: string;
  linkedTable?: string;      // ex: incident, sc_req_item...
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  // PJ (tu peux stocker des urls plus tard)
  xmlAttachmentUrl?: string | null;
  mediaAttachmentUrl?: string | null;
}

// -------- Artifact-specific types --------

export interface BusinessRuleDev extends BaseDevelopment {
  type: "business_rule";
  data: {
    table: string;
    when: ExecutionWhenBR;
    order?: number;
    condition?: string;          // script condition
    filterCondition?: string;    // encoded query
    advanced?: boolean;
    active?: boolean;
    actions?: {
      insert?: boolean;
      update?: boolean;
      delete?: boolean;
      query?: boolean;
    };
    script: string;
    fieldsImpacted?: string;     // texte libre
  };
}

export interface ClientScriptDev extends BaseDevelopment {
  type: "client_script";
  data: {
    table: string;
    uiType?: UiType;
    when: ClientScriptWhen;
    fieldName?: string;
    view?: string;
    global?: boolean;
    inherited?: boolean;
    isolateScript?: boolean;
    active?: boolean;
    script: string;
    scriptInclude?: string;
    fieldsImpacted?: string;
  };
}

export interface ScriptIncludeDev extends BaseDevelopment {
  type: "script_include";
  data: {
    apiName: string;
    access: "package_private" | "public";
    callerAccess?: string;
    clientCallable?: boolean;
    active?: boolean;
    script: string;
  };
}

export interface UiActionDev extends BaseDevelopment {
  type: "ui_action";
  data: {
    table: string;
    order?: number;
    condition?: string;
    hint?: string;
    onclick?: string;
    active?: boolean;
    client?: boolean;
    // placements
    formButton?: boolean;
    formContextMenu?: boolean;
    formLink?: boolean;
    listButton?: boolean;
    listContextMenu?: boolean;
    // visibility
    showInsert?: boolean;
    showUpdate?: boolean;
    showQuery?: boolean;
    showMultipleUpdate?: boolean;
    script: string;
    fieldsImpacted?: string;
  };
}

// Union finale
export type Development =
  | BusinessRuleDev
  | ClientScriptDev
  | ScriptIncludeDev
  | UiActionDev;

// -------- helpers --------

export const ARTIFACT_LABELS: Record<ArtifactType, string> = {
  business_rule: "Business Rule",
  client_script: "Client Script",
  script_include: "Script Include",
  ui_action: "UI Action",
  scheduled_job: "Scheduled Job",
  transform_map: "Transform Map",
  background_script: "Background Script",
  mail_script: "Mail Script",
  service_portal_widget: "Service Portal Widget",
  other: "Other",
};

// Empty factories (pour reset / create)
export const emptyDevByType = (type: ArtifactType): Development => {
  switch (type) {
    case "business_rule":
      return {
        type,
        name: "",
        description: "",
        data: {
          table: "",
          when: "before",
          order: 100,
          advanced: false,
          active: true,
          actions: { insert: true, update: true, delete: false, query: false },
          script: "",
        },
      };
    case "client_script":
      return {
        type,
        name: "",
        description: "",
        data: {
          table: "",
          when: "onLoad",
          uiType: "all",
          active: true,
          isolateScript: true,
          script: "",
          scriptInclude: "",
        },
      };
    case "script_include":
      return {
        type,
        name: "",
        description: "",
        data: {
          apiName: "",
          access: "package_private",
          clientCallable: false,
          active: true,
          script: "",
        },
      };
    case "ui_action":
      return {
        type,
        name: "",
        description: "",
        data: {
          table: "",
          order: 100,
          active: true,
          script: "",
        },
      };
    default:
      // fallback safe
      return emptyDevByType("business_rule");
  }
};
