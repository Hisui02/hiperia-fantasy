import { ScheduleDataInterface } from ".";

export interface HomeLoaderInterface {
  data: DataInterface;
}

export interface DataInterface {
  schedule: ScheduleDataInterface;
  proPlayers: any;
  classification: any;
  topPlayers: any;
}
