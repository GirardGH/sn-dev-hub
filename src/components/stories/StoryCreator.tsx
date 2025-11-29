"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StoryCreator({ clients }: { clients: any[] }) {
  const router = useRouter();

  const [form, setForm] = useState({
    client_id: "",
    reference: "",
    title: "",
    type: "Request",
    description: "",
    comments: "",
  });

  function update(v: Partial<typeof form>) {
    setForm({ ...form, ...v });
  }

  async function createStory() {
    if (!form.client_id || !form.reference || !form.title) {
      alert("Client, Reference and Title are required.");
      return;
    }

    const res = await fetch("/api/stories/create", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const json = await res.json();

    if (json.error) {
      alert("Error: " + json.error);
      return;
    }

    router.push(`/stories/${json.id}`);
  }

  return (
    <div className="max-w-3xl space-y-8">

      <h1 className="text-lg font-semibold dark:text-slate-100">
        Create a New Story
      </h1>

      {/* CLIENT */}
      <Field label="Client *">
        <select
          value={form.client_id}
          onChange={(e) => update({ client_id: e.target.value })}
          className="input"
        >
          <option value="">— Choose a client —</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>

      {/* REFERENCE */}
      <Field label="Reference *">
        <input
          value={form.reference}
          onChange={(e) => update({ reference: e.target.value })}
          className="input"
          placeholder="SCRIT001234"
        />
      </Field>

      {/* TITLE */}
      <Field label="Title *">
        <input
          value={form.title}
          onChange={(e) => update({ title: e.target.value })}
          className="input"
        />
      </Field>

      {/* TYPE */}
      <Field label="Type">
        <select
          value={form.type}
          onChange={(e) => update({ type: e.target.value })}
          className="input"
        >
          <option>Request</option>
          <option>Incident</option>
          <option>Feature</option>
          <option>Optimization</option>
        </select>
      </Field>

      {/* DESCRIPTION */}
      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => update({ description: e.target.value })}
          className="input h-32"
        />
      </Field>

      {/* COMMENTS */}
      <Field label="Comments">
        <textarea
          value={form.comments}
          onChange={(e) => update({ comments: e.target.value })}
          className="input h-24"
        />
      </Field>

      {/* SUBMIT */}
      <button
        onClick={createStory}
        className="
          px-4 py-2 rounded-md text-sm 
          bg-sky-600 text-white 
          hover:bg-sky-700
        "
      >
        Create Story
      </button>
    </div>
  );
}

// ---------------- FIELD UI ----------------
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <label className="text-[11px] absolute -top-2 left-2 px-1 rounded bg-[#032d42] text-slate-50 dark:bg-slate-900 dark:text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}
