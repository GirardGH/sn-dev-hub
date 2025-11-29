// components/sidebar/Sidebar.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";

export default async function Sidebar() {
  const supabase = supabaseServer();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name")
    .order("name");

  return (
    <aside
      className="
        w-64 h-screen flex flex-col
        bg-[#032d42]/95 text-slate-100 border-r border-[#e2e5e7]
        dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800
        overflow-hidden sticky top-0
      "
    >
      {/* Logo + Theme */}
      <div className="px-4 py-6 flex items-center justify-between shrink-0">
        <div className="text-xs font-semibold tracking-[.25em] uppercase text-slate-100 dark:text-slate-500">
          SN DEV HUB
        </div>
        <ThemeToggle />
      </div>

      {/* Workspace */}
      <div className="px-4 mb-4 shrink-0">
        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
          Workspace
        </div>

        <NavItem href="/clients" label="Clients" />
        <NavItem href="/stories" label="All Stories" />
        <NavItem href="/developments" label="All Developments" />
      </div>

      {/* Clients list */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-thin">
        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
          Clients
        </div>

        <Link
          href="/clients/new"
          className="text-xs text-slate-300 hover:text-sky-300 hover:underline mb-3 block"
        >
          + Create new client
        </Link>

        <div className="flex flex-col gap-1">
          {(clients ?? []).map((c) => (
            <NavItem
              key={c.id}
              href={`/clients/${c.id}/stories`}
              label={c.name}
              small
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
