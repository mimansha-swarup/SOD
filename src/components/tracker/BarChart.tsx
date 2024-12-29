"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  ChartData,
  ChartOptions,
} from "chart.js";
import RadarShimmer from "../shimmers/radar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface BarChartProps {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
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
  return (
    <Bar
      // style={{ height: "350px", maxWidth: "calc(100vh-32px)" }}
      data={data}
      options={options}
    />
  );
};

export default BarChart;
