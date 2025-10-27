import type { Metadata } from "next";
import { CarbonTxtSupport } from "./_components/CarbonTxtSupport";
import { CTA } from "./_components/CTA";
import Dashboard from "./_components/Dashboard";
import FAQ from "./_components/FAQ";
import Hero from "./_components/Hero";
import { Insight } from "./_components/Insights";
import Navbar from "./_components/Navbar";
import { Scoring } from "./_components/Scoring";

// Dynamically generate metadata based on the presence of the `url` search parameter.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}): Promise<Metadata> {
  const { url } = await searchParams;

  if (!url) {
    return {
      title: "Greenify - Digital Carbon Auditing Made Easy",
      description:
        "The most complete digital carbon auditing platform on planet Earth. Track, analyze, and reduce your site's carbon footprint with ease.",
    };
  }

  return {
    title: `Greenify | ${url}`,
    description: `Comprehensive report for ${url} on Greenify.`,
  };
}

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
        <Navbar />
        <Hero />
        <Insight />
        <CarbonTxtSupport />
        <Scoring />
        <FAQ />
        <CTA />
      </main>
    );
  }

  // If there is a url param, render the dashboard.
  return <Dashboard url={url} />;
}
