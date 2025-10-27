/** biome-ignore-all lint/correctness/noChildrenProp: <needed for Tanstack form> */
"use client";

import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import getAuthErrorMessage from "@/app/_utils/auth-error-messages";
import { authClient } from "@/lib/auth-client";
import eye from "@/public/svgs/eye.svg";
import eye_closed from "@/public/svgs/eye-closed.svg";
import Google from "@/public/svgs/google.svg";
import guy_working_on_his_laptop2 from "@/public/svgs/guy-working-on-laptop2.svg";

const signInSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address." })
    .max(40, { message: "Email cannot be longer than 40 characters." })
    .nonempty({ message: "Please enter your email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(30, { message: "Password should not be longer than 30 characters." })
    .nonempty({ message: "Please enter a password." }),
});

export function SignIn() {
  const [authErrorMessage, setAuthErrorMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onChange: signInSchema,
    },

    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      // If there was an error
      if (error) {
        if (error?.code) {
          setAuthErrorMessage(getAuthErrorMessage(error?.code));
          return;
        }

        // An error occurred but there is no code? This could be due to change in better-auth library. For this situation, we will be returning a generic error message and call sentry

        // TODO: call sentry
        setAuthErrorMessage(
          "We have encountered a strange error. Please try again later.",
        );
        return;
      }

      // If no error, redirect to dashboard
      redirect("/dashboard");
    },
  });

  return (
    <section className="flex items-center justify-center h-svh font-sans px-4">
      <div className="flex w-full max-w-[34rem] items-center justify-center md:justify-between">
        <div className="flex flex-col items-center max-w-[15rem]">
          {/* TODO: replace with logo when created */}
          <p className="text-lg text-green-500">Greenify</p>

          <form className="w-full">
            {/* TODO: Implement Google Sign-In */}
            <button
              type="button"
              className="flex gap-x-3 justify-center items-center text-nowrap w-full border border-green-500  text-neutral-800 font-medium mt-6 py-2 rounded-lg hover:cursor-pointer select-none"
            >
              <Image src={Google} alt="icon" className="size-5" />
              <span className="text-sm">Continue with Google</span>
            </button>
          </form>

          <div className="flex items-center gap-x-3 w-full mt-3">
            <div className="h-[0.5px] w-full bg-neutral-200" />
            <p className="text-neutral-800 text-sm text-nowrap">or use email</p>
            <div className="h-[0.5px] w-full bg-neutral-200" />
          </div>

          <form
            className="flex flex-col w-full gap-y-2 mt-3 text-sm"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="email"
              children={(field) => (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-green-500 placeholder-neutral-400"
                  />

                  <ErrorInfo field={field} />
                </>
              )}
            />

            <form.Field
              name="password"
              children={(field) => {
                return (
                  <PasswordField
                    field={field}
                    authErrorMessage={authErrorMessage}
                  />
                );
              }}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="relative bg-green-500 py-1 px-3 rounded text-white text-sm font-medium select-none transition-all duration-50 ease-in-out hover:cursor-pointer shadow-[0_3px_0_0_#008236] xs:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_0_0_0_#008236] mt-2"
                >
                  {isSubmitting ? "Hashing..." : "Sign In"}
                </button>
              )}
            />
          </form>

          <p className="text-sm text-nowrap mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </div>

        <Image
          src={guy_working_on_his_laptop2}
          alt="A guy working on his laptop."
          className="hidden md:block size-50"
        />
      </div>
    </section>
  );
}

function PasswordField({
  field,
  authErrorMessage,
}: {
  field: AnyFieldApi;
  authErrorMessage: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="w-full flex">
        <input
          autoComplete="off"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          className="px-4 py-2 rounded-l-lg border border-neutral-300 focus:outline-none focus:border-green-500 w-full"
        />

        <button
          type="button"
          className="p-2 border border-neutral-300 focus:outline-none focus:border-green-500 rounded-r-lg hover:cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Image
            src={showPassword ? eye_closed : eye}
            alt={showPassword ? "Hide password" : "Show password"}
            className="size-4.5"
          />

          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </button>
      </div>

      <ErrorInfo field={field} />

      {/* Auth error */}
      {authErrorMessage !== "" ? (
        <p className="text-red-500 text-sm">{authErrorMessage}</p>
      ) : null}
    </>
  );
}

function ErrorInfo({ field }: { field: AnyFieldApi }) {
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
