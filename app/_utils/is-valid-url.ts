// Check if the URL provided by the user is valid or not
export default function isValidUrl({ url }: { url: string }) {
  // If the text is just whitespace/empty
  if (!url.trim()) {
    return false;
  }

  const result = url.match(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  );

  return result !== null;
}
