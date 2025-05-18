import { getUserOrders } from "@/app/_lib/data-service";
import { useUserProfile } from "@/hooks/useUSerProfile";
import OrderCard from "./OrderCard";
import OrderCardMobile from "./OrderCardMobile";
import React from "react";

export default async function AccountOrders({ searchParams }) {
  const sParams = await searchParams;
  const status = sParams?.status;

  const orders = await getUserOrders();

  const filteredOrders = status
    ? orders.filter((order) => order.status === status)
    : orders;

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-dark-500 text-3xl font-bold">My Orders</h2>
      <div className="flex flex-col gap-5 justify-center">
        <div className="hidden xl:grid xl:grid-cols-5 items-center border-b-8 h-12 text-dark-400">
          <span className="col-start-1">Order Number</span>
          <span className="col-start-2 col-span-2">Date</span>
          <span className="col-start-4 col-span-2">Price</span>
        </div>
        <div className="grid grid-rows-[auto]">
          {filteredOrders.map((order) => (
            <React.Fragment key={order.id}>
              <div className="block xl:hidden">
                <OrderCardMobile order={order} />
              </div>
              <div className="hidden xl:block">
                <OrderCard order={order} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
