import { BackButton } from "../../../../components/ui/BackButton";
import { fakeDevelopments, fakeStories } from "../../../../../lib/fake-db";
import Link from "next/link";

interface Props {
  params: {
    clientId: string;
    storyId: string;
  };
}

export default function StoryDetailsPage({ params }: Props) {
  const { clientId, storyId } = params;

  const devs = fakeDevelopments.filter((dev) => dev.story_id === storyId);
  const story = fakeStories.find((s) => s.id === storyId);

  return (
    <>
    <BackButton />
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">🧪 Developments pour {story?.reference}</h1>

      {devs.length === 0 && (
        <p className="text-gray-500">Aucun développement trouvé.</p>
      )}

      <ul className="space-y-2">
        {devs.map((dev) => (
          <li key={dev.id} className="border p-4 rounded-md">
            <h2 className="font-semibold">{dev.script_name}</h2>
            <p className="text-sm text-gray-600">{dev.description}</p>

            <Link
              href={`/clients/${clientId}/stories/${storyId}/devs/${dev.id}`}
              className="text-blue-600 hover:underline mt-2 block"
            >
              → Voir le détail
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={`/clients/${clientId}/stories/${storyId}/devs/new`}
        className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-md"
      >
        ➕ Nouveau dev
      </Link>
    </div>
    </>
  );
}
