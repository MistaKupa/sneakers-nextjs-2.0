import Details from "@/_components/_admin/Details";
import { getUserDetailsServer } from "@/app/_lib/admin-service-server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function UserDetails({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 } },
  });

  await queryClient.fetchQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetailsServer(userId),
  });

  return (
    <div className="w-full h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Details userId={userId} />
      </HydrationBoundary>
    </div>
  );
}
