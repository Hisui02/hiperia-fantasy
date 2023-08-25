import { Participant } from "@/Interfaces";

interface ParticipantName extends Participant {
  playername: string;
}

export default function PlayerStats(props: { Player: ParticipantName }) {
  const player = props.Player;

  return (
    <div className="xl:w-2/5 flex flex-col items-center justify-center text-gray-300 text-lg ml-1 mr-1">
      <span>{player.playername}</span>
      <span>{`${player.kills}/${player.deaths}/${player.assists}     ${player.creepScore} cs`}</span>
    </div>
  );
}
