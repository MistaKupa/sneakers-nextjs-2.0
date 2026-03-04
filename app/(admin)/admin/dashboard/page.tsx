import {
  getOrdersServer,
  getTotalProductsServer,
  getUsersServer,
} from "@/app/_lib/admin-service-server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LastOrders from "../../../../_components/_admin/LastOrders";
import SalesGraph from "../../../../_components/_admin/SalesGraph";
import StatCards from "../../../../_components/_admin/StatCards";
import SummaryPie from "../../../../_components/_admin/SummaryPie";
import { cn } from "@/app/_lib/utils";

export default async function Dashboard() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["orders"],
      queryFn: getOrdersServer,
    }),
    queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: getUsersServer,
    }),
    queryClient.prefetchQuery({
      queryKey: ["totalItems"],
      queryFn: getTotalProductsServer,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={cn("w-full", "flex flex-col gap-28", "xl:gap-16")}>
        <StatCards />
        <section
          className={cn(
            "h-screen",
            "flex flex-col gap-16",

            "xl:h-full",
            "xl:grid xl:grid-cols-4 xl:gap-5",
          )}
        >
          <div
            className={cn(
              "w-full h-full",
              "bg-slate-50 drop-shadow",
              "rounded-sm",
              "lg:col-span-3",
            )}
          >
            <SalesGraph />
          </div>
          <div className="h-full bg-slate-50 drop-shadow rounded-sm w-full">
            <SummaryPie />
          </div>
        </section>
        <LastOrders />
      </div>
    </HydrationBoundary>
  );
}
