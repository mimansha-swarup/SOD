import MetricList from "@/components/configure/metricList";
import React from "react";
import ShowBS from "@/components/shared/ShowBS";
import PageHeader from "@/components/shared/PageHeader";

const ConfigurePage = () => {
  return (
    <div className="px-4 flex flex-col w-screen relative">
      <PageHeader title="My Metrics" />
      <MetricList />
      <ShowBS />
    </div>
  );
};

export default ConfigurePage;
