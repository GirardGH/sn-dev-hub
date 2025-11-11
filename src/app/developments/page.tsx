"use client"
import { useState } from "react";
import Link from "next/link";
import { developments, clients, stories } from "@/lib/mockData";
import ListLayout from "@/components/layout/ListLayout";

export default function AllDevelopmentsPage() {
  return (
<ListLayout title="All Developments" newLink="developments/new">
      <table className="min-w-full text-[11px] border-collapse table-fixed">
        <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400 uppercase sticky top-0 z-10">
          <tr className="border-t border-slate-200 dark:border-slate-800 hover:bg-cyan-800/20 dark:hover:bg-slate-900/40 transition-colors">
              <th className="px-3 py-1.5 text-left">Client</th>
              <th className="px-3 py-1.5 text-left">Story</th>
              <th className="px-3 py-1.5 text-left">Type</th>
              <th className="px-3 py-1.5 text-left">Name</th>
              <th className="px-3 py-1.5 text-left">Table</th>
              <th className="px-3 py-1.5 text-left">Author</th>
              <th className="px-3 py-1.5 text-left">Updated</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-400/10">
            {developments.map((dev) => {
              const client = clients.find((c) => c.id === dev.clientId);
              const story = dev.storyId
                ? stories.find((s) => s.id === dev.storyId)
                : undefined;
              return (
                <tr
                  key={dev.id}
                  className="border-t dark:border-slate-800 hover:bg-cyan-800/20 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <td className="px-3 py-1.5 text-slate-900 dark:text-slate-300">
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
                  <td className="px-3 py-1.5 font-mono text-slate-900 dark:text-slate-300">
                    {dev.table}
                  </td>
                  <td className="px-3 py-1.5 text-slate-900 dark:text-slate-300">
                    {dev.author}
                  </td>
                  <td className="px-3 py-1.5 text-slate-900 dark:text-slate-300">
                    {dev.updatedAt}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
</ListLayout>
  );
}
