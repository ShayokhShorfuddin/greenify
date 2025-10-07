import formatHttpTime, {
  type Type_formatHttpTime,
} from "@/app/_utils/format-http-time";

// Response type
type Type_CheckIfCarbonTxtExists =
  | {
      errorOccurred: true;
    }
  | {
      exists: false;
      errorOccurred: false;
    }
  | {
      exists: true;
      lastModified: Type_formatHttpTime;
      errorOccurred: false;
    };

// Check if the site has a carbon.txt file or not
export default async function checkIfCarbonTxtExists({
  url,
}: {
  url: string;
}): Promise<Type_CheckIfCarbonTxtExists> {
  try {
    // Make a HEAD request to check if carbon.txt exists
    const response = await fetch(`${url}/carbon.txt`, {
      method: "HEAD",
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
    // Get the last modified header
    const httpTime = response.headers.get("last-modified") as string;
    console.log(httpTime);

    return {
      exists: true,
      lastModified: formatHttpTime({ httpTime }),
      errorOccurred: false,
    };
  } catch {
    // TODO: We will call Winston and sentry here
    // TODO: Call Winston
    return {
      errorOccurred: true,
    };
  }
}
