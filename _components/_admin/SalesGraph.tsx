"use client";

import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

export default function SalesGraph() {
  const option: echarts.EChartsOption = {
    color: ["#C69DD5", "#10b981", "#ef4444", "#3b82f6"],
    title: {
      text: "Stacked Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Line 1",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#e6bff5",
            },
            {
              offset: 1,
              color: "#C69DD5",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: "Line 2",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#34d399",
            },
            {
              offset: 1,
              color: "#10b981",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 282, 111, 234, 220, 340, 310],
      },
      {
        name: "Line 3",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#f87171",
            },
            {
              offset: 1,
              color: "#ef4444",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [320, 132, 201, 334, 190, 130, 1000],
      },
      {
        name: "Line 4",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#60a5fa",
            },
            {
              offset: 1,
              color: "#3b82f6",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 402, 231, 134, 190, 230, 120],
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
