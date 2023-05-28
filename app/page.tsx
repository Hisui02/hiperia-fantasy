import Schedule from "@/components/home/Schedule";
import { ScheduleInterface } from "@/Interfaces";

const getSchedule = async (): Promise<ScheduleInterface> => {
  var Headers = {
    "x-api-key": process.env.LOLESPORTS_API_KEY as string,
    "Content-Type": "application/json",
  };

  var requestOptions = {
    method: "GET",
    headers: Headers,
  };

  const response = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=es-ES&leagueId=${process.env.LOLESPORTS_LEAGUE_ID}`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error("Could not fetch schedule.");
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
