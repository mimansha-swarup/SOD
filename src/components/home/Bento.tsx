"use client";
import React from "react";

import PieChart from "@/components/home/DonutChart";
import { Card, CardTitle } from "@/components/ui/card";
import BentoCard from "./BentoCard";
import LineChart from "./LineChart";
import { useAppSelector } from "@/lib/store";
import { getUsersMetrics } from "@/lib/features/user/user.slice";
import { createLineChart, getLast7DaysData } from "@/utils/tracker";

const Bento = () => {
  const { data: { trackingData = {} } = {}, isLoading } =
    useAppSelector(getUsersMetrics);

  const past7DaysData = getLast7DaysData(trackingData);
  const formattedLineDataset = Object.values(past7DaysData)?.map(
    (trackingArr) => {
      return trackingArr?.reduce((acc, curr) => {
        if (curr?.type === "BOOLEAN") {
          if (curr?.value === "true") {
            return acc + 1;
          }
        } else {
          if (curr?.value != "0") {
            return acc + 1;
          }
          return acc;
        }
        return acc;
      }, 0);
    }
  );


  const [formattedData, options] = createLineChart({
    title: "Last 7 days Progress",
    labels: Object.keys(past7DaysData),
    datasetLabel: "Tracking Data",
    data: formattedLineDataset,
  });
  return (
    <div className="px-4 p-4 relative -top-4 rounded-3xl bg-background">
      <p className="text-xl mb-4 px-2">
        Let's see how things are going for you.
      </p>

      <div className="grid grid-cols-2 grid-rows-1 gap-3">
        <BentoCard className="col-span-2 row-span-1 !p-1">
          <LineChart data={formattedData} options={options} />
        </BentoCard>

        {/* <BentoCard title={"kpi"}>
          <PieChart />
        </BentoCard>

        <BentoCard title={"TRACKER.SKILLS"}>
          <PieChart />
        </BentoCard> */}
      </div>
    </div>
  );
};

export default Bento;
