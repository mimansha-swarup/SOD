import React from "react";
import { Skeleton } from "../ui/skeleton";

const MetricListShimmer = ({ noOfMetrics = 0, showButton = false }) => {
  const arr = [...new Array(noOfMetrics)]?.map((_, i) => i);

  return (
    <div className="py-6">
      <div className="h-[calc(100vh-150px)] overflow-auto">
        <div className="flex flex-col gap-2 ">
          {arr?.map((a) => (
            <Skeleton key={a} className="h-11 rounded-xl bg-white/35" />
          ))}
        </div>
        {showButton && (
          <Skeleton
            key={"button"}
            className="h-9 mt-6 rounded-xl bg-white/35"
          />
        )}
      </div>
    </div>
  );
};

export default MetricListShimmer;
