import type { Metadata } from "next";
import KWH from "./_components/KWH";
import PUE from "./_components/PUE";
import SCI from "./_components/SCI";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Greenify | Calculations",
    // TODO: Edit later
    description: "Compute stuff.",
  };
}

export default function Page() {
  return (
    <main>
      {/*TODO: Edit later */}
      <p>All equations are given here</p>

      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-5 mt-8 px-[1.2rem] font-sans">
        <SCI />
        <PUE />
        <KWH />
      </section>
    </main>
  );
}
