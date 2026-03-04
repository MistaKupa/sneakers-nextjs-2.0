import ProductsTable from "@/_components/_admin/ProductsTable";
import { getAllProductsServer } from "@/app/_lib/admin-service-server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Products({}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getAllProductsServer,
  });

  return (
    <div className="">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsTable />
      </HydrationBoundary>
    </div>
  );
}
