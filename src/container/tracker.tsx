"use client";
import React, { useState } from "react";
import WeekSlider from "@/components/tracker/weekSlider";
import StoreProvider from "@/app/StateProvider";
import ShowBS from "@/components/shared/ShowBS";
import { createMappingData } from "@/utils/tracker";
import BarChart from "@/components/tracker/BarChart";
import TrackerButton from "@/components/tracker/TrackerButton";
import PageHeader from "@/components/shared/PageHeader";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import { getUsersMetrics } from "@/lib/features/user/user.slice";

const TrackerContainer = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(today);
  const { data: metricRecord } = useAppSelector(getUsersMetrics);

  //TODO: change to trackingData
  const [options, record] = createMappingData(metricRecord?.metrics ?? []);

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
        {/* <TrackerList
          selectedTracker={trackerData}
        /> */}

        <div className="w-full mb-6">
          <WeekSlider
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="mb-6 max-w-[calc(100vw-32px)]">
          <BarChart data={record} options={options} />
        </div>
        {/* <Button onClick={createMockCoummnityMetrics}>Create Mock</Button> */}
        <TrackerButton metricArray={metricRecord?.metrics ?? []} />
      </div>
    </StoreProvider>
  );
};

export default TrackerContainer;
