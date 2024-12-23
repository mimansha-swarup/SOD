"use client";
import React, { useState } from "react";
import WeekSlider from "@/components/tracker/weekSlider";
import { Button } from "@/components/ui/button";
import RadarChart from "@/components/tracker/RadarChart";
import StoreProvider from "@/app/StateProvider";

import TrackButton from "@/components/tracker/TrackButton";
import ShowBS from "@/components/shared/ShowBS";
import { TRACKER } from "@/types/tracker";
import TrackerList from "@/components/tracker/TrackerList";

const dummyData = {
  labels: ["Comments", "Post", ["Connection", "Request"]],
  datasets: [
    {
      label: "Daily Metrics",

      data: [20, 10, 4],
      backgroundColor: "#FF606020",
      pointBackgroundColor: "#FF6060",
      borderColor: "#FF7B7B",
      borderWidth: 1,
    },
  ],
};

const dummyOptions = {
  scales: {
    r: {
      // angleLines: {
      //   display: false,
      // },
      suggestedMin: 0,
      suggestedMax: 20,
    },
  },
};
const TrackerContainer = () => {
  const [trackerData, setTrackerData] = useState({
    selectedTracker: TRACKER.METRIC,
    data: {},
  });

  const handleTrackerChange = (tracker: TRACKER) => {
    setTrackerData({ ...trackerData, selectedTracker: tracker });
  };

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
        <div className="mb-4">
          <RadarChart data={dummyData} options={dummyOptions} />
        </div>

        <TrackButton selectedTracker={trackerData.selectedTracker} />
      </div>
    </StoreProvider>
  );
};

export default TrackerContainer;
