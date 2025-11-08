import { BackButton } from "../../../../components/ui/BackButton";


export default function NewStoryPage({ params }: { params: { clientId: string } }) {
return (
<>
<BackButton />
<h1 className="text-xl font-semibold">📝 Nouvelle story pour le client {params.clientId}</h1>
</>
);
}