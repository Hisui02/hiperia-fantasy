"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { matchId: string; gameId: string };
}) {
  // console.log(params);
  const router = useRouter();

  const nextGameId = BigInt(params.gameId) + BigInt(1);
  const previousGameId = BigInt(params.gameId) - BigInt(1);

  const hoy = new Date(); //Añadiendo el startingTime nos aseguramos los últimos datos posibles
  hoy.setSeconds(0, 0);
  hoy.setMinutes(hoy.getMinutes() - 1);

  const getMatchDetails = async (gameId: string) => {
    const res = await fetch(
      `https://feed.lolesports.com/livestats/v1/window/${gameId.toString()}?startingTime=${hoy.toISOString()}`,
      { next: { revalidate: 0 } }
    );

    if (res.ok && res.status != 204) {
      return true;
    } else return false;
  };

  const nextGameAvailable = await getMatchDetails(
    nextGameId as unknown as string
  );
  const previousGameAvailable = await getMatchDetails(
    previousGameId as unknown as string
  );

  const manageClasses = (direction: string) => {
    if (direction == "next" && !nextGameAvailable) {
      return "hidden";
    }
    if (direction == "previous" && !previousGameAvailable) {
      return "hidden";
    }
    return "";
  };

  // console.log(previousGameAvailable, nextGameAvailable);
  // console.log(previousGameId, nextGameId);

  return (
    <>
      <Link
        className={`bg-secondary text-primary sticky top-[50vh] p-2 pb-3 rounded font-extrabold cursor-pointer inline-block hover:scale-150 hover:ml-3 duration-100  ${manageClasses(
          "previous"
        )}`}
        href={`/match/${params.matchId}/game/${previousGameId}`}
        prefetch={false}
        replace={true}
      >
        &lt;
      </Link>
      <Link
        className={`bg-secondary text-primary sticky top-[50vh] left-[100vw] p-2 pb-3 rounded font-extrabold cursor-pointer inline-block hover:scale-150 hover:mr-3 duration-100 ${manageClasses(
          "next"
        )}`}
        href={`/match/${params.matchId}/game/${nextGameId}`}
        prefetch={false}
        replace={true}
      >
        &gt;
      </Link>

      {children}
    </>
  );
}

export default Layout;
