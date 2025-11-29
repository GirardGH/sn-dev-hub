// lib/data/developments.ts
import { supabase } from "../supabase";

export type Development = {
  id: string;
  story_id: string;
  type: string;
  name: string;
  table_name: string | null;
  author: string | null;
  script: string | null;
  execution: string | null;
  condition: string | null;
  fields_impacted: string | null;
  version: string | null;
  scope: string | null;
  description: string | null;
  comment: string | null;
  attachment_xml_url: any[] | null;
  attachment_media_url: any[] | null;
  created_at: string;
  updated_at: string;
};

// 🔥 Get by story
export async function getDevsByStory(storyId: string): Promise<Development[]> {
  const { data, error } = await supabase
    .from("developments")
    .select("*")
    .eq("story_id", storyId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// 🔥 Create
export async function createDevelopment(payload: Omit<Development, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("developments")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 🔥 Update
export async function updateDevelopment(id: string, payload: Partial<Development>) {
  const { data, error } = await supabase
    .from("developments")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ❌ Delete
export async function deleteDevelopment(id: string) {
  const { error } = await supabase.from("developments").delete().eq("id", id);
  if (error) throw error;
}
