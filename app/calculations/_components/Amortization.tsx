/** biome-ignore-all lint/correctness/noChildrenProp: <Needed for Tanstack Form> */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";
import { ErrorInfo } from "@/shared/ErrorInfo";
import Equation from "./Equation";

export default function Amortization() {
  const [result, setResult] = useState<number | null>(null);

  const AmortizationSchema = z.object({
    embodiedCarbonCost: z
      .number()
      .gt(0, { message: "Embodied carbon cost should be greater than 0." }),
    expectedLifetime: z
      .number()
      .gt(0, { message: "Expected lifetime should be greater than 0." }),
  });

  const form = useForm({
    defaultValues: {
      embodiedCarbonCost: 0,
      expectedLifetime: 0,
    },

    validators: {
      onChange: AmortizationSchema,
    },

    onSubmit: ({ value }) => {
      const { embodiedCarbonCost, expectedLifetime } = value;

      // Amortization = EC / EL
      setResult(Number((embodiedCarbonCost / expectedLifetime).toFixed(3)));
    },
  });

  return (
    <div className="p-3 rounded bg-audit-card-background border border-audit-card-border">
      <p>Amortization</p>

      <Equation
        equation="Amortized Value = EC / EL"
        equationName="Amortization"
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
          name="embodiedCarbonCost"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Embodied carbon cost (kg CO₂e)</p>
              <input
                type="number"
                step={"any"}
                name="embodiedCarbonCost"
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
          name="expectedLifetime"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Expected lifetime (years)</p>
              <input
                type="number"
                step={"any"}
                name="expectedLifetime"
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

            <p className="text-sm">{result} kg CO₂e/year</p>
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
                {isSubmitting ? "Computing..." : "Compute Amortized Value"}
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
    parameter: "EC",
    fullForm: "Embodied carbon",
    description:
      "The greenhouse gases released during the manufacturing and disposal of the physical hardware (servers, storage devices, etc.) that make up the data center.",
  },
  {
    parameter: "EL",
    fullForm: "Expected lifetime",
    description:
      "The period of time, usually measured in years, that a device is anticipated to be functional, perform its intended purpose, and remain structurally sound before it needs significant replacement.",
  },
];
