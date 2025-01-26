"use client";
import React, { useEffect, useState } from "react";
import WeekSlider from "@/components/tracker/weekSlider";
import ShowBS from "@/components/shared/ShowBS";
import { createMappingData } from "@/utils/tracker";
import BarChart from "@/components/tracker/BarChart";
import TrackerButton from "@/components/tracker/TrackerButton";
import PageHeader from "@/components/shared/PageHeader";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import { getUsersMetrics } from "@/lib/features/user/user.slice";
import { createDateKey } from "@/utils/calendar";
import { IMetricsTrackingObject } from "@/types/feature/user";


const TrackerContainer = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMetrics, setSelectedMetrics] = useState<
    IMetricsTrackingObject[]
  >([]);
  const { data: metricRecord } = useAppSelector(getUsersMetrics);

  const selectedDateKey = createDateKey(selectedDate);
  const trackingData = metricRecord.trackingData?.[selectedDateKey];

  useEffect(() => {
    if (trackingData) {
      console.log("I am Here");
      setSelectedMetrics(trackingData);
    } else {
      console.log("I am There");
      setSelectedMetrics(
        metricRecord?.metrics?.map((metric) => ({ ...metric, value: 0 }))
      );
    }
  }, [selectedDate, trackingData]);
  console.log(selectedMetrics, "selectedMetrics)");

  //TODO: change to trackingData
  const [options, record] = createMappingData(
    selectedMetrics,
    Boolean(trackingData)
  );

  return (
    <div className="relative">
      <ShowBS />
      <PageHeader
        title="Tracker"
        className="mb-6"
        rightIcon={<Settings />}
        rightIconClick={() => router.push("/configure")}
        showBackIcon={false}
      />
      

      <div className="w-full mb-6">
        <WeekSlider
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      {Boolean(trackingData) ? (
        <div className="mb-6 max-w-[calc(100vw-32px)]">
          <BarChart data={record} options={options} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-80">
          <h1 className="text-xl text-center">
            No data for {selectedDateKey} has been Logged
          </h1>
        </div>
      )}
      <TrackerButton metricArray={selectedMetrics} />
    </div>
  );
};

export default TrackerContainer;
