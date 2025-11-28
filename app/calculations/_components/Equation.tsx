/** biome-ignore-all lint/a11y/useValidAnchor: <Required because of react-tooltip> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */

"use client";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Equation({
  equation,
  equationName,
  parameters,
}: {
  equation: string | string[];
  equationName: string;
  parameters: {
    parameter: string;
    fullForm: string;
    description: string;
  }[];
}) {
  return (
    <>
      {typeof equation === "string" ? (
        <p className="py-1 px-2.5 border rounded border-audit-card-border mt-2 text-xs font-mono">
          {equation}
        </p>
      ) : (
        <div className="flex flex-col gap-y-2 py-1 px-2.5 border rounded border-audit-card-border mt-2 text-xs font-mono">
          {equation.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-3 gap-x-6">
        <p className="text-sm underline">Parameters</p>

        <div className="flex items-center gap-2 flex-wrap">
          {parameters.map((parameter, index) => (
            <a
              key={index}
              data-tooltip-id={`${equationName}-parameter-tooltip`}
              data-tooltip-html={`<span class='text-green-400 font-semibold'>${parameter.fullForm}</span><br />${parameter.description}`}
              className={`${equationName}-parameter-${index} text-xs font-mono underline hover:decoration-green-400 hover:text-green-400 transition hover:cursor-default select-none p-1.5`}
            >
              {parameter.parameter}
            </a>
          ))}
        </div>
      </div>

      <Tooltip
        id={`${equationName}-parameter-tooltip`}
        style={{
          zIndex: 2,
        }}
        className="max-w-72"
        place="top"
      />
    </>
  );
}
