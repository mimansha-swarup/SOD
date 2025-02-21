import React from "react";
import { Skeleton } from "../ui/skeleton";
import { AuroraHero } from "../home/Aurora";
import DailyProgress from "../home/DailyProgress";
import BentoCard from "../home/BentoCard";

const HomeContainerShimmer = () => {
  return (
    <div className="h-[calc(screen - h-8)]">
      <div className="flex mb-4 items-center gap-2 px-4">
        <Skeleton className="bg-white/40 size-6 rounded-full" />
        <Skeleton className="bg-white/40 h-5 w-28 rounded-sm" />
      </div>
      <Skeleton className="bg-white/40 h-2 w-[90%] rounded-lg mx-auto" />

      <AuroraHero manifestation={""} />

      <div className="px-4 p-4 relative -top-4 rounded-3xl bg-background">
        <Skeleton className="bg-white/40 h-7 w-3/4 rounded-sm mb-4" />

        <div className="grid grid-cols-2 grid-rows-1 gap-3">
          <BentoCard className="col-span-2 row-span-1 !p-1">
            <Skeleton className="bg-white/10 h-[200px] w-full rounded-md" />
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

export default HomeContainerShimmer;
