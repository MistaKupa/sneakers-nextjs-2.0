"use client";

import { getOrderDetailsClient } from "@/app/_lib/admin-service-client";
import { OrderId } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import OrderItemsCard from "./OrderItemsCard";
import { cn } from "@/app/_lib/utils";
import { orderStatusColorCode } from "@/data/constants";

export default function Details({ orderId }: { orderId: OrderId }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => getOrderDetailsClient(orderId),
  });

  if (isPending) return "Loading...";

  const { orderDetails, orderItems } = data;

  const {
    customer_name,
    customer_adress,
    customer_postal,
    customer_city,
    customer_country,
    order_date,
    total_price,
    paid,
    status,
  } = orderDetails;

  const orderDate = format(new Date(order_date), "dd/MM/yyyy");

  return (
    <div className="max-w-[1040px] flex flex-col gap-20 justify-center border-2 rounded-md p-10 md:p-16">
      <p>
        Your order <span className="font-semibold"> </span>is being prepared.
      </p>

      <div className="flex flex-col gap-10 md:grid md:grid-cols-3 justify-between px-5 md:p-0">
        <div className="border-b-2 pb-5 md:border-b-0 md:pb-0">
          <h4 className="font-semibold mb-2">Delivery adress</h4>
          <div className="flex flex-col text-sm text-dark-400">
            <span>{customer_name}</span>
            <span>{customer_adress}</span>
            <span>{`${customer_postal} ${customer_city}`}</span>
            <span>{customer_country}</span>
          </div>
        </div>

        <div className="border-b-2 pb-5 md:border-b-0 md:pb-0">
          <h4 className="font-semibold mb-2">Facturation adress</h4>
          <div className="flex flex-col text-sm text-dark-400">
            <span>{customer_name}</span>
            <span>{customer_adress}</span>
            <span>{`${customer_postal} ${customer_city}`}</span>
            <span>{customer_country}</span>
          </div>
        </div>

        <div className="border-b-2 pb-5 md:border-b-0 md:pb-0">
          <h4 className="font-semibold mb-2">Order details</h4>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Order number</span>
              <span className="font-semibold">{orderId}</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Order date</span>
              <span className="font-semibold">{orderDate}</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Delivery option</span>
              <span className="font-semibold">Placeholder</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Payment method</span>
              <span className="font-semibold">Card payment</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Payment status</span>
              <span
                className={` ${
                  paid ? "text-green-500" : "text-red-500"
                } font-semibold`}
              >
                {paid ? "Paid" : "Pending"}
              </span>
            </div>
            <div className="flex flex-col text-sm">
              <span className=" text-dark-400">Order status</span>
              <span
                className={cn(
                  "font-semibold capitalize",
                  orderStatusColorCode[status].color,
                )}
              >
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <OrderItemsCard orderItems={orderItems} totalPrice={total_price} />
    </div>
  );
}
