import Image from "next/image";
import Link from "next/link";
import green_tick from "@/public/svgs/green-tick.svg";
import { CopyToClipboardButton } from "../_audit-result-components/CopyToClipboardButton";

export function CarbonTxtCard() {
  return (
    <div className="relative bg-audit-card-background border border-audit-card-border rounded-lg p-3 max-w-[30rem]">
      {/* Audit number */}
      <small className="text-neutral-700 font-mono">Audit #1</small>
      <p className="text-[15px]">Carbon.txt file examination.</p>

      <CopyToClipboardButton
        text={`File exists.
Syntax: Valid

Disclosures:
  - https://www.techcarbonstandard.org/case-studies/green-web-foundation/overview: 200
  - https://www.thegreenwebfoundation.org/.well-known/tcs.json: 200

URL: https://www.thegreenwebfoundation.org/carbon.txt`}
      />

      {/* Existence */}
      <div className="flex items-center gap-2 mt-1">
        <p className="text-sm text-neutral-500">File exists.</p>
        <Image src={green_tick} alt="Green tick" className="size-3" />
      </div>

      {/* Validate if anything is missing or not */}

      <div className="flex items-center gap-2 mt-1">
        <p className="text-sm text-neutral-500">Valid syntax.</p>
        <Image src={green_tick} alt="Green tick" className="size-3" />
      </div>

      {/* Divider */}
      <hr className="w-full mt-2 border-neutral-200" />

      {/* Disclosure URL statuses */}
      <div>
        <p className="text-sm font-medium text-neutral-600 mt-2">Disclosures</p>

        <div className="flex items-center">
          <p
            className="text-sm text-neutral-500 truncate pr-6"
            title="https://www.techcarbonstandard.org/case-studies/green-web-foundation/overview"
          >
            https://www.techcarbonstandard.org/case-studies/green-web-foundation/overview
          </p>

          <small className="text-green-500 text-[12px]">200</small>
        </div>

        <div className="flex items-center">
          <p
            className="text-sm text-neutral-500 truncate pr-6"
            title="https://www.thegreenwebfoundation.org/.well-known/tcs.json"
          >
            https://www.thegreenwebfoundation.org/.well-known/tcs.json
          </p>

          <small className="text-green-500 text-[12px]">200</small>
        </div>
      </div>

      {/* carbon.txt file URL */}
      <Link
        href="https://www.thegreenwebfoundation.org/carbon.txt"
        target="_blank"
      >
        <p className="mt-2 text-sm text-blue-500 underline break-words overflow-hidden">
          https://www.thegreenwebfoundation.org/carbon.txt
        </p>
      </Link>
    </div>
  );
}
