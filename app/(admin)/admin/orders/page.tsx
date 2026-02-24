import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LastOrders from "../../../../_components/_admin/LastOrders";
import { getOrdersServer } from "@/app/_lib/admin-service-server";

export default async function Orders() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrdersServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LastOrders />
    </HydrationBoundary>
  );
}
