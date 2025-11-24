// TODO: Design UI for the dashboard page.
import { Toaster } from "react-hot-toast";
import { CreateOrSelectNewProject } from "./CreateOrSelectNewProject";
import { Heading } from "./Heading";

export async function Dashboard() {
  return (
    <main className="font-sans">
      <Heading />
      <CreateOrSelectNewProject />
      <Toaster />
    </main>
  );
}
