// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { clients } from "@/lib/mockData";
// import { cn } from "@/lib/utils";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const isActive = (href: string) =>
//     pathname === href || pathname.startsWith(href + "/");

//   return (
//     <aside className="h-screen w-64 border-r border-slate-900 bg-slate-950 text-slate-100 flex flex-col">
//       <div className="px-4 py-4 border-b border-slate-900">
//         <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
//           SN DEV HUB
//         </div>
//         <div className="font-semibold text-slate-50 text-sm">Workspace</div>
//       </div>

//       <nav className="px-2 py-3 space-y-1 text-sm">
//         <SidebarLink href="/clients" active={isActive("/clients")}>
//           🏠 Clients
//         </SidebarLink>
//         <SidebarLink href="/stories" active={isActive("/stories")}>
//           📚 All Stories
//         </SidebarLink>
//         <SidebarLink
//           href="/developments"
//           active={isActive("/developments")}
//         >
//           🧩 All Developments
//         </SidebarLink>
//       </nav>

//       <div className="mt-3 px-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
//         Clients
//       </div>
//       <div className="px-2 pt-1 pb-3 text-sm overflow-y-auto flex-1 space-y-0.5">
//         <SidebarLink href="/clients/new" active={isActive("/clients/new")}>
//           ➕ Create new client (soon)
//         </SidebarLink>
//         {clients.map((client) => (
//           <SidebarLink
//             key={client.id}
//             href={`/clients/${client.id}`}
//             active={isActive(`/clients/${client.id}`)}
//           >
//             {client.name}
//           </SidebarLink>
//         ))}
//       </div>
//     </aside>
//   );
// }

// type SidebarLinkProps = {
//   href: string;
//   active?: boolean;
//   children: React.ReactNode;
// };

// function SidebarLink({ href, active, children }: SidebarLinkProps) {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "flex items-center gap-2 rounded-md px-3 py-1.5 text-slate-300 hover:bg-slate-900 hover:text-white transition-colors text-xs",
//         active &&
//           "bg-sky-600/20 text-sky-400 border border-sky-500/40 font-medium"
//       )}
//     >
//       {children}
//     </Link>
//   );
// }

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
        w-64
        px-4 py-6
        flex flex-col gap-6
        bg-[#032d42]/95 text-slate-100 border-r border-[#e2e5e7]
        dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800
      "
    >
      {/* Header: logo + toggle */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold tracking-[.25em] uppercase text-slate-100 dark:text-slate-500">
          SN DEV HUB
        </div>
        <ThemeToggle />
      </div>

      {/* Workspace */}
      <div>
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase mb-2">
          Workspace
        </div>
        <NavItem href="/clients" label="Clients" active={isActive("/clients")} />
        <NavItem
          href="/stories"
          label="All Stories"
          active={isActive("/stories")}
        />
        <NavItem
          href="/developments"
          label="All Developments"
          active={isActive("/developments")}
        />
      </div>

      {/* Clients list */}
      <div>
        <div className="text-xs font-semibold text-slate-100 dark:text-slate-500 uppercase mb-2">
          Clients
        </div>
        <div className="text-xs text-slate-100 mb-2">
          + Create new client (soon)
        </div>
        <div className="flex flex-col gap-1">
          {clients.map((c) => (
            <NavItem
              key={c.id}
              href={`/clients/${c.id}`}
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
      className={`
        block rounded-md px-3 py-2 transition-colors
        ${small ? "text-sm" : "text-[15px]"}
        ${
          active
            ? `
              bg-sky-500/10 text-sky-700 border border-green-200/40
              dark:bg-sky-500/15 dark:text-sky-400
            `
            : `
              text-[#b9dbe4] hover:bg-[#032d42] hover:text-sky-50 hover:underline
              dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-300
            `
        }
      `}
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
        // Icon soleil pour passer en clair
        <span className="text-sm">☀️</span>
      ) : (
        // Icon lune pour passer en sombre
        <span className="text-sm">🌙</span>
      )}
    </button>
  );
}

