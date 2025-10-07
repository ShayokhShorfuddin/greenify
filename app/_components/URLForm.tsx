"use client";

import { useState } from "react";
import { analyzeUrl } from "../actions/analyze";

export default function URLForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Guard clause for invalid URLs
    if (!isValidUrl({ url })) {
      setError("Please enter a valid URL.");
      return;
    }

    // If user left a trailing slash
    if (url.endsWith("/")) {
      setError("Please remove trailing slash.");
      return;
    }

    // Call the server action to analyze the URL
    analyzeUrl({ url });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col xs:flex-row gap-2 mt-[2rem]"
      >
        <input
          type="text"
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

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

// Check if the URL provided by the user is valid or not
function isValidUrl({ url }: { url: string }) {
  // If the text is just whitespace/empty
  if (!url.trim()) {
    return false;
  }

  try {
    const newUrl = new URL(url);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch {
    return false;
  }
}
