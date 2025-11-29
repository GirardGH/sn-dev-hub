"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ClientForm({ userId }: { userId: string }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("clients").insert({
      user_id: userId,
      name,
      description,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setError("Unable to create client.");
      return;
    }

    router.push("/clients");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 border border-slate-800 p-6 rounded-lg dark:bg-slate-950"
    >
      {/* CLIENT NAME */}
      <div className="relative group">
        <label className="text-[11px] absolute -top-2 left-2 px-1 rounded bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400">
          Client Name
        </label>

        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full px-3 py-3 rounded-lg
            dark:bg-slate-900 dark:text-slate-200 text-[12px]
            border border-slate-700 
            focus:outline-none focus:ring-2 focus:ring-sky-600
          "
        />
      </div>

      {/* DESCRIPTION */}
      <div className="relative group">
        <label className="text-[11px] absolute -top-2 left-2 px-1 rounded bg-[#032d42] dark:bg-slate-900 text-slate-50 dark:text-slate-400">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full px-3 py-3 rounded-lg
            dark:bg-slate-900 dark:text-slate-200 text-[12px]
            border border-slate-700 
            focus:outline-none focus:ring-2 focus:ring-sky-600
            h-[120px]
          "
        />
      </div>

      {/* ERROR */}
      {error && <div className="text-sm text-red-400">{error}</div>}

      {/* ACTION BUTTONS */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/clients")}
          className="px-4 py-2 rounded-md text-[12px] border border-slate-700 hover:bg-slate-800/40"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="px-4 py-2 rounded-md bg-sky-600 text-[12px] text-white hover:bg-sky-500 disabled:opacity-40"
        >
          {loading ? "Saving..." : "Create Client"}
        </button>
      </div>
    </form>
  );
}
