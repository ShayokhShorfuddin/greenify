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
      errorOccurred: false;
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

    console.log(response);

    // Not found
    if (!response.ok && response.status === 404) {
      return {
        exists: false,
        errorOccurred: false,
      };
    }

    // Assuming response is ok && status code is 200-299: Success, file exists
    // Get the content of the file
    const content = await response.text();

    // Simulate processing time
    // TODO: Remove this when done
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: Do all necessary parsing and validation of the file content here

    // TODO: Update our return type accordingly and return parsed results
    return {
      exists: true,
      errorOccurred: false,
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
