import { days } from "@/constants/calendar";
import React from "react";

const CalendarShimmer = () => {
  return (
    <div key="shimmer-weekslider" className="flex flex-col">
      <div key="shimmer-days" className="flex justify-between w-full mx-auto">
        <div className="w-[24px] " />
        {days.map((day) => (
          <div
            key={day}
            className={
              "text-xs w-[33px] h-[16px] mb-1 text-center  animate-pulse bg-gray-300 rounded-xl"
            }
          />
        ))}
        <div className="w-[24px] animate-pulse" />
      </div>
      <div
        key="shimmer-date"
        className="flex justify-between w-full items-center"
      >
        <div className=" rounded-full w-[24px] h-[36px] animate-pulse bg-gray-300" />
        {days.map((day) => (
          <div
            key={day}
            className="rounded-lg w-[33px] h-[49px]  animate-pulse bg-gray-300"
          />
        ))}
        <div className=" rounded-full w-[24px] h-[36px] animate-pulse bg-gray-300" />
      </div>
    </div>
  );
};

export default CalendarShimmer;
