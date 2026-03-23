import { getProductReviewStatsClient } from "@/app/_lib/data-service-client";
import { ProductId } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";
import { IoStarSharp } from "react-icons/io5";

export default function StarsPercentage({
  productId,
}: {
  productId: ProductId;
}) {
  const { data, isPending, error } = useQuery({
    queryKey: ["reviewStats", productId],
    queryFn: () => getProductReviewStatsClient(productId),
  });

  if (isPending) {
    <div className="flex flex-col gap-1 items-center">
      <div className="w-60 h-6 animate-pulse rounded-full bg-gray-200"></div>
      <div className="w-60 h-6 animate-pulse rounded-full bg-gray-200"></div>
      <div className="w-60 h-6 animate-pulse rounded-full bg-gray-200"></div>
      <div className="w-60 h-6 animate-pulse rounded-full bg-gray-200"></div>
      <div className="w-60 h-6 animate-pulse rounded-full bg-gray-200"></div>
    </div>;
  }

  if (error)
    return (
      <div className="flex items-center justify-center text-red-500">
        Failed to load data.
      </div>
    );

  const { starDistribution } = data;

  return (
    <div className="flex flex-col gap-1 items-center">
      {/* 5 STARS CONTAINER*/}
      {starDistribution.map((rating) => (
        <div key={rating.star} className="flex items-center gap-2">
          <span className="flex items-center">
            <span className="font-medium w-5 flex justify-center ">
              {rating.star}
            </span>
            <IoStarSharp className="text-amber-400" size={18} />
          </span>
          <div className="relative bg-slate-200 w-36 h-2 rounded-full">
            <span
              className="absolute h-full rounded-full bg-newPrimary"
              style={{ width: `${rating.percentage}%` }}
            />
          </div>

          <span className="min-w-10">{rating.percentage}%</span>
        </div>
      ))}
    </div>
  );
}
