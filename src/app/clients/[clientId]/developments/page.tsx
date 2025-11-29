import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ListLayout from "@/components/layout/ListLayout";

export default async function ClientDevelopmentsPage({
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

  if (clientError || !client) {
    return (
      <div className="p-6 text-red-500">
        Client not found or not accessible.
      </div>
    );
  }

  // ----------------------------------------
  // 2. Fetch stories of the client (for linking)
  // ----------------------------------------
  const { data: stories } = await supabase
    .from("stories")
    .select("id, reference")
    .eq("client_id", clientId);

  const storyMap = new Map(stories?.map((s) => [s.id, s]) ?? []);

  // ----------------------------------------
  // 3. Fetch developments for this client
  // JOIN via story_id → story.client_id = clientId
  // ----------------------------------------
  const { data: devs, error: devError } = await supabase
    .from("developments")
    .select("*")
    .in(
      "story_id",
      stories?.map((s) => s.id) ?? []
    );

  if (devError) {
    return (
      <div className="p-6 text-red-500">
        Unable to load developments.
      </div>
    );
  }

  return (
    <ListLayout
      title={`Developments for ${client.name}`}
      newLink={`/clients/${clientId}/developments/new`}
    >
      <table className="min-w-full text-[11px] border-collapse table-fixed">
        <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400 uppercase sticky top-0 z-10">
          <tr className="border-t border-slate-200 dark:border-slate-800">
            <th className="px-3 py-2 text-left w-[120px]">Story</th>
            <th className="px-3 py-2 text-left w-[120px]">Type</th>
            <th className="px-3 py-2 text-left w-[220px]">Name</th>
            <th className="px-3 py-2 text-left w-[180px]">Table</th>
            <th className="px-3 py-2 text-left w-[140px]">Author</th>
            <th className="px-3 py-2 text-left w-[120px]">Updated</th>
          </tr>
        </thead>

        <tbody className="[&>tr:nth-child(even)]:bg-slate-400/10">
          {devs && devs.length > 0 ? (
            devs.map((dev) => {
              const story = dev.story_id ? storyMap.get(dev.story_id) : null;

              return (
                <tr
                  key={dev.id}
                  className="border-t dark:border-slate-800 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {/* STORY */}
                  <td className="px-3 py-2 truncate">
                    {story ? (
                      <Link
                        href={`/stories/${story.id}`}
                        className="text-sky-400 hover:underline"
                      >
                        {story.reference}
                      </Link>
                    ) : (
                      "Unlinked"
                    )}
                  </td>

                  {/* TYPE */}
                  <td className="px-3 py-2 truncate">{dev.type}</td>

                  {/* NAME */}
                  <td className="px-3 py-2 truncate">
                    <Link
                      href={`/developments/${dev.id}`}
                      className="text-sky-400 hover:underline"
                    >
                      {dev.name}
                    </Link>
                  </td>

                  {/* TABLE */}
                  <td className="px-3 py-2 dark:text-slate-400 truncate">
                    {dev.table_name}
                  </td>

                  {/* AUTHOR */}
                  <td className="px-3 py-2 dark:text-slate-300 truncate">
                    {dev.author}
                  </td>

                  {/* UPDATED */}
                  <td className="px-3 py-2 dark:text-slate-400 truncate">
                    {dev.updated_at
                      ? new Date(dev.updated_at).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={6}
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
