"use client";

import { cn } from "@/app/_lib/utils";
import StarsPercentage from "./StarsPercentage";
import ReviewCard from "./ReviewCard";
import { ProductId } from "@/types/product.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductReviewsClient } from "@/app/_lib/data-service-client";
import { useEffect, useRef, useState } from "react";
import TotalReviews from "./TotalReviews";
import AverageRating from "./AverageRating";
import AddReviewForm from "./AddReviewForm";
import AddReviewModal from "./AddReviewModal";

export default function ProductReviews({
  productId,
  productImage,
  productTitle,
}: {
  productId: ProductId;
  productImage: string;
  productTitle: string;
}) {
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews", productId],
      queryFn: ({ pageParam }) => getProductReviewsClient(productId, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const allReviews = data?.pages.flatMap((page) => page.reviews) ?? [];

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // INFINITE LOAD
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

  return (
    <>
      <div className="flex w-full flex-col gap-8 xl:gap-20">
        <h4 className="text-2xl font-semibold">Product Reviews</h4>

        <div
          className={cn(
            "flex flex-col gap-8",
            "md:gap-10",
            "lg:grid lg:grid-cols-3 lg:gap-0",
          )}
        >
          <div
            className={cn(
              "w-full",
              "border-b-2 pb-5",
              "lg:border-b-0 lg:pb-0 lg:border-r-2",
            )}
          >
            <StarsPercentage productId={productId} />
          </div>

          <div
            className={cn(
              "flex items-center justify-center",
              "border-b-2 pb-5",
              "lg:border-b-0 lg:pb-0 lg:border-r-2",
            )}
          >
            <TotalReviews productId={productId} />
          </div>

          <div
            className={cn(
              "flex flex-col items-center justify-center gap-1",
              "border-b-2 pb-5",
              "lg:border-b-0 lg:pb-0",
            )}
          >
            <AverageRating productId={productId} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center pb-5 border-b-2">
            <h6 className="text-lg font-semibold">Reviews</h6>
            <button
              type="button"
              className="px-3 py-1.5 bg-newPrimary rounded-lg font-medium text-dark-200"
              onClick={() => setIsAddReviewOpen(true)}
            >
              Add Review
            </button>
          </div>

          {allReviews.length === 0 ? (
            <p className="py-10 text-center text-dark-400">
              There are no reviews for this product yet.
            </p>
          ) : (
            <>
              <div className="w-full grid gap-x-5 gap-y-10 lg:grid-cols-3 pb-10">
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
            </>
          )}
        </div>
      </div>
      <AddReviewModal
        productId={productId}
        productImage={productImage}
        productTitle={productTitle}
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
      />
    </>
  );
}
