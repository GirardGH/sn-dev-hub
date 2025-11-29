import Link from "next/link";
import ListLayout from "@/components/layout/ListLayout";
import { supabaseServer } from "@/lib/supabase/server";

export default async function AllDevelopmentsPage() {

  const supabase = supabaseServer();

  // ------- 1) Fetch developments + join story + join client -------
  const { data: devs, error } = await supabase
    .from("developments")
    .select(`
      id,
      name,
      type,
      execution,
      table_name,
      created_at,
      stories:story_id (
        id,
        reference,
        clients:client_id (
          id,
          name
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading developments:", error);
    return <div className="p-6 text-red-500">Error loading developments.</div>;
  }

  return (
    <ListLayout title="All Developments" newLink="/developments/new">
      <table className="min-w-full text-[11px] border-collapse table-fixed">
        <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400 uppercase sticky top-0 z-10">
          <tr className="border-t border-slate-200 dark:border-slate-800 hover:bg-cyan-800/20 dark:hover:bg-slate-900/40 transition-colors">
            <th className="px-3 py-1.5 text-left">Client</th>
            <th className="px-3 py-1.5 text-left">Story</th>
            <th className="px-3 py-1.5 text-left">Type</th>
            <th className="px-3 py-1.5 text-left">Name</th>
            <th className="px-3 py-1.5 text-left">Execution</th>
            <th className="px-3 py-1.5 text-left">Table</th>
            <th className="px-3 py-1.5 text-left">Created</th>
          </tr>
        </thead>

        <tbody className="[&>tr:nth-child(even)]:bg-slate-400/10">
          {devs?.map((dev) => {
            const client = dev.stories?.clients;
            const story = dev.stories;

            return (
              <tr
                key={dev.id}
                className="border-t dark:border-slate-800 hover:bg-cyan-800/20 dark:hover:bg-slate-800/60 transition-colors"
              >
                {/* CLIENT */}
                <td className="px-3 py-1.5 dark:text-slate-300">
                  {client?.name ?? "—"}
                </td>

                {/* STORY */}
                <td className="px-3 py-1.5">
                  {story ? (
                    <Link
                      href={`/stories/${story.id}`}
                      className="text-sky-400 hover:underline"
                    >
                      {story.reference}
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>

                {/* TYPE */}
                <td className="px-3 py-1.5">{dev.type}</td>

                {/* NAME */}
                <td className="px-3 py-1.5">
                  <Link
                    href={`/developments/${dev.id}`}
                    className="text-sky-400 hover:underline"
                  >
                    {dev.name}
                  </Link>
                </td>

                {/* EXECUTION */}
                <td className="px-3 py-1.5 dark:text-slate-300">
                  {dev.execution ?? "—"}
                </td>

                {/* TABLE NAME */}
                <td className="px-3 py-1.5 font-mono dark:text-slate-300">
                  {dev.table_name ?? "—"}
                </td>

                {/* CREATED */}
                <td className="px-3 py-1.5 dark:text-slate-300">
                  {new Date(dev.created_at).toLocaleDateString()}
                </td>
              </tr>
            );
          })}

          {(!devs || devs.length === 0) && (
            <tr>
              <td
                colSpan={7}
                className="px-3 py-3 text-center text-slate-500"
              >
                No developments yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </ListLayout>
  );
}
