"use client";
import { trackersList } from "@/constants/tracker";
import { cn } from "@/lib/utils";
import { TRACKER } from "@/types/tracker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const TrackerList = ({
  selectedTracker,
  setSelectedTracker,
}: {
  selectedTracker: TRACKER;
  setSelectedTracker: (tracker: TRACKER) => void;
}) => {
  const router = useRouter();
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
                "rounded-lg px-3 py-1",
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
      <Settings
        height={24}
        width={24}
        className="ml-auto"
        onClick={() => router.push("/configure")}
      />
    </div>
  );
};

export default TrackerList;
