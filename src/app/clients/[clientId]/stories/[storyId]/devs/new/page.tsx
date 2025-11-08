import { BackButton } from "../../../../../../components/ui/BackButton";


export default function NewDevPage({ params }: { params: { storyId: string } }) {
return (
<>
<BackButton />
<h1 className="text-xl font-semibold">🧩 Nouveau développement pour la story {params.storyId}</h1>
</>
);
}