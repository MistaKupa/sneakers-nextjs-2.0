"use client";

import { cn } from "@/app/_lib/utils";
import UserCard from "./UserCard";
import { useQuery } from "@tanstack/react-query";
import { getUsersClient } from "@/app/_lib/admin-service-client";

export default function UsersTable() {
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersClient,
  });

  return (
    <div className="bg-slate-50 drop-shadow rounded-sm">
      <h2
        className={cn(
          "w-full py-5 px-5",
          "border-b-4 border-b-white",
          "font-semibold text-xl",

          "xl:px-10",
        )}
      >
        Users
      </h2>
      <div className="w-full">
        <div
          className={cn(
            "hidden",
            "w-full py-5 px-5 lg:px-10",
            "border-b-4 border-b-white",
            "font-medium bg-slate-100",

            "lg:grid lg:grid-cols-[repeat(6,1fr)_4rem] lg:gap-5",
          )}
        >
          <div>User ID</div>
          <div>Display Name</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Gender</div>
          <div>Role</div>
          <div></div>
        </div>
        <div className="grid grid-rows-[auto]">
          {data?.map((user) => (
            <UserCard key={user.user_id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
