"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clients } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/ThemeProvider";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className="
        w-64 h-screen
        flex flex-col
        bg-[#032d42]/95 text-slate-100 border-r border-[#e2e5e7]
        dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800
        overflow-hidden sticky
      "
    >
      {/* Zone 1 : Logo + toggle */}
      <div className="px-4 py-6 flex items-center justify-between shrink-0">
        <div className="text-xs font-semibold tracking-[.25em] uppercase text-slate-100 dark:text-slate-500">
          SN DEV HUB
        </div>
        <ThemeToggle />
      </div>

      {/* Zone 2 : workspace nav */}
      <div className="px-4 mb-4 shrink-0">
        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
          Workspace
        </div>
        <NavItem href="/clients" label="Clients"   active={
    pathname === "/clients" || pathname === "/clients/"
  } />
        <NavItem href="/stories" label="All Stories" active={isActive("/stories")} />
        <NavItem href="/developments" label="All Developments" active={isActive("/developments")} />
      </div>

      {/* Zone 3 : clients scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-thin">
        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
          Clients
        </div>
        <div className="text-xs text-slate-100 mb-2">+ Create new client (soon)</div>
        <div className="flex flex-col gap-1">
          {clients.map((c) => (
            <NavItem
              key={c.id}
              href={`/clients/${c.id}/stories`}
              label={c.name}
              active={isActive(`/clients/${c.id}`)}
              small
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  href,
  label,
  active,
  small,
}: {
  href: string;
  label: string;
  active: boolean;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        `
        block rounded-md px-3 py-2 transition-colors
        ${small ? "text-sm" : "text-[15px]"}
      `,
        active
          ? `
          bg-sky-500/10 text-sky-50 border border-green-200/40
          dark:bg-sky-500/15 dark:text-sky-400
        `
          : `
          text-[#b9dbe4] hover:bg-[#032d42] hover:text-sky-50 hover:underline
          dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-300
        `
      )}
    >
      {label}
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        inline-flex items-center justify-center
        w-8 h-8 rounded-md
        bg-[#e2e5e7] text-slate-800
        hover:bg-slate-300
        dark:bg-slate-800 dark:text-slate-200
        dark:hover:bg-slate-700
        transition-colors
      "
    >
      {isDark ? (
        <span className="text-sm">☀️</span>
      ) : (
        <span className="text-sm">🌙</span>
      )}
    </button>
  );
}
