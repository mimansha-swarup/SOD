"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import RadarShimmer from "../shimmers/radar";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  data: ChartData<"radar">;
  options: ChartOptions<"radar">;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, options }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      stopLoading();
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const stopLoading = () => {
    setLoading(false);
  };
  if (loading) return <RadarShimmer />;
  return <Radar data={data} options={options} />;
};

export default RadarChart;
