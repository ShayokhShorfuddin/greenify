import { pingUrl, type Type_PingResult } from "@/app/_utils/ping";
import logger from "@/logger";

type Type_DisclosuresInformation =
  | {
      errorOccurred: true;
    }
  | {
      url: string;
      status: number;
      errorOccurred: false;
    };

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
      syntaxError: true;
      syntaxErrorMessage: string;
      errorOccurred: false;
    }
  | {
      exists: true;

      isOrgTablePresent: boolean;
      isUpstreamTablePresent: boolean;
      isDisclosuresArrayPresent: boolean;
      isServicesArrayPresent: boolean;

      disclosuresInformation: Type_DisclosuresInformation[];
      services: string[];

      syntaxError: false;
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

    // TODO: Do all necessary parsing and validation of the file content here

    // Parse the content of the file
    // TODO: Not fully confident if every cases are tested. Review and improve later with Jest?
    const parsedContent: Type_ParseTOML = parseTOML(content);

    // Check if the parsed content has any syntax errors
    if (parsedContent.syntaxError) {
      logger.error(`Syntax error in carbon.txt: ${parsedContent.message}`);
      return {
        exists: true,
        syntaxError: true,
        syntaxErrorMessage: parsedContent.message,
        errorOccurred: false,
      };
    }

    // Initialize an empty disclosuresInformation array
    const disclosuresInformation: Type_DisclosuresInformation[] = [];

    // Check if disclosure urls are reachable or not
    if (
      parsedContent.isOrgTablePresent &&
      parsedContent.isDisclosuresArrayPresent
    ) {
      const pingPromises = parsedContent.content.org.disclosures.map(
        async (disclosure) => {
          const pingResponse: Type_PingResult = await pingUrl(disclosure.url);
          if (pingResponse.errorOccurred) {
            return {
              errorOccurred: true,
            } as Type_DisclosuresInformation;
          } else {
            return {
              url: disclosure.url,
              status: pingResponse.status,
              errorOccurred: false,
            } as Type_DisclosuresInformation;
          }
        },
      );

      const results = await Promise.all(pingPromises);
      disclosuresInformation.push(...results);
    }

    // TODO: Update our return type accordingly and return parsed results
    return {
      exists: true,
      isOrgTablePresent: parsedContent.isOrgTablePresent,
      isUpstreamTablePresent: parsedContent.isUpstreamTablePresent,
      isDisclosuresArrayPresent: parsedContent.isDisclosuresArrayPresent,
      isServicesArrayPresent: parsedContent.isServicesArrayPresent,

      services: parsedContent.isServicesArrayPresent
        ? parsedContent.content.upstream.services.map(
            (service) => service.domain,
          )
        : [],

      disclosuresInformation: disclosuresInformation,
      syntaxError: false,
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
