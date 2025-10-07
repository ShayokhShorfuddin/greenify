"use server";
import checkIfCarbonTxtExists from "./audits/check-if-carbon-txt-exists";

// Entry point for analyzing a URL
async function analyzeUrl({ url }: { url: string }) {
  // Audit 1: Check if the site has a carbon.txt file or not
  console.log(await checkIfCarbonTxtExists({ url }));
}

// Export server actions
export { analyzeUrl };
