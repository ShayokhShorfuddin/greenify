import type { AnyFieldApi } from "@tanstack/react-form";

export function ErrorInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched &&
      !field.state.meta.isValid &&
      field.state.meta.errors.length > 0 ? (
        <p className="text-red-500 text-sm">
          {field.state.meta.errors[0].message}
        </p>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
