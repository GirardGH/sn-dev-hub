import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ---- Helpers DB ---- //
async function getUserClients() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

async function getCountsForClient(clientId: string) {
  const [{ count: storyCount }, { count: devCount }] = await Promise.all([
    supabase
      .from("stories")
      .select("*", { count: "exact", head: true })
      .eq("client_id", clientId),

    supabase
      .from("developments")
      .select("*", { count: "exact", head: true })
      .eq("story_id", clientId), // ❗ Mauvais — on doit compter les devs liés aux stories du client
  ]);

  return {
    storyCount: storyCount ?? 0,
    devCount: devCount ?? 0,
  };
}

// 🔧 Correction du comptage des developments
async function getDevCountForClient(clientId: string) {
  const { data: storyIds } = await supabase
    .from("stories")
    .select("id")
    .eq("client_id", clientId);

  if (!storyIds || storyIds.length === 0) return 0;

  const storyList = storyIds.map((s) => s.id);

  const { count } = await supabase
    .from("developments")
    .select("*", { count: "exact", head: true })
    .in("story_id", storyList);

  return count ?? 0;
}

// ------------------------------------------------------------- //
//                        PAGE COMPONENT                        //
// ------------------------------------------------------------- //

export default async function ClientsPage() {
  const clients = await getUserClients();

  // Précharger les stats stories/devs pour chaque client
  const stats = await Promise.all(
    clients.map(async (c) => {
      const storyCount = await supabase
        .from("stories")
        .select("*", { count: "exact", head: true })
        .eq("client_id", c.id);

      const devCount = await getDevCountForClient(c.id);

      return {
        clientId: c.id,
        stories: storyCount.count ?? 0,
        devs: devCount ?? 0,
      };
    })
  );

  return (
    <div className="p-6 space-y-4">
      {/* ---------- HEADER ---------- */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Clients</h1>

        <Link
          href="/clients/new"
          className="px-3 py-1.5 rounded-md bg-sky-600 text-[10px] font-medium hover:bg-sky-500 text-slate-50"
        >
          + New Client
        </Link>
      </div>

      {/* ---------- GRID ---------- */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 max-h-[80vh] overflow-auto pr-2 scrollbar-thin">
        {clients.map((client) => {
          const stat = stats.find((s) => s.clientId === client.id);

          return (
            <Link
              key={client.id}
              href={`/clients/${client.id}/stories`}
              className="border border-slate-900 rounded-lg p-4 hover:border-sky-500/60 hover:bg-[#deeef3] dark:hover:bg-slate-900/40 transition-colors"
            >
              <div className="font-semibold dark:text-slate-100 mb-1">
                {client.name}
              </div>

              <div className="text-[10px] text-slate-400">
                {stat?.stories ?? 0} stories • {stat?.devs ?? 0} developments
              </div>
            </Link>
          );
        })}

        {clients.length === 0 && (
          <div className="text-sm text-slate-500">No clients yet.</div>
        )}
      </div>
    </div>
  );
}
