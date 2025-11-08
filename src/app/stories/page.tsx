import Link from "next/link";
import { stories, clients } from "@/lib/mockData";

export default function AllStoriesPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">All Stories</h1>
      <div className="border border-slate-900 rounded-lg overflow-hidden">
        <table className="min-w-full text-[10px]">
          <thead className="bg-slate-900 text-slate-400 uppercase">
            <tr>
              <th className="px-3 py-1.5 text-left">Client</th>
              <th className="px-3 py-1.5 text-left">Ref</th>
              <th className="px-3 py-1.5 text-left">Title</th>
              <th className="px-3 py-1.5 text-left">Status</th>
              <th className="px-3 py-1.5 text-left">Type</th>
              <th className="px-3 py-1.5 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => {
              const client = clients.find((c) => c.id === story.clientId);
              return (
                <tr
                  key={story.id}
                  className="border-t border-slate-900 hover:bg-slate-900/60"
                >
                  <td className="px-3 py-1.5 text-slate-300">
                    {client?.name ?? "—"}
                  </td>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
