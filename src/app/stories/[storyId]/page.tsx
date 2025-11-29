import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function StoryDetailPage({
  params,
}: {
  params: { storyId: string };
}) {
  // ------------------- FETCH STORY -------------------
  const { data: story, error: storyErr } = await supabase
    .from("stories")
    .select(
      `
      *,
      clients:client_id ( name )
    `
    )
    .eq("id", params.storyId)
    .single();

  if (storyErr || !story) {
    return <div className="p-6">Story not found</div>;
  }

  // ------------------- FETCH LINKED DEVELOPMENTS -------------------
  const { data: developments } = await supabase
    .from("developments")
    .select("*")
    .eq("story_id", params.storyId)
    .order("created_at", { ascending: false });

  const clientName = story.clients?.name ?? "Unknown client";

  return (
    <div className="h-full flex flex-col dark:bg-slate-950">
      {/* ----------------------- HEADER ----------------------- */}
      <div className="sticky top-0 z-30 px-8 py-4 dark:bg-slate-950/90 backdrop-blur border-b border-slate-800">
        <div className="flex items-center gap-2 text-[10px] dark:text-slate-400">
          <Link href={`/clients/${story.client_id}/stories`} className="hover:text-sky-400">
            {clientName}
          </Link>
          <span>/ Story</span>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <span className="font-semibold text-sky-400 text-sm">
            {story.reference}
          </span>
          <span className="text-lg font-semibold dark:text-slate-200">
            {story.title}
          </span>
        </div>
      </div>

      {/* ----------------------- MAIN CONTENT ----------------------- */}
      <div className="h-screen px-8 py-6 space-y-10 overflow-auto scrollbar-thin">

        {/* ----------------------- STORY INFO ----------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="space-y-6">
            <Field label="Client">
              <input
                disabled
                value={clientName}
                className="input"
              />
            </Field>

            <Field label="Reference">
              <input disabled value={story.reference} className="input" />
            </Field>

            <Field label="Title">
              <input disabled value={story.title} className="input" />
            </Field>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Field label="Type">
              <input disabled value={story.type} className="input" />
            </Field>

            <Field label="Created at">
              <input
                disabled
                value={new Date(story.created_at).toLocaleString()}
                className="input"
              />
            </Field>

            <Field label="Updated at">
              <input
                disabled
                value={story.updated_at ? new Date(story.updated_at).toLocaleString() : "—"}
                className="input"
              />
            </Field>
          </div>
        </div>

        {/* DESCRIPTION & COMMENTS */}
        <Field label="Description">
          <textarea
            disabled
            value={story.description ?? ""}
            className="input h-32"
          />
        </Field>

        <Field label="Comments">
          <textarea
            disabled
            value={story.comments ?? ""}
            className="input h-32"
          />
        </Field>

        {/* ----------------------- LINKED DEVELOPMENTS ----------------------- */}
        <div>
          <h2 className="text-sm font-semibold mb-3 dark:text-slate-100">
            Linked Developments
          </h2>

          <table className="min-w-full text-[11px] border-collapse table-fixed">
            <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 uppercase">
              <tr>
                <th className="px-3 py-2 text-left w-[140px]">Type</th>
                <th className="px-3 py-2 text-left w-[200px]">Name</th>
                <th className="px-3 py-2 text-left w-[180px]">Table</th>
                <th className="px-3 py-2 text-left w-[120px]">Execution</th>
                <th className="px-3 py-2 text-left w-[120px]">Created</th>
              </tr>
            </thead>

            <tbody className="[&>tr:nth-child(even)]:bg-slate-400/10">
              {developments?.map((dev) => (
                <tr key={dev.id} className="border-t dark:border-slate-800">
                  <td className="px-3 py-2">{dev.type}</td>

                  <td className="px-3 py-2">
                    <Link href={`/developments/${dev.id}`} className="text-sky-400 hover:underline">
                      {dev.name}
                    </Link>
                  </td>

                  <td className="px-3 py-2">{dev.table_name}</td>
                  <td className="px-3 py-2">{dev.execution}</td>

                  <td className="px-3 py-2">
                    {new Date(dev.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}

              {(!developments || developments.length === 0) && (
                <tr>
                  <td colSpan={5} className="text-center py-3 text-slate-500">
                    No developments yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- FIELD UI ----------------
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <label className="text-[11px] absolute -top-2 left-2 px-1 rounded bg-[#032d42] text-slate-50 dark:bg-slate-950 dark:text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}
