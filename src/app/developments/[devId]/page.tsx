import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";

type Props = {
  params: { devId: string };
};

export default async function DevelopmentDetailPage({ params }: Props) {
  const supabase = supabaseServer();

  // Fetch development
  const { data: dev, error } = await supabase
    .from("developments")
    .select(
      `
      *,
      stories (
        id,
        reference,
        title,
        client_id
      ),
      stories!inner (
        clients (
          id,
          name
        )
      )
    `
    )
    .eq("id", params.devId)
    .single();

  if (!dev || error) return notFound();

  const story = dev.stories;
  const client = dev.stories?.clients;

  return (
    <div className="p-6 space-y-6">
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

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
            {dev.type}
          </div>

          <h1 className="text-lg font-semibold dark:text-slate-100">
            {dev.name}
          </h1>

          <div className="mt-1 text-[10px] text-slate-400 flex gap-3 flex-wrap">
            {client && <span>Client: {client.name}</span>}
            {story && (
              <span>
                Story: {story.reference} — {story.title}
              </span>
            )}
            {dev.table_name && <span>Table: {dev.table_name}</span>}
            {dev.execution && <span>Execution: {dev.execution}</span>}
            <span>Created: {new Date(dev.created_at).toLocaleString()}</span>
            <span>Updated: {new Date(dev.updated_at).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
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

      {/* FORM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4 text-[11px]">
          <Field label="Type">{dev.type}</Field>
          <Field label="Name">{dev.name}</Field>
          <Field label="Table Name">{dev.table_name}</Field>
          <Field label="Version">{dev.version}</Field>
          <Field label="Scope">{dev.scope}</Field>
          <Field label="Fields impacted">{dev.fields_impacted}</Field>
          <Field label="Condition">{dev.condition}</Field>
          <Field label="Execution">{dev.execution}</Field>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4 text-[11px]">
          <Field label="Description">{dev.description}</Field>
          <Field label="Comment">{dev.comment}</Field>

          <Field label="Script">
            <pre className="p-3 rounded bg-slate-900 text-[10px] overflow-auto max-h-[300px]">
              {dev.script}
            </pre>
          </Field>

          {/* Attachments */}
          <Field label="Attachment XML">
            {dev.attachment_xml_url?.length ? (
              <ul className="list-disc ml-4">
                {dev.attachment_xml_url.map((item: any, idx: number) => (
                  <li key={idx}>
                    <a
                      href={item.url}
                      className="text-sky-400 hover:underline"
                      target="_blank"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-slate-500">No XML attached</span>
            )}
          </Field>

          <Field label="Media attachments">
            {dev.attachment_media_url?.length ? (
              <div className="flex gap-2 flex-wrap">
                {dev.attachment_media_url.map((file: any, idx: number) => (
                  <img
                    key={idx}
                    src={file.url}
                    alt={file.name}
                    className="h-20 rounded border border-slate-800"
                  />
                ))}
              </div>
            ) : (
              <span className="text-slate-500">No media files</span>
            )}
          </Field>
        </div>
      </div>
    </div>
  );
}

// Small reusable component
function Field({ label, children }: any) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-slate-400 text-[10px] uppercase tracking-wide">
        {label}
      </div>
      <div className="p-2 rounded border border-slate-800 bg-slate-900 text-slate-100 min-h-[32px]">
        {children || <span className="text-slate-600">—</span>}
      </div>
    </div>
  );
}
