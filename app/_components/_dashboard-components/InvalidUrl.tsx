"use client";

import { redirect } from "next/navigation";

export default function InvalidUrl() {
  return (
    <div className="flex flex-col mt-[3rem] px-5 w-full justify-center items-center font-sans">
      <h1 className="text-xl xs:text-2xl text-center font-medium text-red-500">
        Hmm... That doesn't look like a valid URL.
      </h1>

      <p className="mt-2 xs:mt-1 text-sm xs:text-base text-center">
        Try double-checking the URL for typos & trailing slashes.
      </p>

      <button
        type="button"
        onClick={() => {
          redirect("/");
        }}
        className="relative bg-green-500 py-1 px-3 rounded mt-5 text-white text-sm font-medium select-none transition-all duration-50 ease-in-out hover:cursor-pointer shadow-[0_3px_0_0_#008236] active:translate-y-0.5 active:shadow-[0_0_0_0_#008236]"
      >
        Go Back
      </button>
    </div>
  );
}
