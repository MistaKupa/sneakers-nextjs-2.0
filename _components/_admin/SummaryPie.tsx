"use client";

import { getTotalProductsClient } from "@/app/_lib/admin-service-client";
import { useQuery } from "@tanstack/react-query";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

export default function SummaryPie() {
  const { data, isPending, error } = useQuery({
    queryKey: ["totalItems"],
    queryFn: getTotalProductsClient,
  });

  const pieByCategory = data.reduce(
    (acc, product) => {
      const cat = product.product_category;

      acc[cat] = (acc[cat] || 0) + product.price_at_time;

      return acc;
    },
    {} as Record<string, number>,
  );

  const menValue = pieByCategory.men;
  const womenValue = pieByCategory.women;
  const totalEarnings = menValue + womenValue;

  const option: echarts.EChartsOption = {
    title: { text: "Sales by Category" },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} € ({d}%)",
    },
    legend: {
      bottom: "5%",
      left: "center",
    },
    series: [
      {
        name: "Earnings",
        type: "pie",
        radius: ["50%", "75%"], // "Doughnut" efekt
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        labelLayout: { hideOverlap: true },
        // --- STATICKÝ STRED (Zobrazí sa, keď nie je hover) ---
        label: {
          show: true,
          position: "center",
          formatter: () =>
            `{total|${totalEarnings.toLocaleString()} €}\n{label|Total Earnings}`,
          rich: {
            total: {
              fontSize: 22,
              fontWeight: "bold",
              color: "#1b1d22",
              lineHeight: 30,
            },
            label: { fontSize: 14, color: "#68707d" },
          },
        },
        // --- DYNAMICKÝ STRED (Zobrazí sa pri hoveri) ---
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
            // {b} je meno (Men/Women), {c} je hodnota, {d} je percento
            formatter: "{b}\n{c} €",
          },
        },
        data: [
          {
            value: menValue,
            name: "Men",
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: "#818cf8" },
                { offset: 1, color: "#6366f1" },
              ]),
            },
          },
          {
            value: womenValue,
            name: "Women",
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: "#e6bff5" },
                { offset: 1, color: "#C69DD5" },
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
