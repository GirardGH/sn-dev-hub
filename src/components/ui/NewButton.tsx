'use client';

import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

interface NewButtonProps {
  label?: string;
  href: string;
}

export default function NewButton({ label = "New", href }: NewButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="flex items-center bg-[#00688B] hover:bg-[#005577] text-white px-2 py-2 text-sm font-semibold rounded-md shadow-sm transition-colors"
    >
      <PlusIcon className="w-4 h-4 mr-1" />
      {label}
    </button>
  );
}
