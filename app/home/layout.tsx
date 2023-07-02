//"use client";

import ToolBar from "@/components/ToolBar";
import { SummonerInterface } from "@/Interfaces/Summoner";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getSummonerData = async (sum: string): Promise<SummonerInterface> => {
  const res = await fetch(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sum}?api_key=${process.env.LOL_API_KEY}`,
    { cache: "force-cache" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);

  const summonerData = await getSummonerData(session?.user?.username as string);

  return (
    <>
      <ToolBar summoner={summonerData} />
      <main>{children}</main>
    </>
  );
}
