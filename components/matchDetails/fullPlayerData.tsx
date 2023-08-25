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
}

export default function FullPlayerData(props: Props) {
  const manageOrientation = (teamColor: string) => {
    if (teamColor == "red") {
      return "flex-row-reverse";
    } else {
      return "flex-row";
    }
  };

  return (
    <div
      className={`flex content-center justify-center flex-wrap ${manageOrientation(
        props.Team
      )} w-full ${props.ClassName}`}
    >
      <ChampionImage Champion={props.Champion} />
      <PlayerStats Player={props.Player} />
      <PlayerInventory
        PlayerInventory={props.PlayerInventory}
        ItemSize="10"
        Team={props.Team}
      />
    </div>
  );
}
