import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getClientById } from "@/lib/mockData";
import { ClientTabs } from "@/components/ClientTabs";

type Props = {
  children: ReactNode;
  params: { clientId: string };
};

export default function ClientLayout({ children, params }: Props) {
  const client = getClientById(params.clientId);
  if (!client) return notFound();

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[white] border-b border-slate-800 w-full
      dark:bg-slate-950 dark:text-slate-50">
        <div className="px-8 pt-1 pb-2 flex justify-between items-center">
          <div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
              Client
            </div>
            <h1 className="text-lg font-semibold text-slate-700 dark:text-slate-100">
              {client.name}
            </h1>
          </div>
          <button className="px-3 py-1.5 rounded-md border border-slate-700 text-[9px] dark:text-slate-300 hover:border-sky-500 hover:text-sky-400">
            Edit client (soon)
          </button>
        </div>
        <ClientTabs clientId={client.id} />
      </div>

      {/* Main content scrollable */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
