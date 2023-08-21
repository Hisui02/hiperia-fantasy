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
}

export default function FullPlayerData(props: Props) {
  const teamColor: string = "red";

  const manageOrientation = (teamColor: string) => {
    if (teamColor == "red") {
      return "flex-row";
    } else {
      return "flex-row-reverse";
    }
  };

  return (
    <div
      className={`bg-red-800 flex ${manageOrientation(
        "red"
      )} items-center w-fit h-fit`}
    >
      <ChampionImage Champion={props.Champion} ClassName="w-16 inline" />
      <PlayerStats
        Player={props.Player}
        ClassName="m-2 flex flex-col items-center"
      />
      <PlayerInventory
        PlayerInventory={props.PlayerInventory}
        ClassName="w-8"
      />
    </div>
  );
}
