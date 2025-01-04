import React from "react";

import PieChart from "@/components/home/DonutChart";
import { Card, CardTitle } from "@/components/ui/card";
import { TRACKER } from "@/types/tracker";
import BentoCard from "./BentoCard";

const Bento = () => {
  return (
    <div className="px-4 p-4 relative -top-4 rounded-3xl bg-background">
      <p className="text-xl mb-4 px-2">
        Let's see how things are going for you.
      </p>

      <div className="grid grid-cols-2 grid-rows-3 gap-3">
        <BentoCard title="This Weeks Progress" className="col-span-2">
          <></>
        </BentoCard>

        <BentoCard title={TRACKER.KPI} >
          <PieChart />
        </BentoCard>

        <BentoCard title={TRACKER.SKILLS}>
          <PieChart />
        </BentoCard>

      </div>
    </div>
  );
};

export default Bento;
