import Image from "next/image";
import Link from "next/link";
import logger from "@/logger";
import cross from "@/public/svgs/cross.svg";
import green_tick from "@/public/svgs/green-tick.svg";

type Type_APIResponse =
  | { green: false }
  | {
      green: true;
      hosted_by: string;
      hosted_by_website: string;

      supporting_documents: {
        title: string;
        link: string;
      }[];
    };

export async function GreenHostCardContent({ url }: { url: string }) {
  let result: Type_APIResponse;

  try {
    // Get hostname (required by the API)
    const hostname = new URL(url).hostname;
    const response = await fetch(
      `https://api.thegreenwebfoundation.org/api/v3/greencheck/${hostname}`,
      {
        method: "GET",
      },
    );

    // TODO: Check if the API is down or not
    if (!response.ok) {
      logger.error(`GWF API is responded not ok: ${response}`);
      return (
        <p className="text-sm mt-1 text-red-500">
          Failed to reach API. Try again later.
        </p>
      );
    }

    result = (await response.json()) as Type_APIResponse;
  } catch (error) {
    logger.error(`Failed while fetching green host data: ${error}`);

    return (
      <p className="text-sm mt-1 text-red-500">
        Failed to perform audit. We are investigating the issue.
      </p>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 mt-1">
        {result.green ? (
          <>
            <p className="text-sm text-neutral-500">Host is green.</p>
            <Image src={green_tick} alt="Green tick" className="size-3" />
          </>
        ) : (
          <>
            <p className="text-sm text-neutral-500">Host is not green.</p>
            <Image src={cross} alt="Cross" className="size-3" />
          </>
        )}
      </div>

      {result.green && (
        <>
          <p className="text-sm text-neutral-500 mt-1">
            Hosted by:{" "}
            <span className="text-green-500">{result.hosted_by}</span>
          </p>

          <Link href={result.hosted_by_website} target="_blank">
            <p className="text-sm text-neutral-500 mt-1 break-words overflow-hidden">
              Host URL:{" "}
              <span className="text-blue-500 underline">
                {result.hosted_by_website}
              </span>
            </p>
          </Link>

          {/* If supporting documents are available*/}
          {result.supporting_documents.length > 0 && (
            <>
              <hr className="w-full border-neutral-200 mt-2" />

              <div className="flex flex-col gap-y-3 rounded-md mt-2 text-sm">
                {result.supporting_documents.map((document, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <We wont be reordering this list>
                  <div key={index}>
                    <p>{document.title}</p>

                    <Link href={document.link} target="_blank">
                      <p className="mt-1 text-blue-500 underline truncate">
                        {document.link}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
