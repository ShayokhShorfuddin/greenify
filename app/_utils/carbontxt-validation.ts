import { pingUrl } from "./ping";

export type Type_DisclosureUrlStatus =
  | {
      errorOccurred: true;
      url: string;
    }
  | {
      errorOccurred: false;
      url: string;
      status: number;
    };

type Type_ValidateCarbonTxtResult =
  | {
      success: false;
      missing: string[]; // Turns out, GWF doesn't really care whether we have the upstream table and services array or not in the carbon.txt file. It only throws syntax error when [org] table or disclosures array is missing. In future, they may or may not change this behavior or may introduce new table/arrays which are required. So, we simply list the missing fields.
    }
  | {
      success: true;
      disclosureUrlStatuses: Type_DisclosureUrlStatus[];
    };

export async function validateCarbonTxt({
  content,
}: {
  content: string;
}): Promise<Type_ValidateCarbonTxtResult> {
  // First, we need to send a POST request to the official GWF validator
  const response = await fetch(
    "https://carbontxt.org/tools/validator?/validate",
    {
      method: "POST",
      body: new URLSearchParams({
        "carbon-txt-validator": content,
      }),
    },
  );

  const result = await response.json();
  // biome-ignore lint/suspicious/noExplicitAny: <Since we are not sure of the Response structure, we have to use any>
  const parsedData: any[] = JSON.parse(result.data);

  // Extract success status
  const responseObject = parsedData[2];
  const success = responseObject?.success
    ? parsedData[responseObject.success]
    : false;

  // If validation failed, extract errors
  if (!success && responseObject?.errors) {
    const errorIndices = parsedData[responseObject.errors];

    const missingArray: string[] = [];

    for (const errorIndex of errorIndices) {
      const errorObject = parsedData[errorIndex];
      const locIndices = parsedData[errorObject.loc];

      for (const locIndex of locIndices) {
        missingArray.push(parsedData[locIndex]);
      }
    }

    return { success, missing: missingArray };
  }

  // Extract disclosure URLs
  const dataObject = parsedData[responseObject?.data];
  const orgObject = dataObject?.org ? parsedData[dataObject.org] : null;
  const disclosuresObject = orgObject?.disclosures
    ? parsedData[orgObject.disclosures]
    : null;

  const disclosureUrls = disclosuresObject
    ? disclosuresObject.map((index: number) => {
        const disclosure = parsedData[index];
        return parsedData[disclosure.url];
      })
    : [];

  const disclosureUrlStatuses = await Promise.all(
    disclosureUrls.map(async (url: string) => {
      const pingResult = await pingUrl(url);

      if (pingResult.errorOccurred) {
        return { errorOccurred: true, url };
      }

      return { errorOccurred: false, url, status: pingResult.status };
    }),
  );

  return { success, disclosureUrlStatuses };
}

// Reference
// The numbers are indexes in the parsedData array, serving as references to relevant information.
// [
//   { url: 1, response: 2 },
//   "https://www.thegreenwebfoundation.org/carbon.txt",
//   { success: 3, url: 1, data: 4, document_data: 31, logs: 32 },
//   true,
//   { upstream: 5, org: 22 },
//   { services: 6 },
//   [7, 11, 13, 16, 19],
//   { domain: 8, name: 9, service_type: 10 },
//   "www.hetzner.com",
//   null,
//   "block-storage",
//   { domain: 8, name: 9, service_type: 12 },
//   "virtual-private-servers",
//   { domain: 14, name: 9, service_type: 15 },
//   "www.scaleway.com",
//   "object-storage",
//   { domain: 17, name: 9, service_type: 18 },
//   "www.34sp.com",
//   "managed-wordpress-hosting",
//   { domain: 20, name: 9, service_type: 21 },
//   "www.cloudflare.com",
//   "content-delivery-network",
//   { disclosures: 23 },
//   [24, 28],
//   { domain: 25, doc_type: 26, url: 27 },
//   "thegreenwebfoundation.org",
//   "web-page",
//   "https://www.techcarbonstandard.org/case-studies/green-web-foundation/overview",
//   { domain: 25, doc_type: 29, url: 30 },
//   "other",
//   "https://www.thegreenwebfoundation.org/.well-known/tcs.json",
//   {},
//   [33, 34, 35, 36, 37, 38, 39],
//   "Attempting to validate url: https://www.thegreenwebfoundation.org/carbon.txt",
//   "Carbon.txt file parsed as valid TOML.",
//   "Parsed TOML was recognised as valid Carbon.txt file.\n",
//   "csrd_greenweb: Processing supporting document: https://www.techcarbonstandard.org/case-studies/green-web-foundation/overview for thegreenwebfoundation.org",
//   "carbon_txt.process_csrd_document: Document type web-page seen. Doing nothing",
//   "csrd_greenweb: Processing supporting document: https://www.thegreenwebfoundation.org/.well-known/tcs.json for thegreenwebfoundation.org",
//   "carbon_txt.process_csrd_document: Document type other seen. Doing nothing",
// ];
