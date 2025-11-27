/** biome-ignore-all lint/correctness/noChildrenProp: <Tanstack form needs it> */
"use client";

import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import Modal from "react-modal";
import isValidUrl from "@/app/_utils/is-valid-url";
import { addProject } from "@/app/actions/data/projects";
import { authClient } from "@/lib/auth-client";
import plus from "@/public/svgs/plus.svg";

// Necessary for screen readers and accessibility
Modal.setAppElement("#root-body");

// Required to position the modal correctly
const customStyles = {
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0px",
    transform: "translate(-50%, -50%)",
  },
};

export function NewProjectButton() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center gap-x-1.5 py-0.5 px-2 rounded text-sm font-medium border border-green-500 hover:cursor-pointer"
      >
        <Image src={plus} alt="New Project" className="size-3" />
        New Project
      </button>

      {/* Modal for creating a new project */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create new project."
      >
        <ModalContent openModalFn={openModal} closeModalFn={closeModal} />
      </Modal>
    </>
  );
}

function ModalContent({
  openModalFn,
  closeModalFn,
}: {
  openModalFn: () => void;
  closeModalFn: () => void;
}) {
  const [error, setError] = useState<string | null>(null); // For displaying failure messages

  const form = useForm({
    defaultValues: {
      projectName: "",
      projectURL: "",
    },

    onSubmit: async ({ value }) => {
      const projectName = value.projectName.trim();
      const projectURL = value.projectURL.toLowerCase().trim();

      // Clear any previous insertion failure message
      setError(null);

      // Get the ID of the user
      const userID = (await authClient.getSession()).data?.user.id as string;

      const response = await addProject({ userID, projectName, projectURL });

      // If insertion failed
      if (response.errorOccurred) {
        setError("Failed to create new project. Consider trying again.");
        return;
      }

      // If project already exists
      if (response.projectAlreadyExists) {
        setError("Project already exists.");
        return;
      }

      // Close modal
      closeModalFn();

      // TODO: Redirect to the new project's dashboard through the new project ID
      redirect(`/dashboard/${response.projectID}`);

      // TODO: Should we allow subdomains? like abc.example.com and xyz.example.com as different projects? For now, let's not allow that. We can always change it later.

      //   Can multiple users monitor the same sites (example.com) under different accounts? Normally they can but since we will tell them to copy and paste our special script into their site, only the person who has access to the site can do that. The people don't have access to the site can't add our script tag, so they can only see the normal audits that don't require our script tag. So it's fine to allow multiple users to monitor the same site. Basically they will be missing out on the real-time features and graphs.
    },
  });

  return (
    <div className="p-5 font-sans w-full max-w-md xs:w-lg">
      <h2 className="text-xl font-medium">Create a new project.</h2>
      <p className="text-sm text-neutral-700 mt-1">
        Provide a name and the public URL for your project.
      </p>

      <form
        className="mt-4 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="projectName"
          validators={{
            onChange: ({ value }) => {
              value = value.trim();

              // If no project name is provided
              if (value.length === 0) {
                return "Project name is required.";
              }
            },
          }}
          children={(field) => (
            <>
              <input
                type="text"
                name="projectName"
                className="border border-neutral-300 rounded p-2 w-full text-sm focus:outline-none focus:border-green-500 placeholder-neutral-400"
                placeholder="My portfolio site"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />

              {/* Error message */}
              {!field.state.meta.isValid &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500 mt-1 w-full">
                    {field.state.meta.errors[0]}
                  </p>
                )}
            </>
          )}
        />

        <form.Field
          name="projectURL"
          validators={{
            onChange: ({ value }) => {
              // The user must be editing their project URL after realizing it already exists. So we clear the error message. Otherwise, the error message will stay at the bottom while they are editing, which is kinda odd.
              setError(null);

              value = value.trim();

              // If user left a trailing slash
              if (value.endsWith("/")) {
                return "Please remove trailing slash.";
              }

              // Must include http:// or https://
              if (
                !value.startsWith("http://") &&
                !value.startsWith("https://")
              ) {
                return "URL must start with http:// or https://";
              }

              // Guard clause for invalid URLs
              if (!isValidUrl({ url: value })) {
                return "Please enter a valid URL.";
              }
            },
          }}
          children={(field) => (
            <>
              <input
                type="text"
                name="projectUrl"
                className="border border-neutral-300 rounded p-2 mt-2 w-full text-sm focus:outline-none focus:border-green-500 placeholder-neutral-400"
                placeholder="https://example.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />

              {/* Error message */}
              {!field.state.meta.isValid &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500 mt-1 w-full">
                    {field.state.meta.errors[0]}
                  </p>
                )}

              {/* Failures */}
              {error && (
                <p className="text-sm text-red-500 mt-1 w-full">{error}</p>
              )}
            </>
          )}
        />

        <div className="flex justify-end items-center mt-5">
          <button
            type="button"
            onClick={closeModalFn}
            className="text-sm text-neutral-600 py-1 px-3 hover:underline hover:cursor-pointer"
          >
            Cancel
          </button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="relative bg-green-500 py-1 px-3 rounded text-white text-sm font-medium select-none transition-all duration-50 ease-in-out hover:cursor-pointer shadow-[0_3px_0_0_#008236] xs:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_0_0_0_#008236]"
              >
                {isSubmitting ? "Saving..." : "Create"}
              </button>
            )}
          />
        </div>
      </form>
    </div>
  );
}
