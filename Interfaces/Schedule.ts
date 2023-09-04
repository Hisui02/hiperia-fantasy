export interface ScheduleInterface {
  data: subData;
}
interface subData {
  schedule: ScheduleDataInterface;
}

export interface ScheduleDataInterface {
  pages: Pages;
  events: Event[];
}

interface Pages {
  older: string;
  newer: any;
}

export interface Event {
  startTime: string;
  state: "unstarted" | "completed" | "inProgress";
  type: string;
  blockName: string;
  league: League;
  match: Match;
}

interface League {
  name: string;
  slug: string;
}

interface Match {
  id: string;
  flags: string[];
  teams: Team[];
  strategy: Strategy;
}

interface Team {
  name: string;
  code: string;
  image: string;
  result?: Result;
  record?: Record;
}

interface Result {
  outcome?: string;
  gameWins: number;
}

interface Record {
  wins: number;
  losses: number;
}

interface Strategy {
  type: string;
  count: number;
}
