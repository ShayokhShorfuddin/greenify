import Image from "next/image";
import usa_flag from "@/public/images/USA_flag.png";
import { CopyToClipboardButton } from "../_audit-result-components/CopyToClipboardButton";

export function IPToCarbonIntensityCard() {
  return (
    <div className="relative bg-audit-card-background border border-audit-card-border rounded-lg p-3">
      {/* Audit number */}
      <small className="text-neutral-700 font-mono">Audit #3</small>
      <p className="text-[15px]">
        IP to CO<sub>2</sub> intensity.
      </p>

      <CopyToClipboardButton
        text={`Country: United States of America
Intensity: 378.625 gCO2eq/kWh
Intensity type: Avg
Data year: 2021
Renewable: 39.82%
Fossil: 60.18%`}
      />

      <div className="mt-1 text-sm text-neutral-500">
        <div className="flex gap-x-1 items-center">
          <p>Country:</p>

          <div className="flex gap-x-1 items-center">
            <p className="text-neutral-700">United States of America</p>
            <Image src={usa_flag} alt="Flag of USA" />
          </div>
        </div>

        <p className="mt-1">Intensity: 378.625 gCO2eq/kWh.</p>

        <p className="mt-1">Intensity type: Avg</p>

        <p className="mt-1">Data year: 2021</p>

        <hr className="w-full border-neutral-200 mt-2" />

        <p className="mt-2 font-medium text-neutral-700">
          Electricity spectrum.
        </p>

        <div className="w-full h-2 bg-neutral-200 rounded mt-2">
          <div
            className="h-2 bg-green-500 rounded"
            style={{ width: "39.82%" }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-x-2">
            <div className="size-2 bg-green-500 rounded-full" />
            <p>Renewable</p>
          </div>

          <p>39.82%</p>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-x-2">
            <div className="size-2 bg-neutral-400 rounded-full" />
            <p>Fossil</p>
          </div>

          <p>60.18%</p>
        </div>
      </div>
    </div>
  );
}
