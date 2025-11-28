/** biome-ignore-all lint/a11y/useValidAnchor: <Required because of react-tooltip> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */

"use client";

import { Tooltip } from "react-tooltip";

export default function Equation({
  equation,
  equationName,
  parameters,
}: {
  equation: string;
  equationName: string;
  parameters: {
    parameter: string;
    fullForm: string;
    description: string;
  }[];
}) {
  return (
    <>
      <p className="py-1 px-2.5 border rounded border-audit-card-border mt-2 text-xs font-mono ">
        {equation}
      </p>

      <div className="flex items-center justify-between mt-3 gap-x-6">
        <p className="text-sm underline">Parameters</p>

        <div className="flex items-center gap-2 flex-wrap">
          {parameters.map((parameter, index) => (
            <a
              key={index}
              className={`${equationName}-parameter-${index} text-xs font-mono underline hover:decoration-green-400 hover:text-green-400 transition hover:cursor-default select-none p-1.5`}
            >
              {parameter.parameter}
            </a>
          ))}
        </div>
      </div>

      {parameters.map((parameter, index) => (
        <Tooltip
          key={index}
          anchorSelect={`.${equationName}-parameter-${index}`}
          className="max-w-72"
        >
          <span className="text-green-400">{parameter.fullForm}</span> <br />
          {parameter.description}
        </Tooltip>
      ))}
    </>
  );
}
