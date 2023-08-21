import { Participant } from "@/Interfaces";

interface ParticipantName extends Participant {
  playername: string;
}

export default function PlayerStats(props: {
  Player: ParticipantName;
  ClassName?: string;
}) {
  const player = props.Player;

  return (
    <div className={`w-fit ${props.ClassName}`}>
      <span>{player.playername}</span>
      <span>{`${player.kills}/${player.deaths}/${player.assists}     ${player.creepScore} cs`}</span>
    </div>
  );
}
