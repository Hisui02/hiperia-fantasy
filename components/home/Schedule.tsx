"use client";

import { ScheduleInterface } from "@/Interfaces";
import { Fragment } from "react";
import { useRouter } from "next/navigation";

type Props = {
  Schedule: ScheduleInterface;
};

export default function Schedule(props: Props) {
  const router = useRouter();

  const eventsArray = props.Schedule.data.schedule.events
    .reverse()
    .filter((e) => {
      return e.type == "match";
    });
  const firstMatchIndex = eventsArray.findIndex((e) => {
    return new Date(e.startTime).getTime() < new Date().getTime();
  });

  let eventsdata = [];

  if (eventsArray[firstMatchIndex - 1]) {
    eventsdata = [
      eventsArray[firstMatchIndex - 1],
      eventsArray[firstMatchIndex],
      eventsArray[firstMatchIndex + 1],
      eventsArray[firstMatchIndex + 2],
      eventsArray[firstMatchIndex + 3],
    ];
  } else {
    eventsdata = [
      eventsArray[firstMatchIndex],
      eventsArray[firstMatchIndex + 1],
      eventsArray[firstMatchIndex + 2],
      eventsArray[firstMatchIndex + 3],
      eventsArray[firstMatchIndex + 4],
    ];
  }
  const events = eventsdata;

  // console.log(events);

  return (
    <table className="w-full">
      <tbody>
        {events.map((e) => {
          const timeFormat: Intl.DateTimeFormatOptions = {
            month: undefined,
            day: undefined,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZoneName: undefined,
            timeZone: undefined,
          };
          return (
            <Fragment key={e?.startTime}>
              <tr className="text-center bg-black text-white">
                <td colSpan={5} className="font-bold text-lg">
                  {new Date(e?.startTime)
                    .toLocaleString("es-ES", {
                      weekday: "long",
                    })
                    .replace(/^\w/, (c) => c.toUpperCase())}{" "}
                </td>
              </tr>

              <tr className="text-center bg-black text-white">
                <td colSpan={5} className="font-bold text-lg">
                  {new Date(e?.startTime).toLocaleString("es-ES", timeFormat)}
                </td>
              </tr>

              <tr
                className={`text-center bg-blue-950  ${
                  e?.state !== "unstarted" ? "cursor-pointer" : ""
                }`}
                onClick={() => {
                  if (e.state !== "unstarted")
                    router.push(`/match/${e?.match.id}`);
                }}
              >
                <td className="text-white w-1/4">{e?.match?.teams[0].name}</td>
                <td className="w-1/5 text-center">
                  <img
                    src={e?.match?.teams[0].image}
                    alt={e?.match?.teams[0].name}
                    className="w-20"
                  ></img>
                </td>
                <td className="text-white font-bold w-[10%]">
                  {`${e?.match?.teams[0].result?.gameWins || 0} - ${
                    e?.match?.teams[1].result?.gameWins || 0
                  }`}
                </td>
                <td className="w-1/5 text-center">
                  <img
                    src={e?.match?.teams[1].image}
                    alt={e?.match?.teams[1].name}
                    className="w-20"
                  ></img>
                </td>

                <td className="text-white w-1/4">{e?.match?.teams[1].name}</td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
