import React from "react";
import { Button } from "../ui/button";
import QuantitySelector from "../shared/QuantitySelector";
import { IMetricsTrackingObject } from "@/types/feature/user";

const Tracker = ({
  metricArray,
}: {
  metricArray: IMetricsTrackingObject[];
}) => {
  return (
    <div className="px-2 flex flex-col justify-between h-full pb-12">
      <div className="overflow-auto">
        {metricArray?.length &&
          metricArray.map((item) => (
            <div
              key={item.id || item.name}
              className=" text-lg flex justify-between items-center mb-4"
            >
              <p>{item.name}</p>
              <QuantitySelector value={item?.value ?? 0} onChange={() => {}} />
            </div>
          ))}
      </div>
      <Button className="mt-auto  bg-gradient-to-r from-secondary to-accent w-full text-background ">
        Track
      </Button>
    </div>
  );
};

export default Tracker;
