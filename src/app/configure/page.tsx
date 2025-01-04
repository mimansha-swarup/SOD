"use client";
import MetricList from "@/components/configure/metricList";
import AddMetricButton from "@/components/configure/AddMetricButton";
import { TRACKER } from "@/types/tracker";
import React from "react";
import StoreProvider from "../StateProvider";
import ShowBS from "@/components/shared/ShowBS";
import PageHeader from "@/components/shared/PageHeader";

const ConfigurePage = () => {
  // const router = useRouter();
  return (
    <div className="px-4">
      <PageHeader title="Configure" />
      <StoreProvider>
        <MetricList />

        <ShowBS />
        <AddMetricButton selectedTracker={TRACKER.METRIC} />
      </StoreProvider>
    </div>
  );
};

export default ConfigurePage;
