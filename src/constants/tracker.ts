import { TRACKER } from "@/types/tracker";

export const trackersList = [TRACKER.METRIC, TRACKER.KPI, TRACKER.SKILLS];

export const trackerData = [
  {
    name: TRACKER.METRIC,
    list: [
      {
        name: "Metric 1", 
        color: "#000000",
        date: "2024-01-01",
        maxValue: 100,
      },
      {
        name: "Metric 2",
        color: "#000000",
        date: "2024-01-01",
        maxValue: 100,
      },
    ],
  },
  {
    name: TRACKER.KPI,
    list: [
      {
        name: "KPI 1",
        color: "#000000",
        date: "2024-01-01",
        maxValue: 100,
      },
      {
        name: "KPI 2",
        color: "#000000",
        date: "2024-01-01",
        maxValue: 100,
      },
    ],
  },
  {
    name: TRACKER.SKILLS,
      list: [
      {
        name: "Skill 1",
        color: "#000000",
        date: "2024-01-01",
        maxValue: 100,
      },
      {
        name: "Skill 2",
        color: "#000000",
        date: "2024-01-01",
        maxValue: 100,
      },
    ],
  },
];
