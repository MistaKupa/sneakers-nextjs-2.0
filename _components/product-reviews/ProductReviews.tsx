"use client";

import { cn } from "@/app/_lib/utils";
import { IoStarSharp } from "react-icons/io5";
import StarsPercentage from "./StarsPercentage";
import ReviewCard from "./ReviewCard";
import { ProductId } from "@/types/product.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductReviewsClient } from "@/app/_lib/data-service-client";
import { useEffect, useRef } from "react";

export default function ProductReviews({
  productId,
}: {
  productId: ProductId;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews", productId],
      queryFn: ({ pageParam }) => getProductReviewsClient(productId, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const allReviews = data?.pages.flatMap((page) => page.reviews) ?? [];

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!data || allReviews.length === 0) {
    return (
      <div className="flex w-full flex-col gap-8 xl:gap-12">
        <h4 className="text-2xl font-semibold">Product Reviews</h4>
        <p className="text-dark-400">
          There are no reviews for this product yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8 xl:gap-12">
      <h4 className="text-2xl font-semibold">Product Reviews</h4>

      <div
        className={cn(
          "flex flex-col gap-8",
          "md:gap-10",
          "lg:grid lg:grid-cols-3",
        )}
      >
        <div
          className={cn("w-full", "border-b-2 pb-5", "lg:border-b-0 lg:pb-0")}
        >
          <StarsPercentage />
        </div>

        <div
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            "border-b-2 pb-5",
            "lg:border-b-0 lg:pb-0",
          )}
        >
          <h5 className="text-xl font-semibold">Total Reviews</h5>
          <span className="text-dark-400">5K+ Reviews</span>
        </div>

        <div
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            "border-b-2 pb-5",
            "lg:border-b-0 lg:pb-0",
          )}
        >
          <h5 className="text-xl font-semibold">Average Rating</h5>
          <div className="flex gap-1">
            <span className="text-dark-400">4.5</span>
            <IoStarSharp size={19} className="text-amber-400" />
          </div>
        </div>
      </div>

      <div>
        <h6 className="mb-5 text-lg font-semibold">Reviews</h6>

        <div className="grid gap-x-5 gap-y-10 lg:grid-cols-3">
          {allReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div ref={loadMoreRef} />
        {isFetchingNextPage && (
          <span className="mt-4 block text-center text-dark-400">
            Loading more...
          </span>
        )}
      </div>
    </div>
  );
}
