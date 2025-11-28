/** biome-ignore-all lint/correctness/noChildrenProp: <Needed for Tanstack Form> */
"use client";

import { useForm } from "@tanstack/react-form";
import { useRef, useState } from "react";
import z from "zod";
import { ErrorInfo } from "@/shared/ErrorInfo";
import Equation from "./Equation";

export default function UnitConverter() {
  const [result, setResult] = useState<number | null>(null);
  const selectFromRef = useRef<HTMLSelectElement | null>(null);
  const selectToRef = useRef<HTMLSelectElement | null>(null);

  const UnitConverterSchema = z.object({
    amount: z.number().min(0, { message: "Please enter an amount." }),
  });

  const form = useForm({
    defaultValues: {
      amount: 0,
    },

    validators: {
      onChange: UnitConverterSchema,
    },

    onSubmit: ({ value }) => {
      const { amount } = value;
      const fromUnit = selectFromRef.current?.value;
      const toUnit = selectToRef.current?.value;

      // First, convert the input amount to grams (base unit)
      let amountInGrams: number;

      if (fromUnit === "g") {
        amountInGrams = amount;
      } else if (fromUnit === "kg") {
        amountInGrams = convertKilogramsToGrams(amount);
      } else {
        // fromUnit === "t"
        amountInGrams = convertTonsToGrams(amount);
      }

      // Then, convert grams to the desired unit
      let convertedAmount: number;

      if (toUnit === "g") {
        convertedAmount = amountInGrams;
      } else if (toUnit === "kg") {
        convertedAmount = convertGramsToKilograms(amountInGrams);
      } else {
        // toUnit === "t"
        convertedAmount = convertGramsToTons(amountInGrams);
      }

      setResult(Number(convertedAmount.toFixed(8)));
    },
  });

  return (
    <div className="p-3 rounded bg-audit-card-background border border-audit-card-border">
      <p>Unit Converter</p>

      <Equation
        equation={[
          "g = gram (base unit)",
          "1 kg = 1,000 g",
          "1 t = 1,000,000 g",
        ]}
        equationName="Conversion"
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
          name="amount"
          children={(field) => (
            <>
              <p className="mt-2.5 text-xs">Amount</p>
              <input
                type="number"
                step={"any"}
                name="amount"
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

        <div className="mt-2.5 flex items-center justify-between gap-x-4">
          <div className="flex flex-col gap-y-1">
            <p className="text-xs">From</p>

            <select
              name="select-from"
              ref={selectFromRef}
              defaultValue="g"
              className="py-1 px-2 text-sm w-full border border-neutral-300 focus:outline-none focus:border-green-500 rounded"
            >
              <option value="g">Gram (g)</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="t">Metric Ton (t)</option>
            </select>
          </div>

          <div className="flex flex-col gap-y-1">
            <p className="text-xs">To</p>

            <select
              name="select-to"
              ref={selectToRef}
              defaultValue="kg"
              className="py-1 px-2 text-sm w-full border border-neutral-300 focus:outline-none focus:border-green-500 rounded"
            >
              <option value="g">Gram (g)</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="t">Metric Ton (t)</option>
            </select>
          </div>
        </div>

        {result !== null && (
          <div className="flex items-center justify-between mt-2.5">
            <p className="text-sm text-green-500">Result:</p>

            <p className="text-sm">
              {result} {selectToRef.current?.value}
            </p>
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
                {isSubmitting ? "Computing..." : "Convert Unit"}
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
    parameter: "A",
    fullForm: "Amount",
    description:
      "The numerical value representing the quantity to be converted.",
  },
];

function convertGramsToKilograms(grams: number): number {
  // 1 kilogram = 1,000 grams
  return grams / 1000;
}

function convertGramsToTons(grams: number): number {
  // 1 metric ton = 1,000,000 grams
  return grams / 1000000;
}

function convertKilogramsToGrams(kilograms: number): number {
  // 1 kilogram = 1,000 grams
  return kilograms * 1000;
}

function convertTonsToGrams(tons: number): number {
  // 1 metric ton = 1,000,000 grams
  return tons * 1000000;
}
