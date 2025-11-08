"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clients } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="h-screen w-64 border-r border-slate-900 bg-slate-950 text-slate-100 flex flex-col">
      <div className="px-4 py-4 border-b border-slate-900">
        <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
          SN DEV HUB
        </div>
        <div className="font-semibold text-slate-50 text-sm">Workspace</div>
      </div>

      <nav className="px-2 py-3 space-y-1 text-sm">
        <SidebarLink href="/clients" active={isActive("/clients")}>
          🏠 Clients
        </SidebarLink>
        <SidebarLink href="/stories" active={isActive("/stories")}>
          📚 All Stories
        </SidebarLink>
        <SidebarLink
          href="/developments"
          active={isActive("/developments")}
        >
          🧩 All Developments
        </SidebarLink>
      </nav>

      <div className="mt-3 px-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        Clients
      </div>
      <div className="px-2 pt-1 pb-3 text-sm overflow-y-auto flex-1 space-y-0.5">
        <SidebarLink href="/clients/new" active={isActive("/clients/new")}>
          ➕ Create new client (soon)
        </SidebarLink>
        {clients.map((client) => (
          <SidebarLink
            key={client.id}
            href={`/clients/${client.id}`}
            active={isActive(`/clients/${client.id}`)}
          >
            {client.name}
          </SidebarLink>
        ))}
      </div>
    </aside>
  );
}

type SidebarLinkProps = {
  href: string;
  active?: boolean;
  children: React.ReactNode;
};

function SidebarLink({ href, active, children }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-1.5 text-slate-300 hover:bg-slate-900 hover:text-white transition-colors text-xs",
        active &&
          "bg-sky-600/20 text-sky-400 border border-sky-500/40 font-medium"
      )}
    >
      {children}
    </Link>
  );
}
