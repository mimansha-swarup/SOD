"use client";
import { ChartData, plugins } from "chart.js";
import { ChartOptions } from "chart.js";
import {
  IMetricsTrackingObject,
  ITrackingObject,
  IUsersCommunity,
} from "@/types/feature/user";
import { DEFAULT_COMMUNITY } from "@/constants/tracker";
import { createDateKey, greaterThanToday, lessThanToday } from "./calendar";
import { updateUserCommunity } from "@/lib/actions/users.action";

export const getCommunityId = () => {
  if (typeof window !== "undefined") {
    const community = localStorage.getItem("selectedCommunity");
    return community || DEFAULT_COMMUNITY;
  }
  return DEFAULT_COMMUNITY;
};

function getLargestNumberOrDefault(data: IMetricsTrackingObject[]): number {
  let allBoolean = true;
  let largestNumber = 1;

  for (const item of data) {
    if (item.type === "NUMBER" && !isNaN(Number(item.value))) {
      largestNumber = Math.max(largestNumber, Number(item.value));
      allBoolean = false;
    } else if (item.type !== "BOOLEAN") {
      allBoolean = false;
    }
  }

  return allBoolean ? 1 : largestNumber;
}

export const createMappingData = (
  trackerList: IMetricsTrackingObject[],
  shallProcess = true
) => {
  if (!shallProcess) return [{}, {}] as [ChartOptions<"bar">, ChartData<"bar">];
  const highestValue = getLargestNumberOrDefault(trackerList);

  const labels = trackerList.map((item) => item.name.split(" "));
  const data = {
    labels: labels,
    datasets: [
      {
        data: trackerList.map((item) =>
          item.type === "NUMBER"
            ? item.value
            : item.value === "true"
            ? highestValue
            : 0
        ),
        backgroundColor: trackerList.map((item) => `${item.color}35`),
        borderColor: trackerList.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    height: Math.max(300, trackerList.length * 100), // Dynamic height based on data
    plugins: {
      legend: { display: false },
    },

    indexAxis: "y",
    title: {
      display: true,
      text: `Your Metrics`,
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
    },
  };

  return [config, data] as [ChartOptions<"bar">, ChartData<"bar">];
};

export const createLineChart = ({
  title = " ",
  labels = [],
  data = [],
  datasetLabel = "",
}: {
  title: string;
  labels: string[];
  data: number[];
  datasetLabel: string;
}) => {
  const formattedData = {
    labels: labels,
    datasets: [
      {
        label: datasetLabel,
        data: data,
        // borderColor: "#7c83fd",
        borderColor: "#121326",
        backgroundColor: "#80eeff",
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title, color: "#121326" },
      backgroundColor: "#121326",
      scales: {
        x: {
          ticks: {
            color: "#121326",
            fontSize: "12",
          },
          grid: {
            color: "#000", // Change X-axis grid line color
          },
        },
        y: {
          ticks: {
            font: {
              size: 14,
              color: "#121326",
            },
            color: "#121326",
          },
          grid: {
            color: "#000", // Change Y-axis grid line color
          },
        },
      },
    },
  };
  return [formattedData, options] as [ChartData<"line">, ChartOptions<"line">];
};

export const getLast7DaysData = (data: ITrackingObject) => {
  const today = new Date(2025, 0, 27);
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 6);

  const result: ITrackingObject = {};

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(last7Days);
    currentDate.setDate(last7Days.getDate() + i);

    const formattedDate = currentDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "/");

    result[formattedDate] = data[formattedDate] || [];
  }

  return result;
};

export const calculateStreak = (
  userRecord: IUsersCommunity,
  { userId, communityId }: { userId: string; communityId: string },
  currentDate: string
) => {
  if (userRecord.lastActivity === currentDate) {
    return;
  }

  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = createDateKey(yesterday);
  let streak = userRecord.streak;
  let streakTrend = "";

  if (userRecord.lastActivity === yesterdayStr || !userRecord.lastActivity) {
    streak += 1;
    streakTrend = "up";
  } else {
    streak = Math.max(0, streak - 1);
    streakTrend = "down";
  }

  const body = {
    streak,
    streakTrend,
    lastActivity: currentDate,
  };
  updateUserCommunity({
    uid: userId,
    community: communityId,
    dataToUpdate: body,
  });
};
