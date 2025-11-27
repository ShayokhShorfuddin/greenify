import { headers } from "next/headers";
import Image from "next/image";
import { getAllProjectNamesAndIDs } from "@/app/actions/data/projects";
import { auth } from "@/lib/auth";
import download from "@/public/svgs/download.svg";
import { NewProjectButton } from "./NewProjectButton";
import { Select } from "./Select";

export async function Heading({ projectID }: { projectID?: string }) {
  // Get the current logged in user's email from the session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Get user id and firstname
  const userID = session?.user.email as string;
  const userName = session?.user.name || "Guest";
  const firstName = userName.split(" ")[0];

  // Create a promise to get user's projects
  const getAllProjectNamesAndIDsPromise = getAllProjectNamesAndIDs({
    userID,
  });

  return (
    <header className="p-2 font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-lg">Welcome, {firstName}</h1>

        <div className="flex gap-x-2 items-center">
          <Select
            projectID={projectID}
            getAllProjectNamesAndIDsPromise={getAllProjectNamesAndIDsPromise}
          />

          {/* Export button */}
          <button
            type="button"
            className="relative flex items-center gap-x-1.5 bg-green-500 py-0.5 px-2 rounded text-white text-sm font-medium select-none transition-all duration-50 ease-in-out hover:cursor-pointer shadow-[0_3px_0_0_#008236] xs:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_0_0_0_#008236] w-fit"
          >
            {/* TODO: We will initiate a modal on click. Will have all the export types we promised*/}
            <Image src={download} alt="Export" className="size-3.5" />
            Export
          </button>

          <NewProjectButton />
        </div>
      </div>
    </header>
  );
}
