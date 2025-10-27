import type { Metadata } from "next";
import { SignUp } from "./_components/SignUp";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Greenify | Sign Up",
    description: "Create a new Greenify account.",
  };
}

export default function Page() {
  return (
    <main>
      <SignUp />
    </main>
  );
}
