// TODO: Design UI for the dashboard page.

import { Toaster } from "react-hot-toast";

import { ComponentGrid } from "./ComponentGrid";
import { CreateOrSelectNewProject } from "./CreateOrSelectNewProject";
import { Heading } from "./Heading";

export function Dashboard({ projectID }: { projectID?: string }) {
  // TODO: check in database if user has any project. If yes, show project details else show "Create a new project" section.
  return (
    <main className="font-sans">
      {/* Add "Create a new project" section if no project found in database*/}
      <Heading projectID={projectID} />

      {/* If no projectID provided */}
      {!projectID && <CreateOrSelectNewProject />}

      {/* If projectID is provided */}
      {projectID && <ComponentGrid projectID={projectID} />}

      <Toaster />
    </main>
  );
}
