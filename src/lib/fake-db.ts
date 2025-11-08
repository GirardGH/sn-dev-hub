// src/lib/fake-db.ts

export const fakeClients = [
  {
    id: "1",
    name: "Client Alpha",
    notes: "Client historique dans l'industrie",
    created_at: "2025-01-01",
  },
  {
    id: "2",
    name: "Client Beta",
    notes: "Client cloud-first",
    created_at: "2025-02-15",
  },
];

export const fakeStories = [
  {
    id: "1",
    client_id: "1",
    user_id: "user-1",
    reference: "STRY-0001",
    ticket_type: "Story",
    description: "Création d'une UI Action pour le catalogue",
    media_urls: [],
    created_at: "2025-01-10",
  },
  {
    id: "2",
    client_id: "2",
    user_id: "user-1",
    reference: "STRY-0002",
    ticket_type: "Enhancement",
    description: "Optimisation d'un script include",
    media_urls: [],
    created_at: "2025-03-01",
  },
];

export const fakeDevelopments = [
  {
    id: "1",
    story_id: "1",
    user_id: "user-1",
    script_name: "UI Action - Valider Demande",
    description: "Affiche un bouton pour valider la demande côté agent.",
    script_type: "UI Action",
    execution_timing: "after",
    linked_table: "sc_req_item",
    scope: "x_custom_scope",
    version: "1.0.0",
    script: "// Script ici...",
    media_urls: [],
    xml_url: null,
    created_at: "2025-01-12",
  },
  {
    id: "2",
    story_id: "2",
    user_id: "user-1",
    script_name: "Business Rule - Auto Assign",
    description: "Assigne automatiquement les tickets selon la priorité",
    script_type: "Business Rule",
    execution_timing: "before",
    linked_table: "incident",
    scope: "x_custom_scope",
    version: "1.1.0",
    script: "// BR script ici...",
    media_urls: [],
    xml_url: null,
    created_at: "2025-03-05",
  },
];
