// lib/data/stories.ts
import { supabase } from "../supabase";

export type Story = {
  id: string;
  client_id: string;
  parent_id: string | null;
  reference: string;
  title: string;
  description: string | null;
  comments: string | null;
  type: string;
  reference_link: string | null;
  media: any[];
  created_at: string;
  updated_at: string;
};

// 📌 Toutes les stories d’un client
export async function getStoriesByClient(clientId: string): Promise<Story[]> {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

// 📌 Story par ID
export async function getStoryById(id: string): Promise<Story | null> {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

// ➕ Create
export async function createStory(payload: Omit<Story, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase
    .from("stories")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ✏ Update
export async function updateStory(id: string, payload: Partial<Story>) {
  const { data, error } = await supabase
    .from("stories")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ❌ Delete
export async function deleteStory(id: string) {
  const { error } = await supabase.from("stories").delete().eq("id", id);
  if (error) throw error;
}
