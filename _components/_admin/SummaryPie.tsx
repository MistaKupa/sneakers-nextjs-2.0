"use client";

import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

export default function SummaryPie() {
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Summary Pie",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },

        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          {
            value: 10000,
            name: "Total Earnings",
            itemStyle: {
              color: new echarts.graphic.RadialGradient(
                0.5, // x (stred)
                0.5, // y (stred)
                1, // radius (1 = vonkajší okraj)
                [
                  { offset: 0, color: "#e6bff5" },
                  { offset: 1, color: "#C69DD5" },
                ],
              ),
            },
          },
          {
            value: 4000,
            name: "Total Orders",
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: "#34d399" },
                { offset: 1, color: "#10b981" },
              ]),
            },
          },

          {
            value: 2000,
            name: "Total Users",
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: "#f87171" },
                { offset: 1, color: "#ef4444" },
              ]),
            },
          },
          {
            value: 1500,
            name: "Products Sold",
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: "#60a5fa" },
                { offset: 1, color: "#3b82f6" },
              ]),
            },
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: 400 }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
}
