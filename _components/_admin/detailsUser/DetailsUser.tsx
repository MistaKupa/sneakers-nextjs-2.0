"use client";

import { getUserDetailsClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { UserId } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import BasicInfoForm from "./BasicInfoForm";
import IdentityAccess from "./IdentityAccess";
import PersonalDetails from "./PersonalDetails";

export default function DetailsUser({ userId }: { userId: UserId }) {
  const {
    data: userData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetailsClient(userId),
  });

  if (isPending) {
    return <p className="text-gray-400">Fetching products...</p>;
  }

  if (error)
    return (
      <div className="flex items-center justify-center text-red-500">
        Failed to load data.
      </div>
    );

  const formatedDate = format(new Date(userData.created_at), "dd/MM/yyyy");

  return (
    <div
      className={cn(
        "w-full h-full",
        "flex flex-col gap-16",

        "lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-y-10",
        "lg:[grid-template-areas:'avatar_topdetail''avatar_botdetail']",
      )}
    >
      {/*BASIC INFO FORM*/}
      <div className="w-full h-full flex justify-center lg:[grid-area:avatar] ">
        <BasicInfoForm userId={userId} data={userData} />
      </div>

      {/* Identity & Access */}
      <div className="lg:[grid-area:topdetail] w-full h-full">
        <IdentityAccess userId={userId} data={userData} />
      </div>

      {/* Personal Details */}
      <div className="lg:[grid-area:botdetail] w-full h-full">
        <PersonalDetails userId={userId} data={userData} />
      </div>
    </div>
  );
}
