import { TRACKER, TrackerObjectType } from "@/types/tracker";
import { randomNumberGenerator } from "./configure";
import { ChartData } from "chart.js";
import { ChartOptions } from "chart.js";

export function createMappingData(
  selectedTracker: `${TRACKER}`,
  trackerList: TrackerObjectType[]
) {
  console.log(trackerList);
  const labels = trackerList.map((item) => item.name.split(" "));
  const data = {
    labels: labels,
    datasets: [
      {
        data: trackerList.map(
          () => randomNumberGenerator(10)
        ),
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
      text: `Your ${selectedTracker}`,
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
