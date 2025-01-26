"use client";
import MetricList from "@/components/configure/metricList";
import React from "react";
import ShowBS from "@/components/shared/ShowBS";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const ConfigurePage = () => {
  const router = useRouter();

  const navigateToClubsMetrics = () => {
    router.push("/add-metrics");
  };
  return (
    <div className="px-4 flex flex-col w-screen relative">
      <PageHeader title="My Metrics" />

      <MetricList />

      <ShowBS />
      <Button
        onClick={navigateToClubsMetrics}
        className="fixed bottom-16 right-4 bg-secondary text-background hover:text-background hover:bg-secondary h-[36px] w-[36px] rounded-full"
      >
        <Plus height={24} width={24} />
      </Button>
    </div>
  );
};

export default ConfigurePage;
