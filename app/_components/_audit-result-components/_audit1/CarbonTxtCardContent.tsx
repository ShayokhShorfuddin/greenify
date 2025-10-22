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

      {/* carbon.txt file URL */}
      <Link
        href={`${url}/carbon.txt`}
        target="_blank"
        className="text-sm text-blue-400 underline"
      >
        <p className="mt-1">{`${url}/carbon.txt`}</p>
      </Link>
    </>
  );
}
