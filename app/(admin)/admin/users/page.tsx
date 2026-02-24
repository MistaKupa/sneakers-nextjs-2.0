import UsersTable from "@/_components/_admin/UsersTable";
import { getUsersServer } from "@/app/_lib/admin-service-server";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Users() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUsersServer,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersTable />
      </HydrationBoundary>
    </div>
  );
}
