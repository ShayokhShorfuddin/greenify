/** biome-ignore-all lint/correctness/noChildrenProp: <Needed for Tanstack Form> */
"use client";

import { useForm } from "@tanstack/react-form";
import { co2 } from "@tgwf/co2";
import { useState } from "react";
import z from "zod";
import { ErrorInfo } from "@/shared/ErrorInfo";

export default function TransferEmission() {
  const [result, setResult] = useState<number | null>(null);

  const TransferEmissionSchema = z.object({
    bytes: z.number().min(0, { message: "Please enter the amount of bytes." }),
    model: z.enum(["swd", "1byte"]),
    method: z.enum(["perByte", "perVisit"]),
    isGreenHost: z.enum(["yes", "no"]),
  });

  const form = useForm({
    defaultValues: {
      bytes: 0,
      model: "swd",
      method: "perByte",
      isGreenHost: "no",
    },

    validators: {
      onChange: TransferEmissionSchema,
    },

    onSubmit: ({ value }) => {
      const { bytes, model, method, isGreenHost } = value;
      // Emission
      let emission: number;

      // Model
      let computationModel: co2;

      // Determine model
      if (model === "swd") {
        computationModel = new co2({ model: "swd", version: 4 });
      } else {
        computationModel = new co2({ model: "1byte" });
      }

      // Determine method
      if (method === "perByte") {
        emission = Number(
          computationModel.perByte(bytes, isGreenHost === "yes"),
        );
      } else {
        // method = perVisit (SWD only) (We disabled selecting perVisit for 1byte model in the select component)
        emission = Number(
          computationModel.perVisit(bytes, isGreenHost === "yes"),
        );
      }

      setResult(Number(emission.toFixed(6)));
    },
  });

  return (
    <div className="p-3 rounded bg-audit-card-background border border-audit-card-border">
      <p>Byte Transfer Emission</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="bytes"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Bytes (B)</p>
              <input
                type="number"
                step="any"
                name="bytes"
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

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-y-1">
            <p className="text-xs">Model</p>

            <form.Field
              name="model"
              children={(field) => (
                <>
                  <select
                    name="select-model"
                    value={field.state.value}
                    onChange={(e) => {
                      setResult(null);
                      field.handleChange(e.target.value);
                    }}
                    className="py-1 px-2 text-sm w-full border border-neutral-300 focus:outline-none focus:border-green-500 rounded"
                  >
                    <option value="swd">SWD</option>
                    <option value="1byte">1byte</option>
                  </select>

                  <ErrorInfo field={field} />
                </>
              )}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <p className="text-xs">Method</p>

            <form.Field
              name="method"
              children={(field) => (
                <>
                  <select
                    name="select-method"
                    value={field.state.value}
                    onChange={(e) => {
                      setResult(null);
                      field.handleChange(e.target.value);
                    }}
                    className="py-1 px-2 text-sm w-full border border-neutral-300 focus:outline-none focus:border-green-500 rounded"
                  >
                    <option value="perByte">perByte</option>

                    {/* perVisit is for SWD only! ⚠️ */}
                    <form.Subscribe
                      selector={(state) => state.values.model}
                      children={(model) =>
                        model === "swd" ? (
                          <option value="perVisit">perVisit</option>
                        ) : null
                      }
                    />
                  </select>

                  <ErrorInfo field={field} />
                </>
              )}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <p className="text-xs">Green Host</p>

            <form.Field
              name="isGreenHost"
              children={(field) => (
                <>
                  <select
                    name="select-isGreenHost"
                    value={field.state.value}
                    onChange={(e) => {
                      setResult(null);
                      field.handleChange(e.target.value);
                    }}
                    className="py-1 px-2 text-sm w-full border border-neutral-300 focus:outline-none focus:border-green-500 rounded"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>

                  <ErrorInfo field={field} />
                </>
              )}
            />
          </div>
        </div>

        {result !== null && (
          <div className="flex items-center justify-between mt-2.5">
            <p className="text-sm text-green-500">Result:</p>
            <p className="text-sm">{result} gCO2e</p>
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
                {isSubmitting ? "Computing..." : "Compute Transfer Emission"}
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
