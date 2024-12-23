import { trackersList } from "@/constants/tracker";
import { cn } from "@/lib/utils";
import { TRACKER } from "@/types/tracker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="flex flex-col-reverse mb-6  pb-2">
      <Tabs
        defaultValue={selectedTracker}
        onValueChange={(value) => setSelectedTracker(value as TRACKER)}
        className=" mx-auto"
      >
        <TabsList className="bg-neutral-100">
          {trackersList.map((el) => (
            <TabsTrigger
              key={el}
              value={el}
              className={cn(
                "rounded-lg px-3 py-1 text-xs",
                el === selectedTracker
                  ? "bg-eden text-white data-[state=active]:bg-eden data-[state=active]:text-white"
                  : "text-eclipse data-[state=active]:bg-eden data-[state=active]:text-white"
              )}
            >
              {el?.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Settings height={16} width={16} className="ml-auto" />
    </div>
  );
};

export default TrackerList;
