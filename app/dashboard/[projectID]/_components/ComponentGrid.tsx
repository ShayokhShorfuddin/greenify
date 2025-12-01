import Image from "next/image";
import { CarbonTxtCard } from "@/app/_components/_audit-components/_audit1/CarbonTxtCard";
import { GreenHostCard } from "@/app/_components/_audit-components/_audit2/GreenHostCard";
import { IPToCo2IntensityCard } from "@/app/_components/_audit-components/_audit3/IPToCo2IntensityCard";
import { PingResponseTimeCard } from "@/app/_components/_info-components/_info1/PingResponseTimeCard";
import { BytesStatistics } from "@/app/_components/_info-components/_info2/BytesStatistics";
import { getProjectByID } from "@/app/actions/data/projects";
import connection_lost from "@/public/svgs/connection-lost.svg";

// Container of all dashboard components
export async function ComponentGrid({ projectID }: { projectID: string }) {
  const response = await getProjectByID({ projectID });

  if (response.errorOccurred) {
    return (
      <div className="flex flex-col items-center mt-12 px-4">
        <Image
          src={connection_lost}
          alt="Unable to load project data."
          className="h-24 sm:h-26 md:h-28 lg:h-32"
        />

        <p className="text-red-500 mt-8">Failed to load project data.</p>
        <p className="text-sm">Try again after some time.</p>
      </div>
    );
  }

  if (response.notFound) {
    return (
      <div className="flex flex-col items-center mt-12 px-4">
        <Image
          src={connection_lost}
          alt="Unable to find this project."
          className="h-24 sm:h-26 md:h-28 lg:h-32"
        />

        <p className="text-red-500 mt-8">Unable to find this project.</p>
        <p className="text-sm">Is the project ID correct?</p>
      </div>
    );
  }

  const { project } = response;

  return (
    <>
      <p>{project.name}</p>
      <p>{project.url}</p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-5 my-8 px-[1.2rem] font-sans">
        <CarbonTxtCard url={project.url} />
        <GreenHostCard url={project.url} />
        <IPToCo2IntensityCard url={project.url} />
        {/* TODO: 4th place is reserved for "Score card", which is basically the mark we give to the user based on all of the audits and stuffs, kinda like a final score*/}
        <div className="border border-greenify-card-border p-2 bg-greenify-card-background rounded">
          <p>Reserved</p>
        </div>

        <PingResponseTimeCard url={project.url} />

        {/* TODO: To make this one, we will need the bytes data sent from the informer to our database */}
        {/* TODO: 6th place is reserved for "https://api.websitecarbon.com"*/}
        <div className="border border-greenify-card-border p-2 bg-greenify-card-background rounded">
          <p>Reserved</p>
        </div>

        <BytesStatistics projectId={projectID} />
      </section>
    </>
  );
}

// TODO: Fix the errors on errors.txt
// TODO We need a logout button in the sidebar
// TODO Add PWA logos and icons
