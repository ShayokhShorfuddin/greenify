import Image from "next/image";
import Link from "next/link";
import { copyableText } from "@/app/_utils/copyable-text";
import {
  examineCarbonTxtFile,
  type Type_ExamineCarbonTxtFile,
} from "@/app/actions/audits/carbontxt-file-examination";
import cross from "@/public/svgs/cross.svg";
import green_tick from "@/public/svgs/green-tick.svg";
import { CarbonTxtIsNotReachableText, ErrorOccurredText } from "@/shared/texts";
import { CopyToClipboardButton } from "../CopyToClipboardButton";

export async function CarbonTxtCardContent({ url }: { url: string }) {
  const results: Type_ExamineCarbonTxtFile = await examineCarbonTxtFile({
    url,
  });

  // If we have received any error from the audit action
  if (results.errorOccurred) {
    return <p className="text-sm mt-1 text-red-500">{ErrorOccurredText}</p>;
  }

  // If we could not reach the carbon.txt file (server could be down)
  if (results.reachable === false) {
    return (
      <p className="text-sm mt-1 text-red-500">{CarbonTxtIsNotReachableText}</p>
    );
  }

  return (
    <>
      <CopyToClipboardButton text={copyableText({ url, result: results })} />

      {/* Existence */}
      <div className="flex items-center gap-2 mt-1">
        <p className="text-sm text-neutral-500">
          {results.exists ? "File exists." : "File doesn't exist."}
        </p>

        <Image
          src={results.exists ? green_tick : cross}
          alt={results.exists ? "Green tick" : "Cross"}
          className="size-3"
        />
      </div>

      {/* Validate if anything is missing or not */}
      {results.exists && (
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-neutral-500">
            {results.isMissing ? "Invalid syntax." : "Valid syntax."}
          </p>

          <Image
            src={results.isMissing ? cross : green_tick}
            alt={results.isMissing ? "Cross" : "Green tick"}
            className="size-3"
          />
        </div>
      )}

      {/* Divider */}
      <hr className="w-full mt-2 border-neutral-200" />

      {results.exists && results.isMissing && (
        <div>
          <p className="text-sm text-neutral-500 mt-1">Missing field:</p>

          <p className="text-sm text-neutral-500 mt-1">
            {results.missing.map((field, idx, arr) => (
              <span key={field} className="inline-flex items-center">
                <span
                  className={
                    idx === arr.length - 1 ? "text-red-500" : "text-neutral-500"
                  }
                >
                  {field}
                </span>

                {idx < arr.length - 1 && <span className="mx-1">{">"}</span>}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Disclosure URL statuses */}
      {results.exists && !results.isMissing && (
        <div>
          <p className="text-sm font-medium text-neutral-600 mt-2">
            Disclosures
          </p>

          <div className="flex flex-col gap-y-1">
            {results.disclosureUrlStatuses.map((disclosure, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <We won't reorder or modify this list>
              <div className="flex items-center justify-between" key={idx}>
                <Link
                  className="text-sm text-neutral-500 hover:underline break-all pr-6"
                  href={disclosure.url}
                  target="_blank"
                >
                  {disclosure.url}
                </Link>

                <small
                  className={`${
                    disclosure.errorOccurred
                      ? "text-red-500"
                      : disclosure.status >= 200 && disclosure.status < 300
                        ? "text-green-500"
                        : disclosure.status >= 300 && disclosure.status < 400
                          ? "text-yellow-500"
                          : disclosure.status >= 400 && disclosure.status < 500
                            ? "text-red-500"
                            : "text-neutral-500"
                  } text-[12px]`}
                >
                  {disclosure.errorOccurred ? "Failed" : disclosure.status}
                </small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* carbon.txt file URL */}
      <Link href={`${url}/carbon.txt`} target="_blank">
        <p className="mt-2 text-sm text-blue-500 underline break-words overflow-hidden">{`${url}/carbon.txt`}</p>
      </Link>
    </>
  );
}
