"use client";
import MetricList from "@/components/configure/metricList";
import React from "react";
import StoreProvider from "../../StateProvider";
import ShowBS from "@/components/shared/ShowBS";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Cross, CrossIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import CommunityMetrics from "@/components/NewMetrics/CommunityMetrics";

const ConfigurePage = () => {
  const router = useRouter();

  const navigateToClubsMetrics = () => {
    router.push("/add-metrics");
  };
  return (
    <div className="px-4 flex flex-col w-screen relative">
      <PageHeader title="Add New Metrics" />

      <CommunityMetrics />

      <ShowBS />
      
    </div>
  );
};

export default ConfigurePage;
