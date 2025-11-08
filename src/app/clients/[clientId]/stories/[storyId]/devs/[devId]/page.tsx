import { BackButton } from "../../../../../../components/ui/BackButton";
import { fakeDevelopments } from "../../../../../../../lib/fake-db";

interface Props {
  params: {
    clientId: string;
    storyId: string;
    devId: string;
  };
}

export default function DevDetailsPage({ params }: Props) {
  const { devId } = params;

  const dev = fakeDevelopments.find((d) => d.id === devId);

  if (!dev) {
    return (
      <div className="p-4">
        <BackButton />
        <p className="text-red-600 font-semibold mt-4">
          Développement introuvable.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <BackButton />

      <h1 className="text-2xl font-bold">🧠 {dev.script_name}</h1>
      <p className="text-gray-700">{dev.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <p><strong>Type :</strong> {dev.script_type}</p>
        <p><strong>Timing :</strong> {dev.execution_timing}</p>
        <p><strong>Table :</strong> {dev.linked_table}</p>
        <p><strong>Scope :</strong> {dev.scope}</p>
        <p><strong>Version :</strong> {dev.version}</p>
        <p><strong>Date :</strong> {dev.created_at}</p>
      </div>

      <div>
        <h2 className="font-semibold mt-4">Script :</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
          <code>{dev.script}</code>
        </pre>
      </div>
    </div>
  );
}
