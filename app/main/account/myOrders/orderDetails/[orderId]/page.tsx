import Details from "@/_components/_account/accountOrders/details/Details";
import { getOrderDetailsServer } from "@/app/_lib/admin-service-server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default async function OrderDetails({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const numId = Number(orderId);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["orderDetails", numId],
    queryFn: () => getOrderDetailsServer(numId),
  });

  // if (!orderItems && !orderDetails) {
  //   console.error("Order not found!");
  //   return notFound();
  // }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-10">
        <Link
          href="/main/account/myOrders"
          className="border border-newPrimary rounded-full p-1"
        >
          <IoArrowBack size={30} className="text-newPrimary" />
        </Link>
        <h2 className="text-3xl font-light">
          Order <span className="font-semibold">{orderId}</span>
        </h2>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Details orderId={numId} />
      </HydrationBoundary>
    </div>
  );
}
