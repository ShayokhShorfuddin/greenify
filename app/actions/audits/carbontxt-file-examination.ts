import {
  type Type_DisclosureUrlStatus,
  validateCarbonTxt,
} from "@/app/_utils/carbontxt-validation";
import logger from "@/logger";

// Response type
export type Type_ExamineCarbonTxtFile =
  | {
      errorOccurred: true;
    }
  | {
      exists: false;
      errorOccurred: false;
    }
  | {
      exists: true;
      isMissing: true;
      missing: string[];
      errorOccurred: false;
    }
  | {
      exists: true;
      isMissing: false;
      errorOccurred: false;
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

    // Not found
    if (!response.ok && response.status === 404) {
      return {
        exists: false,
        errorOccurred: false,
      };
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
        isMissing: true,
        missing: result.missing,
        errorOccurred: false,
      };
    }

    return {
      exists: true,
      isMissing: false,
      errorOccurred: false,
      disclosureUrlStatuses: result.disclosureUrlStatuses,
    };
  } catch (error) {
    logger.error(`
      Received url: ${url}
      Error occurred while checking for carbon.txt. ${error}`);

    // TODO: Call sentry here
    return {
      errorOccurred: true,
    };
  }
}
