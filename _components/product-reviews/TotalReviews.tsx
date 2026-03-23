import { getProductReviewStatsClient } from "@/app/_lib/data-service-client";
import { ProductId } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";

export default function TotalReviews({ productId }: { productId: ProductId }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["reviewStats", productId],
    queryFn: () => getProductReviewStatsClient(productId),
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
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
      <h5 className="text-xl font-semibold">Total Reviews</h5>
      <span className="text-dark-400">{data.total} Reviews</span>
    </div>
  );
}
