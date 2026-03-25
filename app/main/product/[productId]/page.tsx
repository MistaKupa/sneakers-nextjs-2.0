import ProductDescription from "@/_components/_productDetails/ProductDescription";
import ProductImage from "@/_components/_productDetails/ProductImage";
import ProductReviews from "@/_components/product-reviews/ProductReviews";
import {
  getProduct,
  getProductReviewsServer,
  getProductReviewStatsServer,
} from "@/app/_lib/data-service-server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const numProductId = Number(productId);

  const productData = await getProduct(numProductId);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["reviews", numProductId],
      queryFn: ({ pageParam }) =>
        getProductReviewsServer(numProductId, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }),
    queryClient.prefetchQuery({
      queryKey: ["reviewStats", numProductId],
      queryFn: () => getProductReviewStatsServer(numProductId),
    }),
  ]);

  if (!productData) {
    return notFound();
  }

  const { product, sneakerSizes } = productData;

  const { images } = product;

  return (
    <div className="w-full flex flex-col gap-14 px-5 md:gap-20 lg:grid lg:grid-cols-2 lg:gap-20 lg:px-10 xl:px-5 xl:gap-y-40">
      <ProductImage product={product} />
      <ProductDescription product={product} sneakerSizes={sneakerSizes} />
      <div className="col-span-2 mt-20 xl:mt-0">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductReviews
            productId={numProductId}
            productImage={images[0]}
            productTitle={product.title}
          />
        </HydrationBoundary>
      </div>
    </div>
  );
}
