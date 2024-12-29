import { days } from "@/constants/calendar";
import React from "react";

const CalendarShimmer = () => {
  return (
    <div key="shimmer-weekslider" className="flex flex-col">
      <div key="shimmer-days" className="flex justify-between w-full mx-auto">
        {days.map((day) => (
          <div
            key={day}
            className={
              "text-xs w-[33px] h-[16px] mb-1 text-center  animate-pulse bg-gray-300 rounded-xl"
            }
          />
        ))}
      </div>
      <div
        key="shimmer-date"
        className="flex justify-between w-full items-center"
      >
        {days.map((day) => (
          <div
            key={day}
            className="rounded-lg w-[33px] h-[49px]  animate-pulse bg-gray-300"
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarShimmer;
