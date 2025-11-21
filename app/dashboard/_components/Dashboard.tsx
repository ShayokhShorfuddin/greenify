// TODO: Design UI for the dashboard page.

import { Heading } from "./Heading";

export function Dashboard() {
  // TODO: check in database if user has any project. If yes, show project details else show "Create a new project" section.
  return (
    <main>
      {/* Add "Create a new project" section if no project found in database*/}
      <Heading />

      {/* Container of all dashboard components */}
      <section className="grid grid-cols-4 grid-rows-1 gap-5 mt-[2rem] px-[1.2rem] font-sans">
        <p>Hello</p>
        {/* <CarbonTxtCard url={url} />
        <GreenHostCard url={url} />
        <IPToCo2IntensityCard url={url} /> */}
      </section>
    </main>
  );
}
