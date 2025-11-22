// The reason why it's called `store` is because zustand functions with the concept of stores. As store in zustand is essentially the place where you store your state and any function that updates that state and then your react components can access the store, access the values in the state and access the functions that update the state. In zustand, the way that you create a store is you use the create function directly from zustand.

import { create } from "zustand";

type ProjectStoreType = {
  projectID: string;
  projectURL: string;
  projectName: string;

  setProjectID: (projectID: string) => void;
  setProjectURL: (projectURL: string) => void;
  setProjectName: (projectName: string) => void;
};

// This is actually a custom hook
// `create` function gives us `set` function that we can use to update the state
export const useProjectStore = create<ProjectStoreType>((set) => ({
  // Initial state of the store
  projectID: "",
  projectURL: "",
  projectName: "",

  // Functions that update the state
  setProjectID: (projectID: string) => {
    set({ projectID: projectID });
  },
  setProjectURL: (projectURL: string) => {
    set({ projectURL: projectURL });
  },
  setProjectName: (projectName: string) => {
    set({ projectName: projectName });
  },
}));
