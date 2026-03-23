"use client";

import { getProductReviewStatsClient } from "@/app/_lib/data-service-client";
import { ProductId } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";
import { IoStarSharp } from "react-icons/io5";

export default function AverageRating({ productId }: { productId: ProductId }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["reviewStats", productId],
    queryFn: () => getProductReviewStatsClient(productId),
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="w-36 h-7 bg-gray-200 animate-pulse rounded-full" />
        <div className="w-11 h-6 bg-gray-200 animate-pulse rounded-full" />
      </div>
    );
  }

  if (error)
    return (
      <div className="flex items-center justify-center text-red-500">
        Failed to load data.
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <h5 className="text-xl font-semibold">Average Rating</h5>
      <div className="flex gap-1">
        <span className="text-dark-400">{data.average}</span>
        <IoStarSharp size={19} className="text-amber-400" />
      </div>
    </div>
  );
}
