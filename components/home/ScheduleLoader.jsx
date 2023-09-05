"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export default function ScheduleLoader() {
  const a = [1, 2, 3, 4, 5];

  return (
    <table className="w-full">
      <tbody>
        {a.map((e) => {
          return (
            <Fragment key={e}>
              <tr className="bg-background">
                <td colSpan={5}>
                  <div className="flex justify-center p-1">
                    <Skeleton className="h-5 w-72 rounded-full" />
                  </div>
                </td>
              </tr>
              <tr className="bg-background">
                <td colSpan={5}>
                  <div className="flex justify-center p-1">
                    <Skeleton className="h-5 w-72 rounded-full" />
                  </div>
                </td>
              </tr>

              <tr className="bg-primary-foreground">
                <td className="">
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-32 rounded-full" />
                  </div>
                </td>
                <td className="">
                  <div className="flex justify-center p-2">
                    <Skeleton className="h-24 w-24 rounded-full" />
                  </div>
                </td>
                <td className="">
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                </td>
                <td className="">
                  <div className="flex justify-center p-2">
                    <Skeleton className="h-24 w-24 rounded-full" />
                  </div>
                </td>

                <td className="">
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-32 rounded-full" />
                  </div>
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
