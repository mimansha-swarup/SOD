import React from "react";
import { Button } from "../ui/button";
import QuantitySelector from "../shared/QuantitySelector";

const Tracker = () => {
  const trackingList = [
    { name: "Commented on Post", value: 2 },
    { name: "Linkedin Post", value: 0 },
    { name: "connection RequesT", value: 0 },
  ];
  return (
    <div className="px-2 flex flex-col justify-between h-full pb-12">
      <div>
        {trackingList.length &&
          trackingList.map((item) => (
            <div className=" text-lg flex justify-between items-center mb-4">
              <p>{item.name}</p>
              <QuantitySelector />
            </div>
          ))}
      </div>
      <Button className="mt-auto  bg-gradient-to-r from-eclipse to-eden w-full">
        Track
      </Button>
    </div>
  );
};

export default Tracker;
