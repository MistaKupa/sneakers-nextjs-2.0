"use client";

import { getOrdersClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import OrderCardAdmin from "./OrderCardAdmin";
import OrderCardMobile from "./OrderCardMobile";
import React from "react";

export default function LastOrders() {
  const { data, isPending, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersClient,
  });

  if (isPending) {
    return <p className="text-gray-400">Fetching products...</p>;
  }

  if (error)
    return (
      <div className="flex items-center justify-center text-red-500">
        Failed to load data.
      </div>
    );

  return (
    <motion.div
      layoutId="last-orders"
      className="bg-slate-50 drop-shadow rounded-sm"
    >
      <h2
        className={cn(
          "w-full py-5 px-5",
          "border-b-4 border-b-white",
          "font-semibold text-xl",

          "xl:px-10",
        )}
      >
        Last Orders
      </h2>
      <div className="w-full">
        <div
          className={cn(
            "hidden",
            "w-full p-5",
            "border-b-4 border-b-white",
            "font-medium bg-slate-100",

            "lg:grid grid-cols-[repeat(5,1fr)_4rem] lg:gap-5",
            "xl:px-10",
          )}
        >
          <div className="truncate">Order Number</div>
          <div>Date</div>
          <div>Price</div>
          <div>Email</div>
          <div>Status</div>
          <div></div>
        </div>
        <div className="grid grid-rows-[auto]">
          {data?.map((order) => (
            <React.Fragment key={order.id}>
              <div className="hidden lg:block">
                <OrderCardAdmin order={order} />
              </div>
              <div className="block lg:hidden">
                <OrderCardMobile order={order} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
