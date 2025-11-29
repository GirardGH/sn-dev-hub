import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ListLayout from "@/components/layout/ListLayout";

export default async function ClientStoriesPage({
  params,
}: {
  params: { clientId: string };
}) {
  const clientId = params.clientId;

  // ----------------------------------------
  // 1. Fetch client
  // ----------------------------------------
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("*")
    .eq("id", clientId)
    .single();

  if (!client || clientError) return notFound();

  // ----------------------------------------
  // 2. Fetch stories (only relevant fields)
  // ----------------------------------------
  const { data: stories, error: storiesError } = await supabase
    .from("stories")
    .select("id, reference, title, type, created_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (storiesError) {
    console.error(storiesError);
    return <div>Error loading stories.</div>;
  }

  return (
    <ListLayout
      title={`Stories for ${client.name}`}
      newLink={`/clients/${clientId}/stories/new`}
    >
      <table className="min-w-full text-[11px] border-collapse table-fixed">
        <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 uppercase sticky top-0 z-10">
          <tr className="border-t border-slate-200 dark:border-slate-800">
            <th className="px-3 py-1.5 text-left">Reference</th>
            <th className="px-3 py-1.5 text-left">Title</th>
            <th className="px-3 py-1.5 text-left">Type</th>
            <th className="px-3 py-1.5 text-left">Created</th>
          </tr>
        </thead>

        <tbody className="[&>tr:nth-child(even)]:bg-slate-400/10">
          {stories?.map((story) => (
            <tr
              key={story.id}
              className="border-t dark:border-slate-800 dark:hover:bg-slate-800/60 transition-colors"
            >
              {/* Reference */}
              <td className="px-3 py-1.5 truncate">
                <Link
                  href={`/stories/${story.id}`}
                  className="text-sky-400 hover:underline"
                >
                  {story.reference}
                </Link>
              </td>

              {/* Title */}
              <td className="px-3 py-1.5 truncate">{story.title}</td>

              {/* Type */}
              <td className="px-3 py-1.5 truncate">{story.type}</td>

              {/* Created */}
              <td className="px-3 py-1.5 dark:text-slate-400 truncate">
                {new Date(story.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}

          {stories?.length === 0 && (
            <tr>
              <td colSpan={4} className="px-3 py-3 text-center text-slate-500">
                No stories yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </ListLayout>
  );
}
