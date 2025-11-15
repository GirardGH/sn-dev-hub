"use client";
import { useState } from "react";
import Link from "next/link";
import {
  getClientById,
  getDevsByClient,
  stories as allStories,
} from "@/lib/mockData";
import ListLayout from "@/components/layout/ListLayout";

type Props = {
  params: { clientId: string };
};

export default function ClientDevelopmentsPage({ params }: Props) {
  const client = getClientById(params.clientId);
  if (!client) return null;

  const devs = getDevsByClient(client.id);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
<ListLayout title={`Developments for ${client.name}`} newLink="develoments/new">
      <table className="min-w-full text-[11px] border-collapse table-fixed">
        <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400 uppercase sticky top-0 z-10">
          <tr className="border-t border-slate-200 dark:border-slate-800 dark:hover:bg-slate-900/40 transition-colors">
            <th className="px-3 py-2 text-left w-[120px]">Story</th>
            <th className="px-3 py-2 text-left w-[120px]">Type</th>
            <th className="px-3 py-2 text-left w-[220px]">Name</th>
            <th className="px-3 py-2 text-left w-[180px]">Table</th>
            <th className="px-3 py-2 text-left w-[140px]">Author</th>
            <th className="px-3 py-2 text-left w-[120px]">Updated</th>
          </tr>
        </thead>

        <tbody className="[&>tr:nth-child(even)]:bg-slate-400/10">
          {devs.map((dev) => {
            const story = dev.storyId
              ? allStories.find((s) => s.id === dev.storyId)
              : undefined;
            return (
              <tr
                key={dev.id}
                className="border-t dark:border-slate-800 dark:hover:bg-slate-800/60 transition-colors"
              >
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
                <td className="px-3 py-2 truncate">{dev.type}</td>
                <td className="px-3 py-2 truncate">
                  <Link
                    href={`/developments/${dev.id}`}
                    className="text-sky-400 hover:underline"
                  >
                    {dev.name}
                  </Link>
                </td>
                <td className="px-3 py-2 dark:text-slate-400 truncate">
                  {dev.table}
                </td>
                <td className="px-3 py-2 dark:text-slate-300 truncate">
                  {dev.author}
                </td>
                <td className="px-3 py-2 dark:text-slate-400 truncate">
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
</ListLayout>

  );
}
