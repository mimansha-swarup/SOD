import React from "react";
import { Skeleton } from "../ui/skeleton";

const RadarShimmer = () => {
  return (
    <div className=" min-h-[300px] w-full flex flex-col justify-evenly items-center relative pl-0.5 mb-6">
      <Skeleton className="h-[300px] w-0.5 absolute left-0 top-0 bottom-0 bg-white/40  rounded-md" />
      <Skeleton className="w-full h-0.5 absolute left-0.5 right-0 bottom-0 bg-white/40 rounded-md" />
      <Skeleton
        style={{ borderRadius: "0px" }}
        className="h-11 border border-white w-full border-l-transparent bg-white/25"
      />
      <Skeleton
        style={{ borderRadius: "0px" }}
        className="h-11 border border-white w-full border-l-transparent bg-white/25"
      />
      <Skeleton
        style={{ borderRadius: "0px" }}
        className="h-11 border border-white w-full border-l-transparent bg-white/25"
      />
      <Skeleton
        style={{ borderRadius: "0px" }}
        className="h-11 border border-white w-full border-l-transparent bg-white/25"
      />
    </div>
  );
};

export default RadarShimmer;
