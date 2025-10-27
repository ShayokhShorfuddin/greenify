import Link from "next/link";
import { CarbonTxtCard } from "./_static-homepage-audit-cards/CarbonTxtCard";

export function CarbonTxtSupport() {
  return (
    <section className="flex justify-center mt-[4rem] md:mt-[7rem] font-sans px-4">
      <div className="flex flex-col-reverse md:flex-row gap-x-[3rem] gap-y-[2rem]">
        <div className="flex flex-col">
          <h2 className="text-2xl font-medium">We 💚 Carbon.txt</h2>

          <p className="text-sm mt-2 text-neutral-700 xs:text-base max-w-md">
            Carbon.txt is a single recognisable location on any web domain for
            public sustainability data relating to that company. The project is
            a great initiative by the{" "}
            <Link
              href="https://www.thegreenwebfoundation.org/"
              target="_blank"
              className="underline"
            >
              Green Web Foundation
            </Link>
            , and we are proud to provide extensive support for it including
            validation, reachability, file builder, content formatting, and
            more.
          </p>
        </div>

        <CarbonTxtCard />
      </div>
    </section>
  );
}
