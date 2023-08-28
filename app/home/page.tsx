import GetSchedule from "@/components/home/GetSchedule";
import { Suspense } from "react";
import ScheduleLoader from "@/components/home/ScheduleLoader";

export default function Page() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 m-5">
      <div className="bg-gray-200 rounded-xl">
        <Suspense fallback={<ScheduleLoader />}>
          <GetSchedule />
        </Suspense>
      </div>
      <div className="col-span-2 grid grid-rows-2 gap-4">
        <div className="bg-gray-200 rounded-xl">a</div>
        <div className="bg-gray-200 rounded-xl">a</div>
      </div>
    </div>
  );
}
