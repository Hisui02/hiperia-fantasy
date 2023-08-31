import { Participant } from "@/Interfaces";

interface ParticipantName extends Participant {
  playername: string;
}

export default function PlayerStats(props: { Player: ParticipantName }) {
  const player = props.Player;

  return (
    <div className="xl:w-2/5 p-1 flex flex-col items-center justify-center text-primary text-lg">
      <span className="font-bold">{player.playername}</span>
      <span>{`${player.kills}/${player.deaths}/${player.assists}     ${player.creepScore} cs`}</span>
    </div>
  );
}
