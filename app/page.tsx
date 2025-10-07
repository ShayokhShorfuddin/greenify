import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function Page() {
  return (
    <>
      {/* Navbar will go here */}

      <main>
        <Navbar />
        <Hero />
        <Footer />
      </main>

      {/* Footer will go here */}
    </>
  );
}
