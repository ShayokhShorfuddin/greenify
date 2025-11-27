import CarbonTxtCard from "@/app/_components/_audit-result-components/_audit1/CarbonTxtCard";
import GreenHostCard from "@/app/_components/_audit-result-components/_audit2/GreenHostCard";
import IPToCo2IntensityCard from "@/app/_components/_audit-result-components/_audit3/IPToCo2IntensityCard";
import { getProjectByID } from "@/app/actions/data/projects";

// Container of all dashboard components
export async function ComponentGrid({ projectID }: { projectID: string }) {
  const response = await getProjectByID({ projectID });

  if (response.errorOccurred) {
    // TODO: Style it later
    return <p>Unable to load project data.</p>;
  }

  if (response.notFound) {
    // TODO: Style it later
    return <p>Project not found.</p>;
  }

  const { project } = response;

  return (
    <>
      <p>{project.name}</p>
      <p>{project.url}</p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-5 mt-8 px-[1.2rem] font-sans">
        <CarbonTxtCard url={project.url} />
        <GreenHostCard url={project.url} />
        <IPToCo2IntensityCard url={project.url} />
      </section>
    </>
  );
}
