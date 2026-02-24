"use client";

import { getUserDetailsClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { UserId } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";

export default function Details({ userId }: { userId: UserId }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetailsClient(userId),
  });

  const formatedDate = format(new Date(data.created_at), "dd/MM/yyyy");

  return (
    <div
      className={cn(
        "w-full h-full",
        "grid grid-cols-2 grid-rows-2 gap-y-10",
        "[grid-template-areas:'avatar_topdetail''avatar_botdetail']",
      )}
    >
      {/*AVATAR CARD*/}
      <div className="w-full h-full [grid-area:avatar] flex justify-center">
        <div className="flex flex-col gap-8 bg-slate-50 w-3/5 rounded drop-shadow">
          <div className="relative w-full h-full">
            <Image
              src={
                data.avatar_url
                  ? data.avatar_url
                  : "/images/default-profile-detail-admin-picture.png"
              }
              alt="User profile picture"
              fill
              className="object-cover rounded-t"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col h-full justify-between px-10 pb-8">
            <div className="flex justify-between">
              <h1 className="font-bold text-xl">{data.display_name}</h1>

              <span className="text-slate-400 font-light break-words text-right">
                {userId}
              </span>
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex justify-between gap-16">
                <h2 className="w-full border-b ">{data.display_name}</h2>
                <span className="w-full border-b ">{data.user_phone}</span>
              </div>

              <span className="border-b ">{data.email}</span>
            </div>
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-10 py-1.5 rounded-full font-semibold text-slate-50">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Identity & Access */}
      <div className="[grid-area:topdetail] w-full h-full">
        <div className="w-11/12 h-full bg-slate-50 rounded drop-shadow flex flex-col gap-8">
          <h2 className="text-xl font-bold border-b px-16 py-5">
            Identity & Access
          </h2>
          <div className="px-16 flex flex-col gap-12 h-full ">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Gender</h3>
                <span className="capitalize">{data.gender}</span>
              </div>
              <button className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-6 py-1 text-slate-50 font-semibold rounded-full">
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Role</h3>
                <span className="capitalize">{data.role}</span>
              </div>
              <button className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-6 py-1 text-slate-50 font-semibold rounded-full">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="[grid-area:botdetail] w-full h-full">
        <div className="w-11/12 h-full bg-slate-50 rounded drop-shadow flex flex-col gap-8">
          <h2 className="text-xl font-bold border-b px-16 py-5">
            Personal Details
          </h2>
          <div className="px-16 flex flex-col gap-12 h-full ">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Birth date</h3>
                <span className="capitalize">{data.birth_date}</span>
              </div>
              <button className="hidden bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-6 py-1 text-slate-50 font-semibold rounded-full">
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Full name</h3>
                <span className="capitalize">{data.display_name}</span>
              </div>
              <button className="bg-gradient-to-r from-newPrimary to-newPrimaryGradient px-6 py-1 text-slate-50 font-semibold rounded-full">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
