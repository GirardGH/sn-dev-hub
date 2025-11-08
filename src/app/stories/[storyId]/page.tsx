import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getStoryById,
  getClientById,
  getDevsByStory,
} from "@/lib/mockData";

type Props = {
  params: { storyId: string };
};

export default function StoryDetailPage({ params }: Props) {
  const story = getStoryById(params.storyId);
  if (!story) return notFound();

  const client = getClientById(story.clientId);
  const devs = getDevsByStory(story.id);

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-[9px] text-slate-500 flex gap-1">
        {client && (
          <>
            <Link
              href={`/clients/${client.id}`}
              className="hover:text-sky-400"
            >
              {client.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-400">Story</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sky-400 text-sm">
              {story.reference}
            </span>
            <h1 className="text-lg font-semibold text-slate-100">
              {story.title}
            </h1>
          </div>
          <div className="mt-1 text-[10px] text-slate-400 flex gap-3 flex-wrap">
            {client && <span>Client: {client.name}</span>}
            <span>Status: {story.status}</span>
            <span>Type: {story.type}</span>
            <span>Updated: {story.updatedAt}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {client && (
            <Link
              href={`/clients/${client.id}`}
              className="px-3 py-1.5 rounded-md border border-slate-700 text-[9px] hover:border-sky-500 hover:text-sky-400"
            >
              ← Back to client
            </Link>
          )}
          <Link
            href={`/stories/${story.id}/developments/new`}
            className="px-3 py-1.5 rounded-md bg-sky-600 text-[9px] font-medium hover:bg-sky-500"
          >
            + Add development
          </Link>

        </div>
      </div>

      {/* Related developments */}
      <section>
        <h2 className="text-sm font-semibold mb-2 text-slate-100">
          Linked developments
        </h2>
        <div className="border border-slate-900 rounded-lg overflow-hidden">
          <table className="min-w-full text-[10px]">
            <thead className="bg-slate-900 text-slate-400 uppercase">
              <tr>
                <th className="px-3 py-1.5 text-left">Type</th>
                <th className="px-3 py-1.5 text-left">Name</th>
                <th className="px-3 py-1.5 text-left">Table</th>
                <th className="px-3 py-1.5 text-left">Author</th>
                <th className="px-3 py-1.5 text-left">Updated</th>
              </tr>
            </thead>
            <tbody>
              {devs.map((dev) => (
                <tr
                  key={dev.id}
                  className="border-t border-slate-900 hover:bg-slate-900/60"
                >
                  <td className="px-3 py-1.5">{dev.type}</td>
                  <td className="px-3 py-1.5">
                    <Link
                      href={`/developments/${dev.id}`}
                      className="text-sky-400 hover:underline"
                    >
                      {dev.name}
                    </Link>
                  </td>
                  <td className="px-3 py-1.5 font-mono text-slate-400">
                    {dev.table}
                  </td>
                  <td className="px-3 py-1.5 text-slate-300">
                    {dev.author}
                  </td>
                  <td className="px-3 py-1.5 text-slate-400">
                    {dev.updatedAt}
                  </td>
                </tr>
              ))}
              {devs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-3 text-center text-slate-500"
                  >
                    No developments linked to this story yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
