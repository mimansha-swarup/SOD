import React from "react";

const RadarShimmer = () => {
  return (
    <div className="aspect-square min-h-[250px] w-full flex justify-center items-center">
      <div className="radar-shape h-56 w-56 animate-pulse bg-gray-300" />
    </div>
  );
};

export default RadarShimmer;
