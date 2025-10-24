type Type_CopyToClipboardResponse = {
  errorOccurred: boolean;
};

export async function copyToClipboard({
  text,
}: {
  text: string;
}): Promise<Type_CopyToClipboardResponse> {
  try {
    await navigator.clipboard.writeText(text);
    return { errorOccurred: false };
  } catch {
    return { errorOccurred: true };
  }
}
