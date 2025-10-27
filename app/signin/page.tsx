import type { Metadata } from "next";
import { SignIn } from "./_components/SignIn";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Greenify | Sign In",
    description: "Sign in to your Greenify account.",
  };
}

export default function Page() {
  return (
    <main>
      <SignIn />
    </main>
  );
}
