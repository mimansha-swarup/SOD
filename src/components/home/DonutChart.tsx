"use client";
// src/PieChart.tsx

import React from "react";
import { Doughnut } from "react-chartjs-2";

//register the elements for the Doughnut Chart. More info here: https://www.chartjs.org/docs/latest/getting-started/integration.html
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);

const PieChart = () => {
  const data = {
    labels: ["Label 1", "Label 2"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#36A2EB", "#576778"],
        hoverBackgroundColor: [],
      },
    ],
  };

  const options = {
    // You can customize chart options here
  };

  return <Doughnut data={data} options={options} />;
};

export default PieChart;
