import { TRACKER } from "@/types/tracker";

export const trackersList = [TRACKER.METRIC, TRACKER.KPI, TRACKER.SKILLS];

export const TRACKER_MODE = {
  add: "add",
  edit: "edit",
};

export const trackerData = {
  [TRACKER.METRIC]: [
    {
      name: "Sleep Hours",
      color: "#FFB5E8",
      date: "2024-01-01",
      type: "Number",
    },
    {
      name: "Water Goal",
      color: "#B5DEFF",
      date: "2024-01-01",
      type: "Checkbox",
    },
    {
      name: "Daily Exercise",
      color: "#B5EFB5",
      date: "2024-01-01",
      type: "Checkbox",
    },
    {
      name: "Meditation Minutes",
      color: "#FFE4B5",
      date: "2024-01-01",
      type: "Number",
    },
  ],
  [TRACKER.KPI]: [
    {
      name: "Tasks Completed",
      color: "#DCD3FF",
      date: "2024-01-01",
      type: "Number",
    },
    {
      name: "Meeting Attended",
      color: "#FFC8B5",
      date: "2024-01-01",
      type: "Checkbox",
    },
    {
      name: "Focus Hours",
      color: "#B5FFE1",
      date: "2024-01-01",
      type: "Number",
    },
    {
      name: "Daily Goals Met",
      color: "#FFE5B5",
      date: "2024-01-01",
      type: "Checkbox",
    },
  ],
  [TRACKER.SKILLS]: [
    {
      name: "Coding Practice",
      color: "#B5B9FF",
      date: "2024-01-01",
      type: "Checkbox",
    },
    {
      name: "Learning Hours",
      color: "#FFB5E8",
      date: "2024-01-01",
      type: "Number",
    },
    {
      name: "Project Work",
      color: "#B5F4FF",
      date: "2024-01-01",
      type: "Checkbox",
    },
    {
      name: "Reading Time",
      color: "#D4FFB5",
      date: "2024-01-01",
      type: "Number",
    },
  ],
};
