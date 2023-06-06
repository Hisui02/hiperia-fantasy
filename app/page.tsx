import Schedule from "@/components/home/Schedule";
import { ScheduleInterface } from "@/Interfaces";

const getSchedule = async (): Promise<ScheduleInterface> => {
  const response = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=es-ES&leagueId=105266074488398661`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "sec-ch-ua":
          '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
      },
      referrer: "https://lolesports.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
      next: { revalidate: 600 },
    }
  );
  if (!response.ok) {
    throw new Error(`Could not fetch schedule.`);
  } else {
    return response.json();
  }
};

type props = {
  schedule: ScheduleInterface;
};

export default async function Home(props: props) {
  const schedule = await getSchedule();

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 m-5">
      <div className="bg-gray-200 rounded-xl">
        <Schedule schedule={schedule} />
      </div>
      <div className="col-span-2 grid grid-rows-2 gap-4 ">
        <div className="bg-gray-200 rounded-xl">
          <p>a</p>
        </div>
        <div className="bg-gray-200 rounded-xl">
          <p>a</p>
        </div>
      </div>
    </div>
  );
}