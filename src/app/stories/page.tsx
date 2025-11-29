import Link from "next/link";
import ListLayout from "@/components/layout/ListLayout";
import { supabase } from "@/lib/supabase";

export default async function AllStoriesPage() {
  // Fetch stories + client name (join)
  const { data: stories, error } = await supabase
    .from("stories")
    .select(`
      id,
      reference,
      title,
      type,
      created_at,
      clients:client_id ( name )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div className="p-6 text-red-400">Error loading stories.</div>;
  }

  return (
    <ListLayout title="All Stories" newLink="/stories/new">
      <table className="min-w-full text-[11px] border-collapse table-fixed">
        <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400 uppercase sticky top-0 z-10">
          <tr className="border-t border-slate-200 dark:border-slate-800 dark:hover:bg-slate-900/40 transition-colors">
            <th className="px-3 py-1.5 text-left">Client</th>
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
              {/* client name from join */}
              <td className="px-3 py-1.5 text-slate-900 dark:text-slate-300">
                {story.clients?.[0]?.name ?? "—"}

              </td>

              <td className="px-3 py-1.5">
                <Link
                  href={`/stories/${story.id}`}
                  className="text-sky-400 hover:underline"
                >
                  {story.reference}
                </Link>
              </td>

              <td className="px-3 py-1.5">{story.title}</td>
              <td className="px-3 py-1.5">{story.type}</td>

              <td className="px-3 py-1.5 dark:text-slate-400">
                {new Date(story.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}

          {stories?.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-3 py-4 text-center text-slate-500"
              >
                No stories yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </ListLayout>
  );
}
