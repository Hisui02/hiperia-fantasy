"use client";

import {
  MatchData,
  MatchPlayerDetails,
  Participant,
  StyleRuneInterface,
} from "@/Interfaces";

import FullPlayerData from "./fullPlayerData";
import PlayerRunes from "./playerRunes";

import { useState } from "react";

interface Props {
  MatchDetails: MatchData;
  PlayerDetails: MatchPlayerDetails;
  PerksData: StyleRuneInterface[];
}

export default function MatchDetails(props: Props) {
  const { MatchDetails: matchDetails, PlayerDetails: playerDetails } = props;
  const lastMatchDetailsFrameIndex = matchDetails.frames.length - 1;
  const lastPlayerDetailsFrameIndex = playerDetails.frames.length - 1;
  // const tempPerks =
  //   playerDetails.frames[lastPlayerDetailsFrameIndex].participants[7]
  //     .perkMetadata;
  const [selectedPlayer, setSelectedPlayer] = useState<undefined | Participant>(
    undefined
  );

  const clickHandler = (player: Participant) => {
    setSelectedPlayer(player);
  };

  const NoRunesSelectedMessage = () => {
    return (
      <div className="text-center">Select a player to see runes details</div>
    );
  };
  // console.log(props.PerksData);
  // console.log(selectedPlayer);

  return (
    <div className="grid grid-cols-3 gap-4 pl-10 pr-10">
      <div className="lg:col-span-2 col-span-3">
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-background rounded-xl p-5 w-full">
            <div className="lg:border-r-[1px] border-secondary-foreground">
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
                    key={player.participantId}
                    Player={player}
                    PlayerInventory={playerInventory}
                    Champion={championId}
                    ClassName={`p-2 cursor-pointer ${
                      p.participantId % 5 != 0 &&
                      "border-b-2 border-secondary-foreground"
                    }`}
                    Team="blue"
                    Onclick={() => {
                      clickHandler(player);
                    }}
                  />
                );
              })}
            </div>
            <div className="lg:border-l-[1px] border-secondary-foreground">
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
                    key={player.participantId}
                    Player={player}
                    PlayerInventory={playerInventory}
                    Champion={championId}
                    ClassName={`p-2 cursor-pointer ${
                      p.participantId % 5 != 0 &&
                      "border-b-2 border-secondary-foreground"
                    }`}
                    Team="red"
                    Onclick={() => {
                      clickHandler(player);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-3 bg-background rounded-xl p-5">
        {selectedPlayer ? (
          <PlayerRunes
            PerkMetadata={selectedPlayer.perkMetadata}
            Perks={props.PerksData}
          />
        ) : (
          <NoRunesSelectedMessage />
        )}
      </div>
    </div>
  );
}
