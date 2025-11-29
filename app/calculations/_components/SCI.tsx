/** biome-ignore-all lint/correctness/noChildrenProp: <Needed for Tanstack Form> */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";
import { ErrorInfo } from "@/shared/ErrorInfo";
import Equation from "./Equation";

export default function SCI() {
  const [result, setResult] = useState<number | null>(null);

  const SCISchema = z.object({
    energy: z
      .number()
      .gt(0, { message: "Energy consumed should be greater than 0." }),
    carbonIntensity: z
      .number()
      .gt(0, { message: "Carbon intensity should be greater than 0." }),
    embodiedCarbon: z
      .number()
      .gt(0, { message: "Embodied carbon should be greater than 0." }),
    functionalUnit: z
      .string()
      .min(1, { message: "Please enter functional unit." }),
  });

  const form = useForm({
    defaultValues: {
      energy: 0,
      carbonIntensity: 0,
      embodiedCarbon: 0,
      functionalUnit: "",
    },

    validators: {
      onChange: SCISchema,
    },

    onSubmit: ({ value }) => {
      const { energy, carbonIntensity, embodiedCarbon } = value;

      //   SCI = ((E * I) + M) per R
      setResult(Number((energy * carbonIntensity + embodiedCarbon).toFixed(3)));
    },
  });

  return (
    <div className="p-3 rounded bg-audit-card-background border border-audit-card-border">
      <p>Software Carbon Intensity (SCI)</p>

      <Equation
        equation="SCI = ((E * I) + M) per R"
        equationName="SCI"
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
          name="energy"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Energy consumed (kWh)</p>
              <input
                type="number"
                step="any"
                name="energy"
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
          name="carbonIntensity"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Carbon intensity (gCO2eq/kWh)</p>
              <input
                type="number"
                step="any"
                name="carbonIntensity"
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
          name="embodiedCarbon"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Embodied carbon (kg)</p>
              <input
                type="number"
                step="any"
                name="embodiedCarbon"
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
          name="functionalUnit"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Functional unit</p>
              <input
                type="text"
                step="any"
                name="functionalUnit"
                value={field.state.value}
                placeholder="e.g. per user per device or per API call."
                onChange={(e) => {
                  setResult(null);
                  field.handleChange(e.target.value);
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

            <div className="text-sm">
              {result} per {form.state.values.functionalUnit}
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
                {isSubmitting ? "Computing..." : "Compute SCI"}
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
  );
}

const parameters = [
  {
    parameter: "E",
    fullForm: "Energy",
    description: "The energy consumed by your software, measured in kWh.",
  },
  {
    parameter: "I",
    fullForm: "Carbon intensity",
    description:
      "Carbon emitted per kWh of energy, measured in gCO2eq/kWh. This is the location-based carbon intensity of the energy grid powering your software. Market-based measures are 'not allowed' in the SCI; only the location-based metrics can be used.",
  },

  {
    parameter: "M",
    fullForm: "Embodied carbon",
    description:
      "The carbon emitted through the creation and disposal of the hardware that your software is running on, measured in kg.",
  },

  {
    parameter: "R",
    fullForm: "Functional unit",
    description:
      "The thing that makes this standard a rate. This should be how your software scales—for example, per user per device or per API call or maybe per Raspberry Pi device.",
  },
];

// TODO: We after finishing the KIMI curated equations of the "Building Green Software" book, we ourselves will scheme through it manually to see if there are any other equations we can add.
