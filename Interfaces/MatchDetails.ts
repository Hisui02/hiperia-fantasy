interface Participant {
  championId: string;
  esportsPlayerId: string;
  participantId: number;
  role: "top" | "jungle" | "mid" | "bottom" | "support";
  summonerName: string;
}

interface TeamMetadata {
  esportsTeamId: string;
  participantMetadata: [Participant];
}

interface GameMetadata {
  blueTeamMetadata: TeamMetadata;
  patchVersion: string;
  redTeamMetadata: TeamMetadata;
}

interface Frame {
  blueTeam: Team;
  gameState: string;
  redTeam: Team;
  rfc460Timestamp: string;
}

interface Team {
  barons: number;
  dragons: [];
  inhibitors: number;
  participants: [ParticipantFrame];
  totalGold: number;
  totalKills: number;
  towers: number;
}

interface ParticipantFrame {
  assists: number;
  creepScore: number;
  currentHealth: number;
  deaths: number;
  kills: number;
  level: number;
  maxHealth: number;
  participantId: number;
  totalGold: number;
}

export interface MatchData {
  esportsGameId: string;
  esportsMatchId: string;
  frames: Frame[];
  gameMetadata: GameMetadata;
}
