import { createClient } from "@supabase/supabase-js";
import StoryCreator from "@/components/stories/StoryCreator";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function NewStoryPage() {
  // Fetch clients for the dropdown
  const { data: clients } = await supabase
    .from("clients")
    .select("id, name")
    .order("name");

  return (
    <div className="h-full dark:bg-slate-950 px-8 py-6">
      <StoryCreator clients={clients ?? []} />
    </div>
  );
}
