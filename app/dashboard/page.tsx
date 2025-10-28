import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Greenify | Dashboard",
  };
}

export default function Page() {
  // TODO: Since this is a new page, shouldn't we have an h1 here?
  // TODO: Design UI for the dashboard page.
  // TODO: Design sidebar
  return <h1>Dashboard Page</h1>;
}
