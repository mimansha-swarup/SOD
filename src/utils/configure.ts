import { TRACKER, TrackerType } from "@/types/tracker";

export const generatePastelColor = (): string => {
  // Generate higher base values for lighter colors (pastel)
  const r = Math.floor(Math.random() * 55 + 200); // 200-255
  const g = Math.floor(Math.random() * 55 + 200); // 200-255
  const b = Math.floor(Math.random() * 55 + 200); // 200-255

  // Convert to hex
  const hex =
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
};

export const randomNumberGenerator = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const formatTrackerData = (data: TrackerType) => {
  const keyList = Object.keys(data) as (keyof TrackerType)[];
  return keyList.map((key) => ({
    name: key,
    list: data[key],
  }));
};
