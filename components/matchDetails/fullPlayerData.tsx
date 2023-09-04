"use client";

import ChampionImage from "./championImage";
import PlayerInventory from "./playerInventory";
import PlayerStats from "./playerStats";
import { Participant } from "@/Interfaces";

interface Player extends Participant {
  playername: string;
}

interface Props {
  Player: Player;
  PlayerInventory: [number];
  Champion: string;
  ClassName?: string;
  Team: string;
  Onclick: () => void;
}

export default function FullPlayerData(props: Props) {
  const manageOrientation = (teamColor: string) => {
    if (teamColor == "red") {
      return "flex-row-reverse";
    } else {
      return "flex-row";
    }
  };

  const potion = props.PlayerInventory.find((i) => {
    return i == 2138 || i == 2139 || i == 2140;
  });

  const inventory = props.PlayerInventory.filter((i) => {
    return i != potion;
  });

  // console.log(potion);

  return (
    <div
      className={`flex content-center justify-center flex-wrap ${manageOrientation(
        props.Team
      )} w-full ${props.ClassName}`}
      onClick={props.Onclick}
    >
      <ChampionImage Champion={props.Champion} Potion={potion} />
      <PlayerStats Player={props.Player} />
      <PlayerInventory
        PlayerInventory={inventory}
        ItemSize="11"
        Team={props.Team}
      />
    </div>
  );
}
