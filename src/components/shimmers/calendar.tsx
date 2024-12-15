import { days } from "@/constants/calendar";
import React from "react";

const CalendarShimmer = () => {
  return (
    <div key="shimmer-weekslider" className="flex flex-col">
      <div
        key="shimmer-days"
        className="flex justify-between w-[calc(100%-46px)] mx-auto"
      >
        {days.map((day) => (
          <div
            key={day}
            className={
              "text-xs w-[30px] h-[12px] mb-1 text-center  animate-pulse bg-gray-300 rounded-xl"
            }
          />
        ))}
      </div>
      <div
        key="shimmer-date"
        className="flex justify-between w-full items-center"
      >
        <div className=" rounded-full w-[16px] h-[15px] animate-pulse bg-gray-300" />
        {days.map((day) => (
          <div
            key={day}
            className="rounded-lg w-[30px] h-[44px]  animate-pulse bg-gray-300"
          />
        ))}
        <div className=" rounded-full w-[16px] h-[15px] animate-pulse bg-gray-300" />
      </div>
    </div>
  );
};

export default CalendarShimmer;
