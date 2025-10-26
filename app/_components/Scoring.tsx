import { ScoreCard } from "./_static-homepage-audit-cards/ScoreCard";

export function Scoring() {
  return (
    <section className="flex justify-center mt-[7rem] font-sans">
      <div className="flex gap-x-[3rem]">
        <ScoreCard />

        <div className="flex flex-col">
          <h2 className="text-2xl font-medium">
            Audit Reports
            <span className="text-green-500">.</span>
          </h2>

          <p className="text-sm mt-2 text-neutral-700 xs:text-base max-w-md">
            Every single Greenify audit generates a comprehensive report along
            with actionable steps to improve your website's sustainability. Want
            to export your reports? We have got you covered with tons of file
            formats including PDF, CSV, JSON, HTML, XML, Markdown, even MS Word.
            You name it!
          </p>
        </div>
      </div>
    </section>
  );
}
