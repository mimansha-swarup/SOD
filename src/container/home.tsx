import WeekSlider from "@/components/home/weekSlider";
import { Button } from "@/components/ui/button";
import React from "react";

const HomeContainer = () => {
  return (
    <div>
      <div className="flex mb-8">
        <p className="text-eclipse text-xl font-bold">Hello, Mimansha</p>
      </div>

      <div className="flex mb-6 justify-center gap-4">
        {["metric", "kpi"].map((el) => (
          <div
            key={el}
            className={`rounded-xl px-4 py-1 ${
              el === "metric"
                ? "bg-eden text-white"
                : "bg-neutral-100 text-eclipse"
            }`}
          >
            {el}
          </div>
        ))}
      </div>

      <div className="h-60 w-full mb-4">
        <WeekSlider />
      </div>

      <Button className="bg-gradient-to-r from-turquoise to-eden w-full">
        Track Metrics
      </Button>
    </div>
  );
};

export default HomeContainer;
