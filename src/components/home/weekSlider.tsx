"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  getPartsOfDate,
  getStartOfTheWeek,
  generateWeek,
  compareDates,
} from "@/utils/calendar";
import DateChip from "./dateChip";
import CalendarShimmer from "../shimmers/calendar";
import { days } from "@/constants/calendar";
import classNames from "classnames";

const WeekSlider = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [weeks, setWeeks] = useState<Date[][]>([]);
  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(today);

  const createWeeks = (currentDate: Date) => {
    const startOfTheWeek = getStartOfTheWeek(currentDate);
    const week = generateWeek(startOfTheWeek);

    setWeeks((prev) => [week, ...prev]);
  };

  useEffect(() => {
    createWeeks(today);
  }, []);

  const onNextClick = () => {
    if (weeks.length - 1 > weekIndex) {
      setWeekIndex((idx) => idx + 1);
    }
  };

  const onPrevClick = () => {
    if (weekIndex === 0) {
      const [date, month, year] = getPartsOfDate(weeks[0][0]);
      createWeeks(new Date(year, month, date - 1));
    } else {
      setWeekIndex((idx) => idx - 1);
    }
  };

  const onSelect = (date: Date) => () => {
    setSelectedDate(date);
  };

  if (!weeks.length) {
    return <CalendarShimmer />;
  }

  return (
    <div key="weekslider" className="flex flex-col">
      <div
        key="days"
        className="flex justify-between w-[calc(100%-46px)] mx-auto"
      >
        {days?.map((day, idx) => (
          <p
            key={day}
            className={classNames("text-xs w-[30px] text-center font-[10px]", {
              "text-red-500": idx === 0 || idx === days.length - 1,
            })}
          >
            {day}
          </p>
        ))}
      </div>
      <div key="date" className="flex justify-between w-full items-center">
        <Button
          variant={"ghost"}
          className="p-1 text-eclipse"
          onClick={onPrevClick}
        >
          {"<"}
        </Button>
        {weeks?.[weekIndex]?.map((day) => (
          <DateChip
            key={day.toString()}
            handleClick={onSelect(day)}
            dateObject={day}
            isSelected={compareDates(day, selectedDate)}
          />
        ))}
        <Button
          variant={"ghost"}
          className="p-1 text-eclipse"
          onClick={onNextClick}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default WeekSlider;
