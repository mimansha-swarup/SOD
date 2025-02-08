"use client";
import React from "react";
import PageHeader from "@/components/shared/PageHeader";
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
    </div>
  );
};

export default ConfigurePage;
