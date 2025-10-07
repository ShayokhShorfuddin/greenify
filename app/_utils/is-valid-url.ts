// Check if the URL provided by the user is valid or not
export default function isValidUrl({ url }: { url: string }) {
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
