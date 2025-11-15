"use client";

import { useState } from "react";
import Link from "next/link";

import {
  getStoryById,
  getClientById,
  getDevsByStory,
  stories as allStories,
} from "@/lib/mockData";

import ListLayout from "@/components/layout/ListLayout";
import RelatedTabs from "@/components/RelatedTabs";

// --- Small UI component for floating label fields --- //
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <label
        className="
        text-[11px] absolute -top-2 left-2 
        px-1 rounded dark:bg-slate-950 bg-[#032d42] 
        dark:text-slate-400 text-slate-50 group-focus-within:text-sky-400
      "
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function StoryDetailPage({
  params,
}: {
  params: { storyId: string };
}) {
  const story = getStoryById(params.storyId);
  if (!story) return <div>Story not found</div>;

  const client = getClientById(story.clientId);
  const devs = getDevsByStory(story.id);
  const [filterOpen, setFilterOpen] = useState(false);

    // CHILD STORIES FIX
  const childStories = allStories.filter((s) => s.parentStoryId === story.id);

  const MAX_ROWS = 8;
  const [page, setPage] = useState(1);

  const start = (page - 1) * MAX_ROWS;
  const end = start + MAX_ROWS;

  const paginatedDevs = devs.slice(start, end);
  const totalPages = Math.ceil(devs.length / MAX_ROWS);

  function nextPage() {
    if (page < totalPages) setPage(page + 1);
  }
  function prevPage() {
    if (page > 1) setPage(page - 1);
  }

  return (
    <div className="h-full flex flex-col dark:bg-slate-950">
      {/* ----------------------- TOP HEADER STICKY ----------------------- */}
      <div
        className="
        sticky top-0 z-30 px-8 py-4 
        dark:bg-slate-950/90 backdrop-blur 
        border-b border-slate-800 
        flex items-center justify-between
      "
      >
        <div>
          <div className="flex items-center gap-2 text-[10px] dark:text-slate-400">
            <Link
              href={`/clients/${client?.id}/stories`}
              className="hover:text-sky-400"
            >
              {client?.name}
            </Link>
            <span>/ Story</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <span className="font-semibold text-sky-400 text-sm">
              {story.reference}
            </span>
            <span className="text-lg font-semibold dark:text-slate-200">
              {story.title}
            </span>
          </div>
        </div>
      </div>

      {/* ----------------------- MAIN CONTENT SCROLL ----------------------- */}
      <div className="h-screen px-8 py-6 pb-24 space-y-10 overflow-auto scrollbar-thin">
        {/* ----------------------- STORY FORM ----------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT COLUMN -------------------------------------- */}
          <div className="space-y-6">
            {/* Client (locked) */}
            <Field label="Client">
              <input
                disabled
                value={client?.name ?? ""}
                className="
                  w-full px-3 py-3 rounded-lg
                  dark:bg-slate-900 dark:text-slate-300 text-[12px]
                  border border-slate-700 
                  focus:outline-none focus:ring-2 focus:ring-sky-600
                "
              />
            </Field>

            {/* Reference Link */}
            <Field label="Reference Link">
              <input
                defaultValue={story.referenceLink}
                className="
                  w-full px-3 py-3 rounded-lg
                  dark:bg-slate-900 dark:text-slate-200 text-[12px]
                  border border-slate-700 
                  focus:outline-none focus:ring-2 focus:ring-sky-600
                "
              />
            </Field>

            {/* Description */}
            <Field label="Description">
              <textarea
                defaultValue={story.description}
                className="
                  w-full px-3 py-3 rounded-lg
                  dark:bg-slate-900 dark:text-slate-200 text-[12px] 
                  h-[150px]
                  border border-slate-700 
                  focus:outline-none focus:ring-2 focus:ring-sky-600
                "
              />
            </Field>
          </div>

          {/* RIGHT COLUMN -------------------------------------- */}
          <div className="space-y-6">
            {/* Ticket Type */}
            <Field label="Ticket Type">
              <select
                defaultValue={story.type}
                className="
                  w-full px-3 py-3 rounded-lg
                  dark:bg-slate-900 dark:text-slate-200 text-[12px]
                  border border-slate-700 
                  focus:outline-none focus:ring-2 focus:ring-sky-600
                "
              >
                <option>Request</option>
                <option>Incident</option>
                <option>Optimization</option>
                <option>Feature</option>
              </select>
            </Field>

            {/* Parent Story */}
            <Field label="Parent Story">
              <select
                defaultValue={story.parentStoryId ?? ""}
                className="
                  w-full px-3 py-3 rounded-lg
                  dark:bg-slate-900 dark:text-slate-200 text-[12px]
                  border border-slate-700 
                  focus:outline-none focus:ring-2 focus:ring-sky-600
                "
              >
                <option value="">None</option>
                {allStories
                  .filter((s) => s.id !== story.id)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.reference} — {s.title}
                    </option>
                  ))}
              </select>
            </Field>

            {/* Comments */}
            <Field label="Comments">
              <textarea
                defaultValue={story.comments}
                className="
                  w-full px-3 py-3 rounded-lg
                  dark:bg-slate-900 dark:text-slate-200 text-[12px]
                  h-[150px]
                  border border-slate-700 
                  focus:outline-none focus:ring-2 focus:ring-sky-600
                "
              />
            </Field>
          </div>
        </div>

        {/* ----------------------- LINKED DEVELOPMENTS ----------------------- */}
        <div className="">
          {/* Sticky header for linked devs */}
          <RelatedTabs
  tabs={[
    {
      id: "devs",
      label: "Linked Developments",
      content: (
          <ListLayout
            title={`Linked Developments`}
            newLink="develoments/new"
          >
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
                {paginatedDevs.map((dev) => {
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
            <div className="flex items-center justify-end gap-4 py-2 px-3 text-[11px] dark:text-slate-300">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="px-2 py-1 rounded disabled:opacity-30 hover:bg-slate-800/40"
              >
                ◄
              </button>

              <span className="text-slate-500">
                Page {page} / {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={page === totalPages}
                className="px-2 py-1 rounded disabled:opacity-30 hover:bg-slate-800/40"
              >
                ►
              </button>
            </div>
          </ListLayout>
               )
    },
        {
      id: "children",
      label: "Child Stories",
      content: (
    <ListLayout title={`Stories for ${client.name}`} newLink="stories/new" >
      <table className="min-w-full text-[11px] border-collapse table-fixed">
        <thead className="bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400 uppercase sticky top-0 z-10">
          <tr className="border-t border-slate-200 dark:border-slate-800 dark:hover:bg-slate-900/40 transition-colors">
              <th className="px-3 py-1.5 text-left">Reference</th>
              <th className="px-3 py-1.5 text-left">Short description</th>
              <th className="px-3 py-1.5 text-left">Ticket Type</th>
              <th className="px-3 py-1.5 text-left">Parent Story</th>
              <th className="px-3 py-1.5 text-left">Comments</th>
              <th className="px-3 py-1.5 text-left">Created</th>
              <th className="px-3 py-1.5 text-left">Updated</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-400/10">
            {childStories.map((story) => (
              <tr
                key={story.id}
                className="border-t dark:border-slate-800 dark:hover:bg-slate-800/60 transition-colors"
              >
                <td className="px-3 py-1.5">
                  <Link
                    href={`/stories/${story.id}`}
                    className="text-sky-400 hover:underline"
                  >
                    {story.reference}
                  </Link>
                </td>
                <td className="px-3 py-1.5">{story.shortDescription}</td>
                <td className="px-3 py-1.5">{story.ticketType}</td>
                <td className="px-3 py-1.5">{story.parentStory}</td>
                <td className="px-3 py-1.5">{story.comments}</td>
                <td className="px-3 py-1.5 dark:text-slate-400">
                  {story.created}
                </td>
                                <td className="px-3 py-1.5 dark:text-slate-400">
                  {story.updatedAt}
                </td>
              </tr>
            ))}
            {childStories.length === 0 && (
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
      )
    }
  ]}
/>
        </div>
      </div>
    </div>
  );
}
