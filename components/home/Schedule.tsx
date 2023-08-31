"use client";

import { ScheduleInterface } from "@/Interfaces";
import { Fragment, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

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
              <tr className="text-center bg-background">
                <td colSpan={5} className="font-bold">
                  <div className="p-1">
                    <div className="text-lg h-5">
                      {new Date(e?.startTime)
                        .toLocaleString("es-ES", {
                          weekday: "long",
                        })
                        .replace(/^\w/, (c) => c.toUpperCase())}{" "}
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="text-center bg-background">
                <td colSpan={5} className="font-bold">
                  <div className="p-1">
                    <div className="text-lg h-5">
                      {new Date(e?.startTime).toLocaleString(
                        "es-ES",
                        timeFormat
                      )}
                    </div>
                  </div>
                </td>
              </tr>

              <tr
                className={`text-center bg-primary-foreground ${
                  e?.state !== "unstarted" ? "cursor-pointer" : ""
                }`}
                onClick={() => {
                  if (e.state !== "unstarted")
                    router.push(`/match/${e?.match.id}`);
                }}
              >
                <td className="w-1/4">{e?.match?.teams[0].name}</td>
                <td className="w-1/5 text-center">
                  <div className="p-4">
                    <Suspense
                      fallback={<Skeleton className="h-24 w-24 rounded-full" />}
                    >
                      <img
                        src={e?.match?.teams[0].image}
                        alt={e?.match?.teams[0].name}
                        className="w-20"
                      ></img>
                    </Suspense>
                  </div>
                </td>
                <td className="font-bold w-[10%]">
                  {`${e?.match?.teams[0].result?.gameWins || 0} - ${
                    e?.match?.teams[1].result?.gameWins || 0
                  }`}
                </td>
                <td className="w-1/5 text-center">
                  <Suspense
                    fallback={<Skeleton className="h-24 w-24 rounded-full" />}
                  >
                    <img
                      src={e?.match?.teams[1].image}
                      alt={e?.match?.teams[1].name}
                      className="w-20"
                    ></img>
                  </Suspense>
                </td>

                <td className="w-1/4">{e?.match?.teams[1].name}</td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
