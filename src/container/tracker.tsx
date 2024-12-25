"use client";
import React, { useState } from "react";
import WeekSlider from "@/components/tracker/weekSlider";
import StoreProvider from "@/app/StateProvider";
import ShowBS from "@/components/shared/ShowBS";
import { TRACKER } from "@/types/tracker";
import TrackerList from "@/components/tracker/TrackerList";
import { createMappingData } from "@/utils/tracker";
import { trackerData } from "@/constants/tracker";
import BarChart from "@/components/tracker/BarChart";
import TrackerButton from "@/components/tracker/TrackerButton";
const trackerRecord = trackerData;

const TrackerContainer = () => {
  const [trackerData, setTrackerData] = useState({
    selectedTracker: TRACKER.METRIC,
    data: {},
  });

  const handleTrackerChange = (tracker: TRACKER) => {
    setTrackerData({ ...trackerData, selectedTracker: tracker });
  };

  const [options, record] = createMappingData(
    trackerData.selectedTracker,
    trackerRecord[trackerData.selectedTracker]
  );
  console.log("record", record);
  return (
    <StoreProvider>
      <div className="relative">
        <ShowBS />
        <TrackerList
          selectedTracker={trackerData.selectedTracker}
          setSelectedTracker={handleTrackerChange}
        />

        <div className="w-full mb-6">
          <WeekSlider />
        </div>
        <div className="mb-6">
          <BarChart data={record} options={options} />
        </div>
        <TrackerButton selectedTracker={trackerData.selectedTracker} />
      </div>
    </StoreProvider>
  );
};

export default TrackerContainer;
