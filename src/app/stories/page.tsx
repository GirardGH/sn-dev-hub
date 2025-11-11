"use client"

import Link from "next/link";
import { useState } from "react";
import { stories, clients } from "@/lib/mockData";
import ListLayout from "@/components/layout/ListLayout";


export default function AllStoriesPage() {
 const [filterOpen, setFilterOpen] = useState(false);

  return (
  // <div className="h-full flex flex-col">
  //   <div className="sticky top-0 z-20 px-8 py-3 dark:bg-[#0b0d16] border-b border-slate-800 flex items-center justify-between">
  //     <div className="flex items-center gap-4">
  //   <h2 className="text-sm font-semibold dark:text-slate-200">All Stories</h2>
  //   <FilterButton onClick={() => setFilterOpen(!filterOpen)} active={filterOpen} />
  //  </div>
  //   <NewButton href="stories/new" />
  // </div>

<ListLayout title="All Stories" newLink="/stories/new">
  
{/* Conteneur avec hauteur fixe et scroll seulement sur tbody */}
      <table className="min-w-full text-[11px] border-collapse table-fixed">
        <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400 uppercase sticky top-0 z-10">
          <tr className="border-t border-slate-200 dark:border-slate-800 dark:hover:bg-slate-900/40 transition-colors">
              <th className="px-3 py-1.5 text-left">Client</th>
              <th className="px-3 py-1.5 text-left">Ref</th>
              <th className="px-3 py-1.5 text-left">Title</th>
              <th className="px-3 py-1.5 text-left">Status</th>
              <th className="px-3 py-1.5 text-left">Type</th>
              <th className="px-3 py-1.5 text-left">Updated</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-400/10">
            {stories.map((story) => {
              const client = clients.find((c) => c.id === story.clientId);
              return (
                <tr
                  key={story.id}
                  className="border-t dark:border-slate-800 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <td className="px-3 py-1.5 text-slate-900 dark:text-slate-300">
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
                  <td className="px-3 py-1.5 text-slate-900 dark:text-slate-300">
                    {story.type}
                  </td>
                  <td className="px-3 py-1.5 text-slate-900 dark:text-slate-300">
                    {story.updatedAt}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

</ListLayout>
  );
}
