import Link from "next/link";
import { getClientById, getStoriesByClient } from "@/lib/mockData";

type Props = {
  params: { clientId: string };
};

export default function ClientStoriesPage({ params }: Props) {
  const client = getClientById(params.clientId);
  if (!client) return null;

  const clientStories = getStoriesByClient(client.id);

  return (
    <div className="p-6">
      <h2 className="text-sm font-semibold mb-3">
        Stories for {client.name}
      </h2>
      <div className="border border-slate-900 rounded-lg overflow-hidden">
        <table className="min-w-full text-[10px]">
          <thead className="bg-slate-900 text-slate-400 uppercase">
            <tr>
              <th className="px-3 py-1.5 text-left">Ref</th>
              <th className="px-3 py-1.5 text-left">Title</th>
              <th className="px-3 py-1.5 text-left">Status</th>
              <th className="px-3 py-1.5 text-left">Type</th>
              <th className="px-3 py-1.5 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {clientStories.map((story) => (
              <tr
                key={story.id}
                className="border-t border-slate-900 hover:bg-slate-900/60"
              >
                <td className="px-3 py-1.5 font-mono">
                  <Link
                    href={`/stories/${story.id}`}
                    className="text-sky-400 hover:underline"
                  >
                    {story.reference}
                  </Link>
                </td>
                <td className="px-3 py-1.5">{story.title}</td>
                <td className="px-3 py-1.5">{story.status}</td>
                <td className="px-3 py-1.5 text-slate-400">
                  {story.type}
                </td>
                <td className="px-3 py-1.5 text-slate-400">
                  {story.updatedAt}
                </td>
              </tr>
            ))}
            {clientStories.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-3 text-center text-slate-500"
                >
                  No stories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
