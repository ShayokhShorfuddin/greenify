import {
  type Type_DisclosureUrlStatus,
  validateCarbonTxt,
} from "@/app/_utils/carbontxt-validation";
import logger from "@/logger";

// Response type
export type Type_ExamineCarbonTxtFile =
  | {
      errorOccurred: true;
      kind: "ExamineCarbonTxtFile";
    }
  | {
      reachable: false;
      errorOccurred: false;
      kind: "ExamineCarbonTxtFile";
    }
  | {
      exists: false;
      reachable: true;
      errorOccurred: false;
      kind: "ExamineCarbonTxtFile";
    }
  | {
      exists: true;
      reachable: true;
      isMissing: true;
      missing: string[];
      errorOccurred: false;
      kind: "ExamineCarbonTxtFile";
    }
  | {
      exists: true;
      reachable: true;
      isMissing: false;
      errorOccurred: false;
      kind: "ExamineCarbonTxtFile";
      disclosureUrlStatuses: Type_DisclosureUrlStatus[];
    };

// Check if the site has a carbon.txt file or not
export async function examineCarbonTxtFile({
  url,
}: {
  url: string;
}): Promise<Type_ExamineCarbonTxtFile> {
  try {
    // Make a GET request to check if carbon.txt exists and get its content
    const response = await fetch(`${url}/carbon.txt`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      // Not found
      if (response.status === 404) {
        return {
          exists: false,
          reachable: true,
          errorOccurred: false,
          kind: "ExamineCarbonTxtFile",
        };
      } else {
        // For any other response status, we consider the file unreachable from our system
        return {
          reachable: false,
          errorOccurred: false,
          kind: "ExamineCarbonTxtFile",
        };
      }
    }

    // Assuming response is ok && status code is 200-299: Success, file exists

    // Get the content of the file and validate it
    const content = await response.text();

    const result = await validateCarbonTxt({
      content,
    });

    if (!result.success) {
      return {
        exists: true,
        reachable: true,
        isMissing: true,
        missing: result.missing,
        errorOccurred: false,
        kind: "ExamineCarbonTxtFile",
      };
    }

    return {
      exists: true,
      reachable: true,
      isMissing: false,
      errorOccurred: false,
      kind: "ExamineCarbonTxtFile",
      disclosureUrlStatuses: result.disclosureUrlStatuses,
    };
  } catch (error) {
    logger.error(`
      Received url: ${url}
      Error occurred while checking for carbon.txt. ${error}`);

    // TODO: Call sentry here
    return {
      errorOccurred: true,
      kind: "ExamineCarbonTxtFile",
    };
  }
}
