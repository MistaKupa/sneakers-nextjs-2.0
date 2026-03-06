"use client";

import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useQuery } from "@tanstack/react-query";
import { getTotalProductsClient } from "@/app/_lib/admin-service-client";

export default function SalesGraph() {
  const { data, isPending, error } = useQuery({
    queryKey: ["totalItems"],
    queryFn: getTotalProductsClient,
  });

  if (isPending) {
    return (
      <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <p className="text-gray-400">Preparing charts...</p>
      </div>
    );
  }

  if (error)
    return (
      <div className="h-[400px] flex items-center justify-center text-red-500">
        Failed to load sales data.
      </div>
    );

  const statsByCategory = data.reduce(
    (acc, order) => {
      const cat = order.product_category;

      acc[cat] = (acc[cat] || 0) + order.price_at_time;
      return acc;
    },
    {} as Record<string, number>,
  );

  const categories = Object.keys(statsByCategory);
  const prices = Object.values(statsByCategory);

  const option: echarts.EChartsOption = {
    title: {
      text: "Sales by Category",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value", // Čísla sú na spodnej osi
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category", // Texty (kategórie) sú na bočnej osi
      data: categories,
    },
    series: [
      {
        name: "Sales by Category",
        type: "bar",
        data: prices,
        itemStyle: {
          borderRadius: [0, 3, 3, 0],
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          color: (params) => {
            const colorList = [
              ["#6366f1", "#818cf8"],
              ["#be84d3", "#e2b3f5"],
              ["#10b981", "#059669"],
            ];
            const colorItem = colorList[params.dataIndex % colorList.length];
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: colorItem[0] },
              { offset: 1, color: colorItem[1] },
            ]);
          },
        },
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
