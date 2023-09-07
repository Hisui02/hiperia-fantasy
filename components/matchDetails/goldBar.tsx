"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Bar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-blue-500 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

interface Props {
  blueTeamGold: number;
  redTeamGold: number;
}

export default function GoldBar(props: Props) {
  const { blueTeamGold, redTeamGold } = props;

  const totalGold = blueTeamGold + redTeamGold;
  const blueValue = (blueTeamGold * 100) / totalGold;
  const redValue = (redTeamGold * 100) / totalGold;

  return (
    <div className="w-full relative">
      <div className="peer flex absolute w-full text-xs hover:text-lg hover:top-2 z-20 transition-all duration-300 opacity-0 hover:opacity-100">
        <div
          className="text-center font-bold"
          style={{ width: `${100 - redValue}%` }}
        >
          {blueTeamGold.toLocaleString("es-ES")}
        </div>
        <div
          className="font-bold text-center"
          style={{ width: `${100 - blueValue}%` }}
        >
          {redTeamGold.toLocaleString("es-ES")}
        </div>
      </div>

      <Bar
        value={blueValue}
        className="bg-red-500 peer-hover:h-10 peer-hover:z-10 transition-all duration-300"
      />
    </div>
  );
}
