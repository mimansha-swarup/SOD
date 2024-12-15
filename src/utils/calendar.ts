import { days } from "@/constants/calendar";
export const getPartsOfDate = (currentDate = new Date()) => {
  return [
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear(),
    currentDate.getDay(),
  ];
};
export const getStartOfTheWeek = (currentDate = new Date()) => {
  const [date, month, year, day] = getPartsOfDate(currentDate);

  return new Date(year, month, date - day);
};

export const generateWeek = (currentDate = new Date()) => {
  const currentWeek: Date[] = [];
  const [date, month, year] = getPartsOfDate(currentDate);

  days?.forEach((_, day) => {
    currentWeek.push(new Date(year, month, date + day));
  });

  return currentWeek;
};

export const formatDate = (date: number) => {
  return date < 10 ? `0${date}` : date;
};

export const compareDates = (date1: Date, date2: Date) =>
  date1.getTime() === date2.getTime();
