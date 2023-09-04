//"use client";

import ToolBar from "@/components/ToolBar";
import { SummonerInterface } from "@/Interfaces/Summoner";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
