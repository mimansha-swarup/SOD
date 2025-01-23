"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  getPartsOfDate,
  getStartOfTheWeek,
  generateWeek,
  compareDates,
  greaterThanToday,
} from "@/utils/calendar";
import DateChip from "./dateChip";
import CalendarShimmer from "../shimmers/calendar";
import { days } from "@/constants/calendar";
import classNames from "classnames";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

type WeekSliderProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};
const WeekSlider = ({ selectedDate, setSelectedDate }: WeekSliderProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [weeks, setWeeks] = useState<Date[][]>([]);
  const [weekIndex, setWeekIndex] = useState(0);
  // const [selectedDate, setSelectedDate] = useState(today);
  const [startX, setStartX] = useState(0); // Track initial touch position
  const [endX, setEndX] = useState(0); // Track final touch position
  const [isSwiping, setIsSwiping] = useState(false); // Track if it's a swipe gesture

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(false); // Reset swiping state
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX;
    const diffX = Math.abs(currentX - startX);
    if (diffX > 10) {
      setIsSwiping(true); // Mark as swiping if movement exceeds threshold
    }
  };

  // Handle touch end
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwiping) {
      return; // Handle tap/click logic here
    }

    setEndX(e.changedTouches[0].clientX);
    determineSwipeDirection();
  };

  // Determine swipe direction
  const determineSwipeDirection = () => {
    const diffX = endX - startX;

    if (diffX > 40) {
      onPrevClick();
    } else if (diffX < -40) {
      onNextClick();
    }
  };

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
      <div key="days" className="flex justify-between w-full mx-auto">
        {days?.map((day, idx) => (
          <p
            key={day}
            className={classNames("text-xs w-[33px] text-center font-[10px]", {
              "text-red-500": idx === 0 || idx === days.length - 1,
            })}
          >
            {day}
          </p>
        ))}
      </div>
      <div
        key="date"
        className="flex justify-between w-full items-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* <Button variant={"ghost"} className="p-1 " onClick={onPrevClick}>
          <ChevronLeftCircle />
        </Button> */}
        {weeks?.[weekIndex]?.map((day) => (
          <DateChip
            key={day.toString()}
            handleClick={onSelect(day)}
            dateObject={day}
            isSelected={compareDates(day, selectedDate)}
            disabled={greaterThanToday(today, day)}
          />
        ))}
        {/* <Button variant={"ghost"} className="p-1 " onClick={onNextClick}>
          <ChevronRightCircle />
        </Button> */}
      </div>
    </div>
  );
};

export default WeekSlider;
