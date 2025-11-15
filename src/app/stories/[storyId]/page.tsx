"use client";

import { useState } from "react";
import Link from "next/link";

import {
  getStoryById,
  getClientById,
  getDevsByStory,
  stories as allStories
} from "@/lib/mockData";

import ListLayout from "@/components/layout/ListLayout";

// --- Small UI component for floating label fields --- //
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <label className="
        text-[11px] absolute -top-2 left-2 
        px-1 rounded dark:bg-slate-950 bg-[#032d42] 
        dark:text-slate-400 text-slate-50 group-focus-within:text-sky-400
      ">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function StoryDetailPage({ params }: { params: { storyId: string } }) {
  const story = getStoryById(params.storyId);
  if (!story) return <div>Story not found</div>;

  const client = getClientById(story.clientId);
  const devs = getDevsByStory(story.id);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="h-full flex flex-col dark:bg-slate-950">

      {/* ----------------------- TOP HEADER STICKY ----------------------- */}
      <div className="
        sticky top-0 z-30 px-8 py-4 
        dark:bg-slate-950/90 backdrop-blur 
        border-b border-slate-800 
        flex items-center justify-between
      ">
        <div>
          <div className="flex items-center gap-2 text-[10px] dark:text-slate-400">
            <Link href={`/clients/${client?.id}/stories`} className="hover:text-sky-400">
              {client?.name}
            </Link>
            <span>/ Story</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <span className="font-semibold text-sky-400 text-sm">
              {story.reference}
            </span>
            <span className="text-lg font-semibold dark:text-slate-200">{story.title}</span>
          </div>
        </div>
      </div>

      {/* ----------------------- MAIN CONTENT SCROLL ----------------------- */}
      <div className="h-screen overflow-auto px-8 py-6 pb-24 space-y-1 scrollbar-thin">

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
        <div className="space-y-4">

          {/* Sticky header for linked devs */}
<ListLayout title={`Developments for ${client.name}`} newLink="develoments/new" >
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
            </div>
          </div>

        </div>

  );
}
