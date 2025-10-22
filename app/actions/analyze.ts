"use server";

import { examineCarbonTxtFile } from "./audits/carbontxt-file-examination";

// Entry point for analyzing a URL
async function analyzeUrl({ url }: { url: string }) {
  // Audit 1: Carbon.txt file examination
  console.log(await examineCarbonTxtFile({ url }));
}

// Export server actions
export { analyzeUrl };
