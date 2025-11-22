// import { useQuery } from "@tanstack/react-query";

import { dehydrate } from "@tanstack/react-query";
import CarbonTxtCard from "@/app/_components/_audit-result-components/_audit1/CarbonTxtCard";
import { getProjectByID } from "@/app/actions/data/projects";
import { queryClient } from "@/lib/query-client";

// Container of all dashboard components
export async function ComponentGrid({ projectID }: { projectID: string }) {
  const response = await getProjectByID(projectID);

  // const { data, isLoading } = useQuery({
  //   queryFn: async () => getProjectByID(projectID),
  //   queryKey: ["project"],
  // });

  // TODO: ⚠️⚠️⚠️ we are in trouble. Tanstack react query is primarily meant for client side rendering (vanilla React apps). It gets complicated when we mix server and client components in Next.js.

  // TODO: Looking into State management in Next.js apps

  // TODO: Add loading state
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

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
    <section className="grid grid-cols-4 grid-rows-1 gap-5 mt-[2rem] px-[1.2rem] font-sans">
      <p>{project.name}</p>
      <p>{project.url}</p>

      <CarbonTxtCard url={project.url} />
      {/* <GreenHostCard url={url} />
        <IPToCo2IntensityCard url={url} /> */}
    </section>
  );
}
