import { IPToCarbonIntensityCard } from "./_static-homepage-audit-cards/IPToCo2IntensityCard";

export function Insight() {
  return (
    <section className="flex justify-center mt-[7rem] font-sans px-4">
      <div className="flex flex-col md:flex-row gap-x-[3rem] gap-y-[2rem]">
        <IPToCarbonIntensityCard />

        <div className="flex flex-col">
          <h2 className="text-2xl font-medium">
            Extensive Insights
            <span className="text-green-500">.</span>
          </h2>

          <p className="text-sm mt-2 text-neutral-700 xs:text-base max-w-md">
            Gain access to detailed insights on your website's carbon emissions,
            including metrics like CO2 emissions per page view, energy
            consumption, and more. Our comprehensive reports help you understand
            your environmental impact and identify areas for improvement.
          </p>
        </div>
      </div>
    </section>
  );
}
