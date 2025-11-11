"use client";
import { useState } from "react";
import Link from "next/link";
import { getClientById, getStoriesByClient } from "@/lib/mockData";
import ListLayout from "@/components/layout/ListLayout";

type Props = {
  params: { clientId: string };
};

export default function ClientStoriesPage({ params }: Props) {
  const client = getClientById(params.clientId);
  if (!client) return null;

  const clientStories = getStoriesByClient(client.id);

  return (
    <ListLayout title={`Stories for ${client.name}`} newLink="stories/new" >
      <table className="min-w-full text-[11px] border-collapse table-fixed">
        <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400 uppercase sticky top-0 z-10">
          <tr className="border-t border-slate-200 dark:border-slate-800 dark:hover:bg-slate-900/40 transition-colors">
              <th className="px-3 py-1.5 text-left">Ref</th>
              <th className="px-3 py-1.5 text-left">Title</th>
              <th className="px-3 py-1.5 text-left">Status</th>
              <th className="px-3 py-1.5 text-left">Type</th>
              <th className="px-3 py-1.5 text-left">Updated</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-400/10">
            {clientStories.map((story) => (
              <tr
                key={story.id}
                className="border-t dark:border-slate-800 dark:hover:bg-slate-800/60 transition-colors"
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
</ListLayout>
  );
}
