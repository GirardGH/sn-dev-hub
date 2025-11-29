"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ReferenceStoryInput({
  value,
  onChange,
  clientId,
}: {
  value?: string | null;
  onChange: (v: string | null) => void;
  clientId: string;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedLabel, setSelectedLabel] = useState("");

  // Load selected story label when opening form
  useEffect(() => {
    if (!value) return;
    supabase
      .from("stories")
      .select("id, reference, title")
      .eq("id", value)
      .then((res) => {
        const s = res.data?.[0];
        if (s) setSelectedLabel(`${s.reference} — ${s.title}`);
      });
  }, [value]);

  const search = async (text: string) => {
    setQuery(text);

    if (text.length < 1) {
      setResults([]);
      return;
    }

    const { data } = await supabase
      .from("stories")
      .select("id, reference, title")
      .ilike("reference", `%${text}%`)
      .eq("client_id", clientId)
      .limit(10);

    setResults(data || []);
  };

  const selectStory = (story: any) => {
    onChange(story.id);
    setSelectedLabel(`${story.reference} — ${story.title}`);
    setResults([]);
    setQuery("");
  };

  return (
    <div className="relative w-full">
      {/* Input visible */}
      <input
        className="input"
        placeholder="Search a story…"
        value={query || selectedLabel}
        onChange={(e) => search(e.target.value)}
        onFocus={() => {
          if (selectedLabel) setQuery(""); // affiche champs vide pour search
        }}
      />

      {/* Dropdown */}
      {results.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-slate-900 border border-slate-700 rounded shadow-lg max-h-60 overflow-auto text-[11px]">
          {results.map((story) => (
            <div
              key={story.id}
              className="px-3 py-2 hover:bg-slate-800 cursor-pointer"
              onClick={() => selectStory(story)}
            >
              <div className="text-sky-400">{story.reference}</div>
              <div className="text-slate-400 text-[10px] truncate">
                {story.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
