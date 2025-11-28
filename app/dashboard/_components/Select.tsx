"use client";

import { redirect } from "next/navigation";
import { use } from "react";
import type { Type_GetAllProjectNamesResponse } from "@/app/actions/data/types";

export function Select({
  projectID,
  getAllProjectNamesAndIDsPromise,
}: {
  projectID?: string;
  getAllProjectNamesAndIDsPromise: Promise<Type_GetAllProjectNamesResponse>;
}) {
  const response = use(getAllProjectNamesAndIDsPromise);

  //  If we faced an issue while fetching project names
  if (!response || response.errorOccurred) {
    return <p className="text-red-500 text-sm">Failed to load projects.</p>;
  }

  // If no projects have been created by user, we won't show the select dropdown
  // Only show select dropdown if there are projects
  if (!response.errorOccurred && response.projectNamesAndIDs.length === 0) {
    return null;
  }

  // If users have projects, show the select dropdown
  if (!response.errorOccurred && response.projectNamesAndIDs.length > 0) {
    return (
      <select
        name=""
        id=""
        className="hover:cursor-pointer"
        value={projectID ? projectID : ""}
        onChange={(e) => {
          redirect(`/dashboard/${e.target.value}`);
        }}
      >
        <option value="">Select a project</option>

        {response.projectNamesAndIDs.map((projectNameAndID) => (
          <option
            key={projectNameAndID.projectID}
            value={projectNameAndID.projectID}
          >
            {projectNameAndID.name}
          </option>
        ))}
      </select>
    );
  }
}
