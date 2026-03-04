"use client";

import {
  getOrdersClient,
  getTotalProductsClient,
  getUsersClient,
} from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function StatCards() {
  const {
    data: orders,
    isPending: isPendingOrders,
    error: errorOrders,
  } = useQuery({ queryKey: ["orders"], queryFn: getOrdersClient });

  const {
    data: users,
    isPending: isPendingUsers,
    error: errorUsers,
  } = useQuery({ queryKey: ["users"], queryFn: getUsersClient });

  const {
    data: itemsQuantity,
    isPending: isPendingItemsQuantity,
    error: errorItemsQuantity,
  } = useQuery({ queryKey: ["totalItems"], queryFn: getTotalProductsClient });

  const allEarnings =
    orders?.reduce((acc, order) => acc + order.total_price, 0) ?? 0;
  const totalOrders = orders?.length ?? 0;

  const totalUsers = users?.length ?? 0;

  const productsSold =
    itemsQuantity?.reduce((acc, itemQ) => acc + itemQ.quantity, 0) ?? 0;

  return (
    // CONTAINER
    <section
      className={cn(
        "w-full ",
        "flex flex-col gap-10",
        "md:grid md:grid-cols-2",
        "xl:flex xl:flex-row lg:justify-between xl:gap-5",
        "text-slate-50",
      )}
    >
      {/* ALL EARNINGS */}
      <div
        className={cn(
          "w-full",
          "flex flex-col",
          "bg-gradient-to-r from-newPrimary to-newPrimaryGradient",
          "rounded-sm",
          "drop-shadow",
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center",
            "border-b-2 border-slate-50",
            "p-5",
          )}
        >
          <div className={cn("flex flex-col")}>
            <span className="text-lg font-semibold">
              €{allEarnings.toFixed(2)}
            </span>
            <span>All Earnings</span>
          </div>
          <div>Skusime Graf</div>
        </div>
        <div className={cn("px-5 py-2")}>
          <span>Update: 2.15 am</span>
        </div>
      </div>

      {/* TOTAL ORDERS */}
      <div
        className={cn(
          "w-full",
          "flex flex-col",
          "bg-gradient-to-r from-emerald-500 to-emerald-400",
          "rounded-sm",
          "drop-shadow",
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center",
            "border-b-2 border-slate-50",
            "p-5",
          )}
        >
          <div className={cn("flex flex-col")}>
            <span className="text-lg font-semibold">{totalOrders}</span>
            <span>Total Orders</span>
          </div>
          <div>Skusime Graf</div>
        </div>
        <div className={cn("px-5 py-2")}>
          <span>Update: 2.15 am</span>
        </div>
      </div>

      {/* TOTAL USERS */}
      <div
        className={cn(
          "w-full",
          "flex flex-col",
          "bg-gradient-to-r from-red-500 to-red-400",
          "rounded-sm",
          "drop-shadow",
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center",
            "border-b-2 border-slate-50",
            "p-5",
          )}
        >
          <div className={cn("flex flex-col")}>
            <span className="text-lg font-semibold">{totalUsers}</span>
            <span>Total Users</span>
          </div>
          <div>Skusime Graf</div>
        </div>
        <div className={cn("px-5 py-2")}>
          <span>Update: 2.15 am</span>
        </div>
      </div>

      {/* PRODUCTS SOLD */}
      <div
        className={cn(
          "w-full",
          "flex flex-col",
          "bg-gradient-to-r from-blue-500 to-blue-400",
          "rounded-sm",
          "drop-shadow",
        )}
      >
        <div
          className={cn(
            "flex justify-between items-center",
            "border-b-2 border-slate-50",
            "p-5",
          )}
        >
          <div className={cn("flex flex-col")}>
            <span className="text-lg font-semibold">{productsSold}</span>
            <span>Products Sold</span>
          </div>
          <div>Skusime Graf</div>
        </div>
        <div className={cn("px-5 py-2")}>
          <span>Update: 2.15 am</span>
        </div>
      </div>
    </section>
  );
}
