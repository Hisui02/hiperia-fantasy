import { ScheduleInterface } from "@/Interfaces";
import Schedule from "./Schedule";

const getSchedule = async (): Promise<ScheduleInterface> => {
  await new Promise((r) =>
    setTimeout(
      r,

      3000
    )
  );

  const res = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=es-ES&leagueId=98767991302996019`,
    {
      headers: {
        accept: "*/*",
        "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
      },
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    throw new Error(`Could not fetch schedule.`);
  } else {
    return res.json();
  }
};

export default async function GetSchedule() {
  const schedule = await getSchedule();

  return <Schedule Schedule={schedule} />;
}
