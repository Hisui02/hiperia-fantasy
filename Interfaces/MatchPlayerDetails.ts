export interface MatchPlayerDetails {
  frames: [Frame];
}

interface Frame {
  rfc460Timestamp: string;
  participants: [Participant];
}

export interface Participant {
  abilities: ["Q" | "W" | "E" | "R"];
  abilityPower: number;
  armor: number;
  assists: number;
  attackDamage: number;
  attackSpeed: number;
  championDamageShare: number;
  creepScore: number;
  criticalChance: number;
  deaths: number;
  items: [number];
  killParticipation: number;
  kills: number;
  level: number;
  lifeSteal: number;
  magicResistance: number;
  participantId: number;
  perkMetadata: { styleId: number; subStyleId: number; perks: [] };
  tenacity: number;
  totalGoldEarned: number;
  wardsDestroyed: number;
  wardsPlaced: number;
}
