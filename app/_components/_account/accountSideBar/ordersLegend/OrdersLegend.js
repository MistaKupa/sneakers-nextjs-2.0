"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IoEllipseOutline } from "react-icons/io5";

const orderStatuses = [
  { label: "New", color: "text-green-500", key: "new" },
  { label: "Pending", color: "text-amber-500", key: "pending" },
  { label: "Accepted", color: "text-blue-500", key: "accepted" },
  { label: "Packed", color: "text-gray-500", key: "packed" },
  { label: "Sent", color: "text-black", key: "sent" },
  { label: "Canceled", color: "text-red-500", key: "canceled" },
];

export default function OrdersLegend() {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  const [selectedStatus, setSelectedStatus] = useState("new");

  // const handleClick = (statusKey) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("status", statusKey);
  //   router.push(`?${params.toString()}`);
  // };

  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex justify-start">
        <ul className="text-dark-500 flex flex-col gap-2 items-start">
          {orderStatuses.map(({ label, color, key }) => (
            <li key={key}>
              <Link
                href={`/main/account/myOrders?status=${key}`}
                onClick={() => {
                  setSelectedStatus(key);
                  // handleClick(key);
                }}
                className={`flex items-center justify-center gap-3 hover:underline hover:underline-offset-2 ${
                  selectedStatus === key ? `${color} font-semibold` : ""
                }`}
              >
                <IoEllipseOutline size={21} className={color} />

                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
