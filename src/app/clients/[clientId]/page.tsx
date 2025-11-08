import { BackButton } from "../../components/ui/BackButton";
import { fakeStories } from "../../../lib/fake-db";
import Link from "next/link";

interface Props {
  params: {
    clientId: string;
  };
}

export default function ClientDetailsPage({ params }: Props) {
  const { clientId } = params;

  const clientStories = fakeStories.filter(
    (story) => story.client_id === clientId
  );

  return (
    <><BackButton />
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">📚 Stories du client {clientId}</h1>

      {clientStories.length === 0 && (
        <p className="text-gray-500">Aucune story trouvée.</p>
      )}

      <ul className="space-y-2">
        {clientStories.map((story) => (
          <li key={story.id} className="border p-4 rounded-md">
            <h2 className="font-semibold">{story.reference}</h2>
            <p className="text-sm text-gray-600">{story.description}</p>

            <Link
              href={`/clients/${clientId}/stories/${story.id}`}
              className="text-blue-600 hover:underline mt-2 block"
            >
              → Voir les developments
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={`/clients/${clientId}/stories/new`}
        className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-md"
      >
        ➕ Nouvelle story
      </Link>
    </div>
</>
  );
}