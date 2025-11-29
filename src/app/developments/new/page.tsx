import DevelopmentCreator from "@/components/developments/DevelopmentCreator";
import { supabaseServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function NewDevelopmentPage() {
  const supabase = supabaseServer();

  // On récupère toutes les stories accessibles par l'utilisateur
  const { data: stories } = await supabase
    .from("stories")
    .select(`id, reference, title, client_id, clients(name)`);

  if (!stories) return notFound();

  return (
    <div className="h-full dark:bg-slate-950 px-8 py-6">
      <DevelopmentCreator
        stories={stories ?? []}
        onSubmit={async (dev) => {
          "use server";
          const supabase = supabaseServer();

          const payload = {
            story_id: dev.storyId ?? null,
            type: dev.type,
            name: dev.name,
            description: dev.description,
            comment: dev.comment ?? null,
            version: dev.version ?? null,
            table_name: dev.linkedTable ?? null,
            scope: dev.scope ?? null,
            data: dev.data, // JSON complet
          };

          await supabase.from("developments").insert(payload);
        }}
      />
    </div>
  );
}
