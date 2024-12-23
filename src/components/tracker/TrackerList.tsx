import { trackersList } from "@/constants/tracker";
import { cn } from "@/lib/utils";
import { TRACKER } from "@/types/tracker";
import { Settings } from "lucide-react";
import React from "react";

const TrackerList = ({
  selectedTracker,
  setSelectedTracker,
}: {
  selectedTracker: TRACKER;
  setSelectedTracker: (tracker: TRACKER) => void;
}) => {
  return (
    <div className="flex justify-between mt-3 mb-6 border-b border-neutral-200 pb-2">
      <div className="flex text-xs  gap-2">
        {trackersList.map((el) => (
          <div
            key={el}
            className={cn(
              "rounded-lg px-3 py-1",
              el === selectedTracker
                ? "bg-eden text-white"
                : "bg-neutral-100 text-eclipse"
            )}
            onClick={() => setSelectedTracker(el)}
          >
            {el?.toUpperCase()}
          </div>
        ))}
      </div>
      <Settings height={16} width={16} />
    </div>
  );
};

export default TrackerList;
