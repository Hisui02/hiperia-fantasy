import {
  MatchData,
  StyleRuneInterface,
  ScheduleInterface,
  MatchPlayerDetails,
} from "@/Interfaces";
import MatchDetails from "@/components/matchDetails/matchDetails";
import { Suspense } from "react";

const hoy = new Date(); //Añadiendo el startingTime nos aseguramos los últimos datos posibles
hoy.setSeconds(0, 0);
hoy.setMinutes(hoy.getMinutes() - 1);

const getMatchDetails = async (gameId: string) => {
  const res = await fetch(
    `https://feed.lolesports.com/livestats/v1/window/${gameId.toString()}?startingTime=${hoy.toISOString()}`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) {
    throw new Error(`Could not fetch match details.`);
  } else {
    return res.json();
  }
};

const getPlayersDetails = async (gameId: string) => {
  const res = await fetch(
    `https://feed.lolesports.com/livestats/v1/details/${gameId.toString()}?startingTime=${hoy.toISOString()}&participantIds=1_2_3_4_5_6_7_8_9_10`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) {
    throw new Error(`Could not fetch players details.`);
  } else {
    return res.json();
  }
};

const getPerks = async () => {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.15.1/data/es_ES/runesReforged.json"
  );
  if (!res.ok) {
    throw new Error(`Could not fetch runes data.`);
  } else {
    return res.json();
  }
};

interface Params {
  params: {
    gameId: string;
  };
}

export default async function Page({ params }: Params) {
  const matchDetailsData: Promise<MatchData> = getMatchDetails(
    params.gameId as unknown as string
  );
  const playersDetailsData: Promise<MatchPlayerDetails> = getPlayersDetails(
    params.gameId as unknown as string
  );

  const perksData: Promise<StyleRuneInterface[]> = getPerks();

  const [matchDetails, playerDetails, perks] = await Promise.all([
    matchDetailsData,
    playersDetailsData,
    perksData,
  ]);

  // console.log(matchDetails);
  // console.log(playerDetails);
  // console.log(perks);

  return (
    <Suspense>
      <MatchDetails
        MatchDetails={matchDetails}
        PlayerDetails={playerDetails}
        PerksData={perks}
      />
    </Suspense>
  );
}
