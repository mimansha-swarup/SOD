"use client";
import React from "react";
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
  return <Radar data={data} options={options} />;
};

export default RadarChart;
