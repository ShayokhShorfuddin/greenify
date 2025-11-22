import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Dashboard } from "../_components/Dashboard";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Greenify | Dashboard",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ projectID: string }>;
}) {
  // TODO: Design sidebar
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const { projectID } = await params;
  return <Dashboard projectID={projectID} />;
}
