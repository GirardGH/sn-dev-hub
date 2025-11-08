import Link from "next/link";
import {
  getClientById,
  getStoriesByClient,
  getLatestDevsByClient,
} from "@/lib/mockData";

type Props = {
  params: { clientId: string };
};

export default function ClientOverviewPage({ params }: Props) {
  const client = getClientById(params.clientId);
  if (!client) return null;

  const clientStories = getStoriesByClient(client.id);
  const latestDevs = getLatestDevsByClient(client.id, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Backlog / Stories */}
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-slate-100">
            Backlog / Stories
          </h2>
          <Link
            href={`/clients/${client.id}/stories`}
            className="text-[9px] text-sky-400 hover:underline"
          >
            View all stories
          </Link>
        </div>
        <div className="border border-slate-900 rounded-lg overflow-hidden">
          <table className="min-w-full text-[10px]">
            <thead className="bg-slate-900 text-slate-400 uppercase">
              <tr>
                <th className="px-3 py-1.5 text-left">Ref</th>
                <th className="px-3 py-1.5 text-left">Title</th>
                <th className="px-3 py-1.5 text-left">Status</th>
                <th className="px-3 py-1.5 text-left">Type</th>
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
                </tr>
              ))}
              {clientStories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-3 text-center text-slate-500"
                  >
                    No stories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Latest developments */}
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-slate-100">
            Latest developments
          </h2>
          <Link
            href={`/clients/${client.id}/developments`}
            className="text-[9px] text-sky-400 hover:underline"
          >
            View all developments
          </Link>
        </div>
        <div className="border border-slate-900 rounded-lg overflow-hidden">
          <table className="min-w-full text-[10px]">
            <thead className="bg-slate-900 text-slate-400 uppercase">
              <tr>
                <th className="px-3 py-1.5 text-left">Type</th>
                <th className="px-3 py-1.5 text-left">Name</th>
                <th className="px-3 py-1.5 text-left">Table</th>
                <th className="px-3 py-1.5 text-left">Updated</th>
              </tr>
            </thead>
            <tbody>
              {latestDevs.map((dev) => (
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
                  <td className="px-3 py-1.5 text-slate-400">
                    {dev.updatedAt}
                  </td>
                </tr>
              ))}
              {latestDevs.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-3 text-center text-slate-500"
                  >
                    No developments yet.
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
