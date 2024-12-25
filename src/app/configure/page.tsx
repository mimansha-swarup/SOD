"use client";
import MetricList from "@/components/configure/metricList";
import AddMetricButton from "@/components/configure/AddMetricButton";
import { TRACKER } from "@/types/tracker";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import StoreProvider from "../StateProvider";
import ShowBS from "@/components/shared/ShowBS";

const ConfigurePage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center gap-1 font-bold text-lg mb-6">
        <ChevronLeft onClick={() => router.back()} />
        Configure
      </div>
      <StoreProvider>
        <MetricList />

        <ShowBS />
        <AddMetricButton selectedTracker={TRACKER.METRIC} />
      </StoreProvider>
    </div>
  );
};

export default ConfigurePage;
