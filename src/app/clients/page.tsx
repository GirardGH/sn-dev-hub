import Link from "next/link";
import {
  clients,
  getStoriesByClient,
  getDevsByClient,
} from "@/lib/mockData";

export default function ClientsPage() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Clients</h1>
        <button className="px-3 py-1.5 rounded-md bg-sky-600 text-[10px] font-medium hover:bg-sky-500 text-slate-50">
          + New Client (soon)
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 max-h-[80vh] overflow-auto pr-2 scrollbar-thin">
        {clients.map((client) => {
          const stories = getStoriesByClient(client.id);
          const devs = getDevsByClient(client.id);
          return (
            <Link
              key={client.id}
              href={`/clients/${client.id}/stories`}
              className="border border-slate-900 rounded-lg p-4 hover:border-sky-500/60 hover:bg-[#deeef3]  dark:hover:bg-slate-900/40 transition-colors"
            >
              <div className="font-semibold dark:text-slate-100 mb-1">
                {client.name}
              </div>
              <div className="text-[10px] text-slate-400">
                {stories.length} stories • {devs.length} developments
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
