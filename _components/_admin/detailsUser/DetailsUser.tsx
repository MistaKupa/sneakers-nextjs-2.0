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

  const formatedDate = format(new Date(userData.created_at), "dd/MM/yyyy");

  return (
    <div
      className={cn(
        "w-full h-full",
        "grid grid-cols-2 grid-rows-2 gap-y-10",
        "[grid-template-areas:'avatar_topdetail''avatar_botdetail']",
      )}
    >
      {/*BASIC INFO FORM*/}
      <div className="w-full h-full [grid-area:avatar] flex justify-center">
        <BasicInfoForm userId={userId} data={userData} />
      </div>

      {/* Identity & Access */}
      <div className="[grid-area:topdetail] w-full h-full">
        <IdentityAccess userId={userId} data={userData} />
      </div>

      {/* Personal Details */}
      <div className="[grid-area:botdetail] w-full h-full">
        <PersonalDetails userId={userId} data={userData} />
      </div>
    </div>
  );
}
