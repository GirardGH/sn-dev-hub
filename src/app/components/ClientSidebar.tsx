// src/components/ClientSidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fakeClients } from "../../lib/fake-db";

export function ClientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r h-screen p-4 overflow-y-auto bg-gray-50">
      <h2 className="text-lg font-bold mb-4">👥 Mes clients</h2>

      <ul className="space-y-2">
        {fakeClients.map((client) => {
          const isActive = pathname?.includes(`/clients/${client.id}`);
          return (
            <li key={client.id}>
              <Link
                href={`/clients/${client.id}`}
                className={`block px-3 py-2 rounded-md ${
                  isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`}
              >
                {client.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/clients/new"
        className="block mt-6 text-sm text-blue-600 hover:underline"
      >
        ➕ Nouveau client
      </Link>
    </aside>
  );
}
