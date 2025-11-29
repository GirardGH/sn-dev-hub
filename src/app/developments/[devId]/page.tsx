import { notFound } from "next/navigation";
import Link from "next/link";
import { developments, getClientById, getStoryById } from "@/lib/mockData";

type Props = {
  params: { devId: string };
};

export default function DevelopmentDetailPage({ params }: Props) {
  const dev = developments.find((d) => d.id === params.devId);
  if (!dev) return notFound();

  const client = getClientById(dev.clientId);
  const story = dev.storyId ? getStoryById(dev.storyId) : undefined;

  return (
    <div className="p-6 space-y-5">
      {/* Breadcrumb */}
      <div className="text-[9px] text-slate-500 flex gap-1">
        {client && (
          <>
            <Link
              href={`/clients/${client.id}/stories`}
              className="hover:text-sky-400"
            >
              {client.name}
            </Link>
            <span>/</span>
          </>
        )}
        {story && (
          <>
            <Link
              href={`/stories/${story.id}`}
              className="hover:text-sky-400"
            >
              {story.reference}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-400">Development</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
            {dev.type}
          </div>
          <h1 className="text-lg font-semibold text-slate-100">
            {dev.name}
          </h1>
          <div className="mt-1 text-[10px] text-slate-400 flex gap-3 flex-wrap">
            {client && <span>Client: {client.name}</span>}
            {story && (
              <span>
                Story: {story.reference} — {story.title}
              </span>
            )}
            <span>Table: {dev.table}</span>
            <span>Author: {dev.author}</span>
            <span>Updated: {dev.updatedAt}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          {story && (
            <Link
              href={`/stories/${story.id}`}
              className="px-3 py-1.5 rounded-md border border-slate-700 text-[9px] hover:border-sky-500 hover:text-sky-400"
            >
              ← Back to story
            </Link>
          )}
          {client && (
            <Link
              href={`/clients/${client.id}/stories`}
              className="px-3 py-1.5 rounded-md border border-slate-700 text-[9px] hover:border-sky-500 hover:text-sky-400"
            >
              ← Back to client
            </Link>
          )}
        </div>
      </div>

      {/* Placeholder details */}
      <div className="border border-slate-900 rounded-lg p-4 text-[10px] text-slate-300">
        <p>Here you&apos;ll later store:</p>
        <ul className="list-disc ml-4 mt-1 space-y-1">
          <li>Script body</li>
          <li>Execution timing</li>
          <li>Scope, linked table</li>
          <li>XML / update set reference</li>
          <li>Comments / notes</li>
        </ul>
      </div>
    </div>
  );
}
