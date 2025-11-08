import Link from "next/link";
import { developments, clients, stories } from "@/lib/mockData";

export default function AllDevelopmentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">All Developments</h1>
      <div className="border border-slate-900 rounded-lg overflow-hidden">
        <table className="min-w-full text-[10px]">
          <thead className="bg-slate-900 text-slate-400 uppercase">
            <tr>
              <th className="px-3 py-1.5 text-left">Client</th>
              <th className="px-3 py-1.5 text-left">Story</th>
              <th className="px-3 py-1.5 text-left">Type</th>
              <th className="px-3 py-1.5 text-left">Name</th>
              <th className="px-3 py-1.5 text-left">Table</th>
              <th className="px-3 py-1.5 text-left">Author</th>
              <th className="px-3 py-1.5 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {developments.map((dev) => {
              const client = clients.find((c) => c.id === dev.clientId);
              const story = dev.storyId
                ? stories.find((s) => s.id === dev.storyId)
                : undefined;
              return (
                <tr
                  key={dev.id}
                  className="border-t border-slate-900 hover:bg-slate-900/60"
                >
                  <td className="px-3 py-1.5 text-slate-300">
                    {client?.name ?? "—"}
                  </td>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
