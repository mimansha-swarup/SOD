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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type WeekSliderProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const WeekSlider = ({ selectedDate, setSelectedDate }: WeekSliderProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [weeks, setWeeks] = useState<Date[][]>([]);
  const [weekIndex, setWeekIndex] = useState(1);

  const createWeeks = (currentDate: Date) => {
    const startOfTheWeek = getStartOfTheWeek(currentDate);
    const week = generateWeek(startOfTheWeek);

    setWeeks((prev) => [week, ...prev]);
  };

  useEffect(() => {
    createWeeks(today);
    const [date, month, year] = getPartsOfDate(today);
    createWeeks(new Date(year, month, date - 1));
  }, []);

  const onSelect = (date: Date) => () => {
    setSelectedDate(date);
  };

  const handleSlideChange = (swiper: any) => {
    const currentIndex = swiper.activeIndex;

    // Restrict sliding forward beyond today's week
    if (currentIndex > weekIndex && weekIndex === weeks.length - 1) {
      swiper.slideTo(weekIndex); // Prevent moving forward
      return;
    }

    // Handle creating a previous week when sliding to the first slide
    if (currentIndex === 0) {
      const [date, month, year] = getPartsOfDate(weeks[0][0]);
      createWeeks(new Date(year, month, date - 1));

      // Wait until the new week is added to ensure Swiper works correctly
      setTimeout(() => {
        swiper.slideTo(1); // Slide back to the newly created first week
      }, 0);
      return;
    }

    // Update the week index
    setWeekIndex(currentIndex);
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

      <Swiper
        onSlideChange={handleSlideChange}
        initialSlide={weekIndex}
        spaceBetween={10}
        slidesPerView={1}
        className="w-full"
      >
        {weeks.map((week, index) => (
          <SwiperSlide key={`week-${index}`}>
            <div className="flex justify-between items-center">
              {week.map((day) => (
                <DateChip
                  key={day.toString()}
                  handleClick={onSelect(day)}
                  dateObject={day}
                  isSelected={compareDates(day, selectedDate)}
                  disabled={greaterThanToday(today, day)}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WeekSlider;
