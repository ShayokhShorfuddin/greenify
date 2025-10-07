import Dashboard from "./_components/Dashboard";
import FAQ from "./_components/FAQ";
import Hero from "./_components/Hero";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const { url } = await searchParams; // url is a string or undefined

  // If no url param, render the homepage.
  if (!url) {
    return (
      <main>
        <Hero />
        <FAQ />
      </main>
    );
  }

  // If there is a url param, render the dashboard.
  return <Dashboard url={url} />;
}
