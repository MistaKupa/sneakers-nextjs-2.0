import ProductDetails from "@/_components/_admin/detailsProduct/ProductDetails";
import { getProductDetailsServer } from "@/app/_lib/admin-service-server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const numId = Number(productId);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 } },
  });

  await queryClient.prefetchQuery({
    queryKey: ["product", numId],
    queryFn: () => getProductDetailsServer(numId),
  });

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetails productId={numId} />
      </HydrationBoundary>
    </div>
  );
}
