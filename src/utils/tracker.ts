import { randomNumberGenerator } from "./configure";
import { ChartData } from "chart.js";
import { ChartOptions } from "chart.js";
import { IMetricsArray } from "@/types/feature/user";
import { DEFAULT_COMMUNITY } from "@/constants/tracker";

export const getCommunityId = () => {
  if (window) {
    const community = localStorage.getItem("selectedCommunity");
    return community || DEFAULT_COMMUNITY;
  }
  return DEFAULT_COMMUNITY;
};

export function createMappingData(trackerList: IMetricsArray[]) {
  const labels = trackerList.map((item) => item.name.split(" "));
  const data = {
    labels: labels,
    datasets: [
      {
        data: trackerList.map(() => randomNumberGenerator(10)),
        backgroundColor: trackerList.map((item) => `${item.color}30`),
        borderColor: trackerList.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    height: Math.max(300, trackerList.length * 100), // Dynamic height based on data

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
}

const saveMetrics = (metric: {
  metric: IMetricsArray;
  list: IMetricsArray[];
}) => {
  
};
