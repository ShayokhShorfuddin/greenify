import Image from "next/image";
import Link from "next/link";
import {
  examineCarbonTxtFile,
  type Type_ExamineCarbonTxtFile,
} from "@/app/actions/audits/carbontxt-file-examination";
import cross from "@/public/svgs/cross.svg";
import green_tick from "@/public/svgs/green-tick.svg";

export default async function CarbonTxtCardContent({ url }: { url: string }) {
  const results: Type_ExamineCarbonTxtFile = await examineCarbonTxtFile({
    url,
  });

  console.log(results);

  // If we have received any error from the audit action
  if (results.errorOccurred) {
    return (
      <p className="text-sm mt-1 text-red-500">
        Failed to perform audit. We are investigating the issue.
      </p>
    );
  }

  return (
    <>
      {/* Existence */}
      <div className="flex items-center gap-2 mt-1">
        {results.exists ? (
          <>
            <p className="text-sm text-neutral-500">File exists.</p>
            <Image src={green_tick} alt="Green tick" className="size-3" />
          </>
        ) : (
          <>
            <p className="text-sm text-neutral-500">File doesn't exist.</p>
            <Image src={cross} alt="Cross" className="size-3" />
          </>
        )}
      </div>

      {/* Since the file exists, we can show more information */}

      {/* Syntax validation */}
      <div className="flex items-center gap-2 mt-1">
        {results.exists && results.syntaxError ? (
          <>
            <p className="text-sm text-neutral-500">Invalid syntax.</p>
            <Image src={cross} alt="Cross" className="size-3" />
          </>
        ) : (
          <>
            <p className="text-sm text-neutral-500">Valid syntax.</p>
            <Image src={green_tick} alt="Green tick" className="size-3" />
          </>
        )}
      </div>

      {results.exists && results.syntaxError && (
        <p className="text-sm text-red-500">{results.syntaxErrorMessage}</p>
      )}

      {/* Missing things */}

      {/* Org table is missing */}
      {results.exists && !results.syntaxError && !results.isOrgTablePresent && (
        <p className="text-sm text-red-500">[org] table is missing.</p>
      )}

      {/* Upstream table is missing */}
      {results.exists &&
        !results.syntaxError &&
        !results.isUpstreamTablePresent && (
          <p className="text-sm text-red-500">[upstream] table is missing.</p>
        )}

      {/* Disclosures array is missing */}
      {results.exists &&
        !results.syntaxError &&
        !results.isDisclosuresArrayPresent && (
          <p className="text-sm text-red-500">disclosures array is missing.</p>
        )}

      {/* services array is missing */}
      {results.exists &&
        !results.syntaxError &&
        !results.isServicesArrayPresent && (
          <p className="text-sm text-red-500">services array is missing.</p>
        )}

      {/* List disclosures information */}
      <p className="text-sm text-neutral-700 font-medium mt-2">Disclosures</p>

      <div>
        {results.exists &&
          !results.syntaxError &&
          results.isDisclosuresArrayPresent &&
          results.disclosuresInformation.map((disclosure, index) =>
            disclosure.errorOccurred ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: <We won't reorder>
              <div key={index} className="flex items-center ml-2">
                <p>Error occurred</p>
              </div>
            ) : (
              // biome-ignore lint/suspicious/noArrayIndexKey: <We won't reorder>
              <div key={index} className="flex items-center">
                {/* <p className="">{disclosure.url}</p> */}
                {/* TODO: Fix overflowing text */}
                <p className="">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                {/* <p>{disclosure.status}</p> */}
              </div>
            ),
          )}
      </div>

      {/* carbon.txt file URL */}
      <Link
        href={`${url}/carbon.txt`}
        target="_blank"
        className="text-sm text-blue-400 underline"
      >
        <p className="mt-1 text-sm">{`${url}/carbon.txt`}</p>
      </Link>
    </>
  );
}
