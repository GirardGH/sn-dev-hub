// src/app/page.tsx
import { fakeClients, fakeStories, fakeDevelopments } from "../lib/fake-db";


export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Bienvenue sur SN Dev Hub 👋</h1>
      <p className="text-gray-600 mt-2">Commence par créer un client.</p>
    </main>
  );
}
