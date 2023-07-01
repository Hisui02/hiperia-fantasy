"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
export default function landing() {
  const { data: session, status } = useSession({ required: true });
  //console.log(session);

  if (status === "loading") {
    return <>Loading...</>;
  }

  redirect("/home");
}
