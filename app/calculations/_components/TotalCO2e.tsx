/** biome-ignore-all lint/correctness/noChildrenProp: <Needed for Tanstack Form> */
"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";
import { ErrorInfo } from "@/shared/ErrorInfo";
import Equation from "./Equation";

export default function TotalCO2e() {
  const [result, setResult] = useState<number | null>(null);

  const TotalCO2eSchema = z.object({
    energyUsedByServicesInCloud: z.number().gt(0, {
      message: "Energy used by cloud services should be greater than 0.",
    }),
    PUE: z.number().gt(0, {
      message: "PUE of the cloud provider should be greater than 0.",
    }),
    gridEmission: z.number().gt(0, {
      message: "Grid emission should be greater than 0.",
    }),
    embodiedEmission: z.number().gt(0, {
      message: "Embodied emission should be greater than 0.",
    }),
  });

  const form = useForm({
    defaultValues: {
      energyUsedByServicesInCloud: 0,
      PUE: 0,
      gridEmission: 0,
      embodiedEmission: 0,
    },

    validators: {
      onChange: TotalCO2eSchema,
    },

    onSubmit: ({ value }) => {
      const {
        energyUsedByServicesInCloud,
        PUE,
        gridEmission,
        embodiedEmission,
      } = value;

      // Total CO₂e = OE + E

      // OE = (cloud provider service usage) × (cloud energy conversion factors [kWh]) × (cloud provider power usage effectiveness (PUE)) × (grid emissions factors [metric tons CO₂e])

      // E = estimated metric tons CO₂e emissions from the manufacturing of datacenter servers, for compute usage

      setResult(
        Number(
          (
            energyUsedByServicesInCloud * PUE * gridEmission +
            embodiedEmission
          ).toFixed(3),
        ),
      );
    },
  });

  return (
    <div className="p-3 rounded bg-audit-card-background border border-audit-card-border">
      <p>Total CO₂e</p>

      <Equation
        equation={[
          "Total CO₂e = OE + E",
          "Operational emission = Energy used by services in cloud * PUE * Grid emission",
          "Embodied emission = Estimated metric tons CO₂e emissions from the manufacturing of datacenter servers, for compute usage",
        ]}
        equationName="TotalCO2e"
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
          name="energyUsedByServicesInCloud"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">
                Energy used by services in cloud (kWh)
              </p>
              <input
                type="number"
                step={"any"}
                name="energyUsedByServicesInCloud"
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
          name="PUE"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Power usage effectiveness (PUE)</p>
              <input
                type="number"
                step={"any"}
                name="PUE"
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
          name="gridEmission"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Grid emission (metric tons CO₂e)</p>
              <input
                type="number"
                step={"any"}
                name="gridEmission"
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
          name="embodiedEmission"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">
                Embodied emission (metric tons CO₂e)
              </p>
              <input
                type="number"
                step={"any"}
                name="embodiedEmission"
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

            <p className="text-sm">{result} metric tons CO₂e</p>
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
                {isSubmitting ? "Computing..." : "Compute Total CO2e"}
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
    parameter: "OE",
    fullForm: "Operational emission",
    description:
      "Refer to the greenhouse gases released during the use of cloud resources, primarily from the electricity consumed by the data centers to power the servers, cooling, and other infrastructure.",
  },
  {
    parameter: "E",
    fullForm: "Embodied emission",
    description:
      "The greenhouse gases released during the manufacturing and disposal of the physical hardware (servers, storage devices, etc.) that make up the data center.",
  },
];
