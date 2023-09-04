"use client";

import Loading from "@/components/Charging";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function landing() {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return <Loading />;
  }

  redirect("/home");
}
