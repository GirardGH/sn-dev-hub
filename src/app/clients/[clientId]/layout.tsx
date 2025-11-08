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
    <div className="flex flex-col h-full w-full">
      <div className="px-6 pt-5 pb-3 border-b border-slate-900">
        <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
          Client
        </div>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-slate-100">
            {client.name}
          </h1>
          <button className="px-3 py-1.5 rounded-md border border-slate-700 text-[9px] text-slate-300 hover:border-sky-500 hover:text-sky-400">
            Edit client (soon)
          </button>
        </div>
      </div>

      <ClientTabs clientId={client.id} />

      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
