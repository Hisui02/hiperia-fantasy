import { MatchData } from "@/Interfaces";
import { MatchPlayerDetails } from "@/Interfaces";
import FullPlayerData from "@/components/matchDetails/fullPlayerData";

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

interface Params {
  params: {
    gameId: string;
  };
}

export default async function Page({ params }: Params) {
  // const gameId = BigInt(params.matchId) + BigInt(2); //Calculo el gameId como el matchId+Numero de Game

  const matchDetailsData: Promise<MatchData> = getMatchDetails(
    params.gameId as unknown as string
  );
  const playersDetailsData: Promise<MatchPlayerDetails> = getPlayersDetails(
    params.gameId as unknown as string
  );

  const [matchDetails, playerDetails] = await Promise.all([
    matchDetailsData,
    playersDetailsData,
  ]);

  // console.log(matchDetails);
  // console.log(playerDetails);

  const lastMatchDetailsFrameIndex = matchDetails.frames.length - 1;
  const lastPlayerDetailsFrameIndex = playerDetails.frames.length - 1;

  return (
    <div className="flex justify-center p-10 xl:w-3/5 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-900 rounded-xl p-5 w-full">
        <div className="border-r-[1px] border-black">
          {matchDetails.frames[
            lastMatchDetailsFrameIndex
          ].blueTeam.participants.map((p) => {
            //Mapeo el player
            const player = {
              playername:
                matchDetails.gameMetadata.blueTeamMetadata.participantMetadata.find(
                  (j) => {
                    return j.participantId === p.participantId;
                  }
                )!.summonerName,
              ...playerDetails.frames[
                lastPlayerDetailsFrameIndex
              ].participants.find((j) => {
                return j.participantId === p.participantId;
              })!,
            };

            //Mapeo el inventario
            const playerInventory = playerDetails.frames[
              lastPlayerDetailsFrameIndex
            ].participants.find((j) => {
              return j.participantId === p.participantId;
            })!.items;

            //Mapeo el champion
            const championId =
              matchDetails.gameMetadata.blueTeamMetadata.participantMetadata.find(
                (j) => {
                  return j.participantId === p.participantId;
                }
              )!.championId;

            return (
              <FullPlayerData
                Player={player}
                PlayerInventory={playerInventory}
                Champion={championId}
                ClassName={`p-2 ${
                  p.participantId % 5 != 0 && "border-b-2 border-black"
                }`}
                Team="blue"
              />
            );
          })}
        </div>
        <div className="border-l-[1px] border-black">
          {matchDetails.frames[
            lastMatchDetailsFrameIndex
          ].redTeam.participants.map((p) => {
            //Mapeo el player
            const player = {
              playername:
                matchDetails.gameMetadata.redTeamMetadata.participantMetadata.find(
                  (j) => {
                    return j.participantId === p.participantId;
                  }
                )!.summonerName,
              ...playerDetails.frames[
                lastPlayerDetailsFrameIndex
              ].participants.find((j) => {
                return j.participantId === p.participantId;
              })!,
            };

            //Mapeo el inventario
            const playerInventory = playerDetails.frames[
              lastPlayerDetailsFrameIndex
            ].participants.find((j) => {
              return j.participantId === p.participantId;
            })!.items;

            //Mapeo el champion
            const championId =
              matchDetails.gameMetadata.redTeamMetadata.participantMetadata.find(
                (j) => {
                  return j.participantId === p.participantId;
                }
              )!.championId;

            return (
              <FullPlayerData
                Player={player}
                PlayerInventory={playerInventory}
                Champion={championId}
                ClassName={`p-2 ${
                  p.participantId % 5 != 0 && "border-b-2 border-black"
                }`}
                Team="red"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
