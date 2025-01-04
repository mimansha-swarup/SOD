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
import PageHeader from "@/components/shared/PageHeader";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
const trackerRecord = trackerData;

const TrackerContainer = () => {
  const router = useRouter();
  const [trackerData, setTrackerData] = useState({
    selectedTracker: TRACKER.KPI,
    data: {},
  });

  const handleTrackerChange = (tracker: TRACKER) => {
    setTrackerData({ ...trackerData, selectedTracker: tracker });
  };

  const [options, record] = createMappingData(
    trackerData.selectedTracker,
    trackerRecord[trackerData.selectedTracker]
  );

  return (
    <StoreProvider>
      <div className="relative">
        <ShowBS />
        <PageHeader
          title="Tracker"
          className="mb-6"
          rightIcon={<Settings />}
          rightIconClick={() => router.push("/configure")}
          showBackIcon={false}
        />
        <TrackerList
          selectedTracker={trackerData.selectedTracker}
          setSelectedTracker={handleTrackerChange}
        />

        <div className="w-full mb-6">
          <WeekSlider />
        </div>
        <div className="mb-6 max-w-[calc(100vw-32px)]">
          <BarChart data={record} options={options} />
        </div>
        <TrackerButton selectedTracker={trackerData.selectedTracker} />
      </div>
    </StoreProvider>
  );
};

export default TrackerContainer;
