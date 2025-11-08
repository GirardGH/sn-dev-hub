import {
  getClientById,
  getDevsByClient,
  stories as allStories,
} from "@/lib/mockData";
import Link from "next/link";

type Props = {
  params: { clientId: string };
};

export default function ClientDevelopmentsPage({ params }: Props) {
  const client = getClientById(params.clientId);
  if (!client) return null;

  const devs = getDevsByClient(client.id);

  return (
    <div className="p-6">
      <h2 className="text-sm font-semibold mb-3">
        Developments for {client.name}
      </h2>
      <div className="border border-slate-900 rounded-lg overflow-hidden">
        <table className="min-w-full text-[10px]">
          <thead className="bg-slate-900 text-slate-400 uppercase">
            <tr>
              <th className="px-3 py-1.5 text-left">Story</th>
              <th className="px-3 py-1.5 text-left">Type</th>
              <th className="px-3 py-1.5 text-left">Name</th>
              <th className="px-3 py-1.5 text-left">Table</th>
              <th className="px-3 py-1.5 text-left">Author</th>
              <th className="px-3 py-1.5 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {devs.map((dev) => {
              const story = dev.storyId
                ? allStories.find((s) => s.id === dev.storyId)
                : undefined;
              return (
                <tr
                  key={dev.id}
                  className="border-t border-slate-900 hover:bg-slate-900/60"
                >
                  <td className="px-3 py-1.5">
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
            {devs.length === 0 && (
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
      </div>
    </div>
  );
}
