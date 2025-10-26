import URLForm from "./URLForm";

export default function Hero() {
  return (
    <section>
      <div className="flex flex-col items-center mt-[4rem] xs:mt-[5rem] font-sans">
        <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl max-w-4xl text-center leading-[1.15] px-5">
          The most <span className="italic text-green-500">complete</span>{" "}
          digital <span className="round_marking">carbon</span> auditor on
          planet <span className="green_underlined">Earth</span>.
        </h1>

        {/*TODO: Since we are going telemetry mode, change subheading */}
        <p className="text-sm mt-5 sm:mt-7 text-neutral-700 text-center xs:text-base max-w-xl px-5">
          Build a web that's as clean as it is fast. Get a comprehensive carbon
          footprint analysis and report for any active website on the internet.
          Just drop in the link and we will handle the rest.
        </p>

        {/* <URLForm /> */}
      </div>
    </section>
  );
}
