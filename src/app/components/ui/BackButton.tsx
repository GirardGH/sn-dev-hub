"use client";
import { useRouter } from "next/navigation";


export function BackButton() {
const router = useRouter();
return (
<button
onClick={() => router.back()}
className="text-sm text-indigo-600 hover:underline mb-4 block"
>
← Retour
</button>
);
}