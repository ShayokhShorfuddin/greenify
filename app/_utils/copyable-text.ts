import { CarbonTxtIsNotReachableText, ErrorOccurredText } from "@/shared/texts";
import type { Type_GreenHostAPIResponse } from "../_components/_audit-result-components/_audit2/GreenHostCardContent";
import type { Type_IPToCo2IntensityAPIResponse } from "../_components/_audit-result-components/_audit3/IPToCo2IntensityCardContent";
import type { Type_ExamineCarbonTxtFile } from "../actions/audits/carbontxt-file-examination";

type Type_CopyableTextParams = {
  url: string;
  result:
    | Type_ExamineCarbonTxtFile
    | Type_GreenHostAPIResponse
    | Type_IPToCo2IntensityAPIResponse;
};

export function copyableText({ url, result }: Type_CopyableTextParams): string {
  if (result.kind === "ExamineCarbonTxtFile") {
    return generateTextForExamineCarbonTxtFile({ url, result });
  }

  if (result.kind === "GreenHostAPIResponse") {
    return generateTextForGreenHostAPIResponse({ result });
  }

  if (result.kind === "IPToCo2IntensityAPIResponse") {
    return generateTextForIPToCo2IntensityAPIResponse({ result });
  }

  //   Likely won't reach here, but just in case and to satisfy TypeScript
  return "Failed to copy text.";
}

function generateTextForIPToCo2IntensityAPIResponse({
  result,
}: {
  result: Type_IPToCo2IntensityAPIResponse;
}): string {
  return `Country: ${result.country_name}
Intensity: ${result.carbon_intensity} g/kWh
Intensity type: ${
    result.carbon_intensity_type.charAt(0).toUpperCase() +
    result.carbon_intensity_type.slice(1)
  }
Data year: ${result.year}
Renewable: ${(100 - result.generation_from_fossil).toFixed(2)}%
Fossil: ${result.generation_from_fossil.toFixed(2)}%`;
}

function generateTextForGreenHostAPIResponse({
  result,
}: {
  result: Type_GreenHostAPIResponse;
}): string {
  if (!result.green) {
    return `Host is not green.`;
  }

  return `Host is green.
Hosted by: ${result.hosted_by}
Host URL: ${result.hosted_by_website}

${result.supporting_documents.length > 0 ? `Supporting Documents:\n${result.supporting_documents.map((doc) => `  - ${doc.title}: ${doc.link}`).join("\n")}` : ""}`;
}

function generateTextForExamineCarbonTxtFile({
  url,
  result,
}: {
  url: string;
  result: Type_ExamineCarbonTxtFile;
}): string {
  if (result.errorOccurred) {
    return `${ErrorOccurredText}
URL: ${url}/carbon.txt`;
  }

  if (!result.reachable) {
    return `${CarbonTxtIsNotReachableText}
URL: ${url}/carbon.txt`;
  }

  return `${result.exists ? "File exists." : "File doesn't exist."}
${result.exists ? `Syntax: ${result.isMissing ? "Invalid" : "Valid"}` : ""}
${
  result.exists && result.isMissing
    ? `Missing field: ${result.missing.join(" > ")}`
    : ""
}
${
  result.exists && !result.isMissing
    ? `Disclosures:\n${result.disclosureUrlStatuses
        .map(
          (disclosure) =>
            `  - ${disclosure.url}: ${disclosure.errorOccurred ? "Failed" : disclosure.status}`,
        )
        .join("\n")}`
    : ""
}

URL: ${url}/carbon.txt`;
}
