"use client";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-2xl font-bold p-4 border rounded-sm bg-secondary"
    >
      ⇦ Back
    </button>
  );
};
