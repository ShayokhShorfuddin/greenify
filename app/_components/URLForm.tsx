"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import isValidUrl from "../_utils/is-valid-url";

export default function URLForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // If user left a trailing slash
    if (url.endsWith("/")) {
      setError("Please remove trailing slash.");
      return;
    }

    // Must include http:// or https://
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    // Guard clause for invalid URLs
    if (!isValidUrl({ url })) {
      setError("Please enter a valid URL.");
      return;
    }

    // Finally, redirect to "/" with the url as a query param
    router.push(`${window.location.origin}/?url=${encodeURIComponent(url)}`);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col xs:flex-row gap-2 mt-[2rem]"
      >
        <input
          type="text"
          maxLength={2000} // Set a reasonable max length for URLs. Prevents abuse.
          // Update the URL state and clear error on change
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          placeholder="https://example.com"
          className="border border-green-400 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm font-mono rounded px-3 py-1"
        />

        <button
          type="submit"
          className="relative bg-green-500 py-1 px-3 rounded text-white text-sm font-medium select-none transition-all duration-50 ease-in-out hover:cursor-pointer shadow-[0_3px_0_0_#008236] xs:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_0_0_0_#008236]"
        >
          Analyze!
        </button>
      </form>

      {/* In case of any error, show beneath the input field */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
