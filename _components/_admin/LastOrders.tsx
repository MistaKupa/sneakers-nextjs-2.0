"use client";

import { getOrdersClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import OrderCardAdmin from "./OrderCardAdmin";

export default function LastOrders() {
  const { data, isPending, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersClient,
  });

  return (
    <motion.div
      layoutId="last-orders"
      className="bg-slate-50 drop-shadow rounded-sm"
    >
      <h2
        className={cn(
          "w-full py-5 px-10",
          " border-b-4 border-b-white",
          "font-semibold text-xl",
        )}
      >
        Last Orders
      </h2>
      <div className="w-full">
        <div
          className={cn(
            "w-full py-5 px-10",
            "grid grid-cols-[repeat(5,1fr)_4rem] gap-5",
            "border-b-4 border-b-white",
            "font-medium bg-slate-100",
          )}
        >
          <div>Order Number</div>
          <div>Date</div>
          <div>Price</div>
          <div>Email</div>
          <div>Status</div>
          <div></div>
        </div>
        <div className="grid grid-rows-[auto]">
          {data?.map((order) => (
            <OrderCardAdmin key={order.id} order={order} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
