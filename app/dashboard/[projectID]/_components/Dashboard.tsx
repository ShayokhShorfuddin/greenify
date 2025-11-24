// TODO: Design UI for the dashboard page.

import { Toaster } from "react-hot-toast";
import { Heading } from "../../_components/Heading";
import { ComponentGrid } from "./ComponentGrid";

export async function Dashboard({ projectID }: { projectID: string }) {
  return (
    <main className="font-sans">
      <Heading projectID={projectID} />

      <ComponentGrid projectID={projectID} />
      <Toaster />
    </main>
  );
}
