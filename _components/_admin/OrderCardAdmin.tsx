"use client";

import {
  deleteClientOrder,
  updateOrder,
} from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { ORDER_STATUS_LIST, orderStatusColorCode } from "@/data/constants";
import { OrderId, OrderStatus } from "@/types/order.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import Link from "next/link";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  IoCopyOutline,
  IoEyeOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

export default function OrderCardAdmin({ order }) {
  const queryClient = useQueryClient();

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: changeStatus, isPending: changingStatus } = useMutation({
    mutationFn: updateOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status successfully updated!");
    },

    onError: () => {
      toast.error("Couldnt update order status!");
    },
  });

  const { mutate: deleteOrder, isPending: deletingOrder } = useMutation({
    mutationFn: deleteClientOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order has been deleted!");
    },

    onError: () => {
      toast.error("Order could not be deleted!");
    },
  });

  const formatedOrderDate = formatDate(
    new Date(order.order_date),
    "dd/MM/yyyy",
  );

  const handleStatusChange = (clickedStatus: OrderStatus) => {
    changeStatus({
      id: order.id,
      changes: { status: clickedStatus },
    });

    setIsStatusOpen(false);
  };

  const handleOrderDelete = (orderId: OrderId) => {
    deleteOrder(orderId);

    setIsModalOpen(false);
  };

  return (
    <>
      <div
        key={order.id}
        className={cn(
          "h-14 px-10",
          "grid grid-cols-[repeat(5,1fr)_4rem] gap-10 items-center",
          "border-b-2 last:border-0 ",
          {
            "opacity-75 bg-slate-200 cursor-wait": changingStatus,
          },
        )}
      >
        <div>{order.id}</div>
        <div>{formatedOrderDate}</div>
        <div>€{order.total_price.toFixed(2)}</div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(order.customer_email);
            toast.success("Email successfully copied!");
          }}
          title={`Click to copy email: ${order.customer_email}`}
          className={cn(
            "min-w-0",
            "group cursor-pointer",
            "flex items-center gap-2",
            {
              "cursor-wait": changingStatus,
            },
          )}
        >
          <span className="truncate group-hover:font-medium ">
            {order.customer_email}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(order.customer_email)}
            className={cn(
              "p-1",
              "bg-slate-200 opacity-0",
              "rounded",
              "group-hover:opacity-100",
              "disabled:cursor-wait",
              "transition-all duration-300",
            )}
            disabled={changingStatus}
          >
            <IoCopyOutline size={14} />
          </button>
        </div>

        <div
          className={cn(
            "relative",
            "group cursor-pointer",
            "flex items-center gap-2",
          )}
        >
          <span
            className={cn(
              orderStatusColorCode[order.status].color,
              "capitalize",
              "group-hover:font-medium",
              {
                "cursor-wait": changingStatus,
              },
            )}
          >
            {order.status}
          </span>
          <button
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className={cn(
              "p-1",
              "bg-slate-200 opacity-0",
              "rounded",
              "group-hover:opacity-100",
              "disabled:cursor-wait",
              "transition-all duration-300",
            )}
            disabled={changingStatus}
          >
            <IoPencilOutline size={14} />
          </button>
          {isStatusOpen && (
            <div
              className={cn(
                "absolute top-9 z-10",
                "flex flex-col gap-2",
                "bg-slate-100 drop-shadow",
                "border border-slate-300 rounded-sm",
              )}
            >
              {ORDER_STATUS_LIST.map((status) => {
                if (status === order.status) return null;

                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={cn(
                      "flex px-2 py-1",
                      `hover:bg-slate-200 hover:font-medium ${orderStatusColorCode[status].hoverColor}`,
                      "transition-all duration-300",
                    )}
                    disabled={changingStatus}
                  >
                    <span className={cn("capitalize")}>{status}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <Link
            href={`/admin/orders/${order.id}`}
            className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300"
          >
            <IoEyeOutline />
          </Link>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300"
          >
            <IoTrashOutline />
          </button>
        </div>

        {isModalOpen && (
          <div
            className={cn(
              "fixed inset-0 z-50",
              "flex items-center justify-center",
              "bg-black/50",
            )}
          >
            <div
              className={cn(
                "",
                "w-96 h-36 p-5",
                "flex flex-col justify-between items-center",
                "bg-slate-100 shadow-sm",
                "rounded",
              )}
            >
              <p>
                Are you sure you want to delete order{" "}
                <span className="font-bold">{order.id}</span>?
              </p>
              <div className="flex gap-5">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className={cn(
                    "w-24 h-8",
                    "bg-slate-300",
                    "rounded",
                    "font-semibold",
                    "hover:bg-slate-400 hover:text-slate-100",
                    "transition-all duration-300",
                  )}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleOrderDelete(order.id)}
                  className={cn(
                    "w-24 h-8",
                    "bg-red-500",
                    "rounded",
                    "font-bold uppercase text-slate-100",
                    "hover:bg-red-700",
                    "transition-all duration-300",
                  )}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
