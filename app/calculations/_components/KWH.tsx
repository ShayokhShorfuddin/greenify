/** biome-ignore-all lint/correctness/noChildrenProp: <Needed for Tanstack Form> */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";
import { ErrorInfo } from "@/shared/ErrorInfo";
import Equation from "./Equation";

export default function KWH() {
  const [result, setResult] = useState<number | null>(null);

  const KWHSchema = z.object({
    watts: z.number().gt(0, { message: "Power should be greater than 0." }),
    hours: z.number().gt(0, { message: "Hours should be greater than 0." }),
  });

  const form = useForm({
    defaultValues: {
      watts: 0,
      hours: 0,
    },

    validators: {
      onChange: KWHSchema,
    },

    onSubmit: ({ value }) => {
      const { watts, hours } = value;

      // kWh = (W × h) / 1000
      setResult(Number(((watts * hours) / 1000).toFixed(3)));
    },
  });

  return (
    <div className="p-3 rounded bg-audit-card-background border border-audit-card-border">
      <p>Kilowatt-hour (kWh)</p>

      <Equation
        equation="kWh = (W * h) / 1000"
        equationName="kWh"
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
          name="watts"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Watts (W)</p>
              <input
                type="number"
                step="any"
                name="watts"
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
          name="hours"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Hours (h)</p>
              <input
                type="number"
                step="any"
                name="hours"
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

            <p className="text-sm">{result} kWh</p>
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
                {isSubmitting ? "Computing..." : "Compute kWh"}
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
    parameter: "W",
    fullForm: "Watts",
    description:
      "A measure of the rate at which energy is produced, transferred, or consumed. It's also the standard unit of power in the International System of Units (SI).",
  },
  {
    parameter: "h",
    fullForm: "Hours",
    description:
      "Indicates the duration for which the power is consumed or produced.",
  },
];
