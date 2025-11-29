import type { Metadata } from "next";
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
import Amortization from "./_components/Amortization";
import FileSizeMeasurer from "./_components/FileSizeMeasurer";
import KWH from "./_components/KWH";
import PUE from "./_components/PUE";
import SCI from "./_components/SCI";
import TotalCO2e from "./_components/TotalCO2e";
import TransferEmission from "./_components/TransferEmission";
import UnitConverter from "./_components/UnitConverter";

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
      <Navbar />

      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-5 mt-8 px-[1.2rem] font-sans mb-12">
        <PUE />
        <KWH />
        <UnitConverter />
        <Amortization />
        <TotalCO2e />
        <SCI />
        <TransferEmission />
        <FileSizeMeasurer />
      </section>

      <Footer />
    </main>
  );
}
