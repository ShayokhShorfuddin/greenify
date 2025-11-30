"use client";

import { co2 } from "@tgwf/co2";
import { useState } from "react";
import { CopyToClipboardButton } from "@/shared/CopyToClipboardButton";

export default function FileSizeMeasurer() {
  const [result, setResult] = useState<{
    fileName: string;
    filetype: string;
    filesizeInBytes: number;
    fileLastModified: number;
    SWDPerByteEmission: number;
    SWDPerVisitEmission: number;
    OneBytePerByteEmission: number;
  } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const filesizeInBytes = file.size;

    // SWD Per Byte Emission
    const SWDPerByteEmission = Number(
      new co2({ model: "swd", version: 4 }).perByte(filesizeInBytes),
    );

    // SWD Per Visit Emission
    const SWDPerVisitEmission = Number(
      new co2({ model: "swd", version: 4 }).perVisit(filesizeInBytes),
    );

    // 1byte Per Byte Emission
    const OneBytePerByteEmission = Number(
      new co2({ model: "1byte" }).perByte(filesizeInBytes),
    );

    setResult({
      filesizeInBytes,
      fileName: file.name,
      filetype: file.type || "N/A",
      fileLastModified: file.lastModified,
      SWDPerByteEmission: Number(SWDPerByteEmission.toFixed(6)),
      SWDPerVisitEmission: Number(SWDPerVisitEmission.toFixed(6)),
      OneBytePerByteEmission: Number(OneBytePerByteEmission.toFixed(6)),
    });
  }

  return (
    <div className="p-3 rounded bg-greenify-card-background border border-greenify-card-border">
      <p>File Size Measurer</p>

      <input
        type="file"
        onChange={(e) => handleChange(e)}
        className="w-full border border-greenify-card-border rounded mt-2 p-1 hover:cursor-pointer"
      />

      {result && (
        <div className="flex flex-col gap-y-3 mt-3 text-sm">
          <div className="flex items-center gap-x-4">
            <p>Name: </p>
            <p className="font-mono break-all">{result.fileName}</p>
          </div>

          <div className="flex items-center gap-x-4">
            <p>Type: </p>
            <p className="font-mono">{result.filetype}</p>
          </div>

          <div className="flex items-center gap-x-4">
            <p>Last Modified: </p>
            <p className="font-mono">
              {new Date(result.fileLastModified).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-x-4">
            <p>Bytes: </p>
            <div className="flex items-center gap-x-1">
              {result.filesizeInBytes}
              <CopyToClipboardButton text={result.filesizeInBytes.toString()} />
            </div>
          </div>

          <hr className="border-neutral-300" />

          <div className="flex flex-col gap-y-2">
            <p className="underline underline-offset-4">
              Potential CO2 Emission
            </p>

            <div className="flex items-center justify-between gap-x-4">
              <p>SWD Per Byte: </p>
              <p className="font-mono">{result.SWDPerByteEmission} gCO2eq</p>
            </div>

            <div className="flex items-center justify-between gap-x-4">
              <p>SWD Per Visit: </p>
              <p className="font-mono">{result.SWDPerVisitEmission} gCO2eq</p>
            </div>

            <div className="flex items-center justify-between gap-x-4">
              <p>1byte Per Byte: </p>
              <p className="font-mono">
                {result.OneBytePerByteEmission} gCO2eq
              </p>
            </div>
          </div>

          <p className="text-xs mt-3">
            Uploaded files are not sent to our server. All processing is done
            within your browser :)
          </p>
        </div>
      )}
    </div>
  );
}
