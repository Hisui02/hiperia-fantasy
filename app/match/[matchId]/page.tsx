"use client";

import { MatchData } from "@/Interfaces";
import { MatchPlayerDetails } from "@/Interfaces";
import ChampionImage from "@/components/matchDetails/championImage";
import PlayerInventory from "@/components/matchDetails/playerInventory";
import PlayerStats from "@/components/matchDetails/playerStats";
import FullPlayerData from "@/components/matchDetails/fullPlayerData";

const getMatchDetails = async (matchId: string) => {
  const hoy = new Date(); //Añadiendo el startingTime nos aseguramos los últimos datos posibles
  hoy.setSeconds(0, 0);
  hoy.setMinutes(hoy.getMinutes() - 1);

  const gameId = BigInt(matchId) + BigInt(1); //Calculo el gameId como el matchId+1

  const res = await fetch(
    `https://feed.lolesports.com/livestats/v1/window/${gameId.toString()}?startingTime=${hoy.toISOString()}`
  );
  if (!res.ok) {
    throw new Error(`Could not fetch match details.`);
  } else {
    return res.json();
  }
};

const getPlayersDetails = async (matchId: string) => {
  const hoy = new Date(); //Añadiendo el startingTime nos aseguramos los últimos datos posibles
  hoy.setSeconds(0, 0);
  hoy.setMinutes(hoy.getMinutes() - 1);

  const gameId = BigInt(matchId) + BigInt(1); //Calculo el gameId como el matchId+1

  const res = await fetch(
    `https://feed.lolesports.com/livestats/v1/details/${gameId.toString()}?startingTime=${hoy.toISOString()}&participantIds=1_2_3_4_5_6_7_8_9_10`
  );
  if (!res.ok) {
    throw new Error(`Could not fetch palyers details.`);
  } else {
    return res.json();
  }
};

interface Params {
  params: {
    matchId: string;
  };
}

export default async function Page({ params }: Params) {
  // const matchDetails: MatchData = await getMatchDetails(params.matchId);

  const matchDetailsData: Promise<MatchData> = getMatchDetails(params.matchId);
  const playersDetailsData: Promise<MatchPlayerDetails> = getPlayersDetails(
    params.matchId
  );
  let [matchDetails, playerDetails] = await Promise.all([
    matchDetailsData,
    playersDetailsData,
  ]);

  // console.log(matchDetails);
  // console.log(playerDetails);

  const lastMatchDetailsFrameIndex = matchDetails.frames.length - 1;
  const lastPlayerDetailsFrameIndex = playerDetails.frames.length - 1;

  const playerInventory =
    playerDetails.frames[lastPlayerDetailsFrameIndex].participants[0].items;

  // console.log(playerInventory);
  const player2 = {
    playername:
      matchDetails.gameMetadata.blueTeamMetadata.participantMetadata[0]
        .summonerName,
    ...playerDetails.frames[lastPlayerDetailsFrameIndex].participants[0],
  };

  const championId =
    matchDetails.gameMetadata.blueTeamMetadata.participantMetadata[0]
      .championId;

  // matchDetails.frames[lastMatchDetailsFrameIndex].blueTeam.participants

  matchDetails.frames[lastMatchDetailsFrameIndex].blueTeam.participants.map(
    (p) => {
      const player = {
        playername:
          matchDetails.gameMetadata.blueTeamMetadata.participantMetadata.find(
            (j) => {
              return j.participantId === p.participantId;
            }
          )?.summonerName,
        ...playerDetails.frames[lastPlayerDetailsFrameIndex].participants.find(
          (j) => {
            return j.participantId === p.participantId;
          }
        ),
      };
      console.log(player);
      // console.log(player2);

      return (
        <FullPlayerData
          Player={player}
          PlayerInventory={playerInventory}
          Champion={championId}
        />
        // <div>a</div>
      );
    }
  );

  // <FullPlayerData
  //       Player={player}
  //       PlayerInventory={playerInventory}
  //       Champion={championId}
  //     />
}
