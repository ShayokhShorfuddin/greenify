/** biome-ignore-all lint/correctness/noChildrenProp: <Needed for Tanstack Form> */
"use client";

import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import z from "zod";
import question_mark from "@/public/svgs/question-mark.svg";
import { ErrorInfo } from "@/shared/ErrorInfo";
import Equation from "./Equation";

export default function PUE() {
  const [result, setResult] = useState<number | null>(null);

  const PUESchema = z
    .object({
      totalFacilityEnergy: z
        .number()
        .gt(0, { message: "Total facility energy should be greater than 0." }),
      equipmentEnergy: z
        .number()
        .gt(0, { message: "Equipment energy should be greater than 0." }),
    })
    .refine((data) => data.totalFacilityEnergy >= data.equipmentEnergy, {
      message:
        "Total facility energy must be greater than or equal to equipment energy because TFE includes E plus the energy required for cooling, power distribution losses, and lighting.",
      path: ["totalFacilityEnergy"],
    });

  const form = useForm({
    defaultValues: {
      totalFacilityEnergy: 0,
      equipmentEnergy: 0,
    },

    validators: {
      onChange: PUESchema,
    },

    onSubmit: ({ value }) => {
      const { totalFacilityEnergy, equipmentEnergy } = value;

      // PUE = TFE / E
      setResult(Number((totalFacilityEnergy / equipmentEnergy).toFixed(3)));
    },
  });

  return (
    <>
      <div className="p-3 rounded bg-greenify-card-background border border-greenify-card-border">
        <p>Power Usage Effectiveness (PUE)</p>

        <Equation
          equation="PUE = TFE / E"
          equationName="PUE"
          parameters={parameters}
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="totalFacilityEnergy"
            children={(field) => (
              <>
                <p className="mt-2.5 text-xs">Total facility energy (kWh)</p>
                <input
                  type="number"
                  step="any"
                  name="totalFacilityEnergy"
                  value={field.state.value}
                  onChange={(e) => {
                    setResult(null);
                    field.handleChange(Number(e.target.value));
                  }}
                  className="mt-1 text-sm px-2 py-1 rounded border border-neutral-300 focus:outline-none focus:border-green-500 placeholder-neutral-400 w-full"
                />

                <ErrorInfo field={field} />
              </>
            )}
          />

          <form.Field
            name="equipmentEnergy"
            children={(field) => (
              <>
                <p className="mt-2.5 text-xs">Equipment energy (kWh)</p>
                <input
                  type="number"
                  step="any"
                  name="equipmentEnergy"
                  value={field.state.value}
                  onChange={(e) => {
                    setResult(null);
                    field.handleChange(Number(e.target.value));
                  }}
                  className="mt-1 text-sm px-2 py-1 rounded border border-neutral-300 focus:outline-none focus:border-green-500 placeholder-neutral-400 w-full"
                />

                <ErrorInfo field={field} />
              </>
            )}
          />

          {result !== null && (
            <div className="flex items-center justify-between mt-2.5">
              <p className="text-sm text-green-500">Result:</p>

              <div className="flex items-center">
                {/** biome-ignore lint/a11y/useValidAnchor: <> */}
                <a className="PUE-question-mark">
                  <Image
                    src={question_mark}
                    alt="Question mark"
                    className="size-7 p-2 hover:cursor-default transition"
                  />
                </a>
                <p className="text-sm">PUE {result}</p>
              </div>
            </div>
          )}

          <div className="mt-3.5 flex items-center gap-2">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="w-full relative bg-green-500 py-1 px-3 rounded text-white text-sm font-medium select-none transition-all duration-50 ease-in-out hover:cursor-pointer shadow-[0_3px_0_0_#008236] xs:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_0_0_0_#008236]"
                >
                  {isSubmitting ? "Computing..." : "Compute PUE"}
                </button>
              )}
            />

            <button
              type="button"
              className="py-1 px-3 rounded text-neutral-600 underline text-sm cursor-pointer"
              onClick={() => {
                setResult(null);
                form.reset();
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <Tooltip anchorSelect={`.PUE-question-mark`} className="max-w-72">
        The closer the PUE value is to 1, the more energy-efficient the facility
        is.
      </Tooltip>
    </>
  );
}

const parameters = [
  {
    parameter: "TFE",
    fullForm: "Total facility energy",
    description:
      "The total amount of energy consumed by the entire data center facility, measured in kWh.",
  },
  {
    parameter: "E",
    fullForm: "Equipment energy",
    description:
      "The energy consumed only by the computing equipment, including servers, storage devices, networking equipment, etc., measured in kWh.",
  },
];
