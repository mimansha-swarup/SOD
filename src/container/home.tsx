import WeekSlider from "@/components/home/weekSlider";
import { Button } from "@/components/ui/button";
import RadarChart from "@/components/home/RadarChart";
import React from "react";

const dummyData = {
  labels: ["Comments", "Post", ["Connection", "Request"]],
  datasets: [
    {
      label: "Daily Metrics",

      data: [20, 10, 4],
      backgroundColor: "#FF606020",
      pointBackgroundColor: "#FF6060",
      borderColor: "#FF7B7B",
      borderWidth: 1,
    },
  ],
};

const dummyOptions = {
  scales: {
    r: {
      // angleLines: {
      //   display: false,
      // },
      suggestedMin: 0,
      suggestedMax: 20,
    },
  },
};
const HomeContainer = () => {
  return (
    <div>
      <div className="flex mb-4">
        <p className="text-eclipse text-xl font-bold">Hello, Mimansha!</p>
      </div>

      <div className="flex mb-8 gap-2">
        {["metric", "kpi", "skill"].map((el) => (
          <div
            key={el}
            className={`rounded-lg px-4 py-1 ${
              el === "metric"
                ? "bg-eden text-white"
                : "bg-neutral-100 text-eclipse"
            }`}
          >
            {el}
          </div>
        ))}
      </div>

      <div className="w-full mb-6">
        <WeekSlider />
      </div>
      <div className="mb-4">
        <RadarChart data={dummyData} options={dummyOptions} />
      </div>

      <Button className="bg-gradient-to-r from-turquoise to-eden w-full">
        Track Metrics
      </Button>
    </div>
  );
};

export default HomeContainer;
