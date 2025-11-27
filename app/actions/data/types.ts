type Type_AddProjectData = {
  name: string;
  url: string;
  createdBy: string; // The id of the user who created the project
};

type Type_AddProjectResponse =
  | {
      errorOccurred: true;
    }
  | {
      errorOccurred: false;
      projectAlreadyExists: true;
    }
  | {
      errorOccurred: false;
      projectAlreadyExists: false;
      projectID: string;
    };

type Type_GetProjectByIDResponse =
  | {
      errorOccurred: true;
    }
  | {
      errorOccurred: false;
      notFound: true;
    }
  | {
      errorOccurred: false;
      notFound: false;

      project: {
        name: string;
        url: string;
        // TODO: Might need to expand this later as we add more analytics related data
      };
    };

type Type_GetAllProjectNamesResponse =
  | {
      errorOccurred: true;
    }
  | {
      errorOccurred: false;
      projectNames: { name: string; projectID: string }[];
    };

export type {
  Type_AddProjectData,
  Type_AddProjectResponse,
  Type_GetProjectByIDResponse,
  Type_GetAllProjectNamesResponse,
};
