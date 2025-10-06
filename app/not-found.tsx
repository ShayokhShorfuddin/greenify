"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-col h-svh w-full justify-center items-center font-sans">
      <h1 className="text-2xl xs:text-5xl text-center font-medium text-green-500">
        Are You Lost?
      </h1>

      <p className="mt-2 px-5 text-sm xs:text-base text-center">
        We can help you find your way back.
      </p>

      <button
        type="button"
        onClick={() => {
          router.back();
        }}
        className="relative bg-green-500 py-1 px-3 rounded mt-5 text-white text-sm font-medium select-none transition-all duration-50 ease-in-out hover:cursor-pointer shadow-[0_3px_0_0_#008236] active:translate-y-0.5 active:shadow-[0_0_0_0_#008236]"
      >
        Go Back
      </button>
    </main>
  );
}
