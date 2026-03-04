"use client";

import { cn } from "@/app/_lib/utils";
import { UserCardData } from "@/types/user.types";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCopyOutline, IoEyeOutline, IoTrashOutline } from "react-icons/io5";

export default function UserCard({ user }: { user: UserCardData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={cn(
        "p-5",
        "flex flex-col gap-3",
        "border-b-2 last:border-0",

        "md:gap-6",

        "xl:grid xl:grid-cols-[repeat(6,1fr)_4rem] xl:gap-10 xl:items-center",
        "xl:h-36 xl:px-10 bg-slate-50",
      )}
    >
      <div
        className={cn(
          "font-extrabold border-b pb-3",
          "xl:font-normal xl:border-0 xl:pb-0",
        )}
      >
        {user.user_id}
      </div>

      <div className="font-semibold xl:font-normal">{user.display_name}</div>
      <div
        className={cn(
          "min-w-0",
          "group cursor-pointer",
          "flex items-center gap-2",
        )}
        onClick={() => {
          navigator.clipboard.writeText(user.email);
          toast.success("Email successfully copied!");
        }}
        title={`Click to copy phone: ${user.email}`}
      >
        <span className="truncate group-hover:font-medium">{user.email}</span>
        <button
          className={cn(
            "p-1",
            "bg-slate-200 opacity-0",
            "rounded",
            "group-hover:opacity-100",
            "disabled:cursor-wait",
            "transition-all duration-300",
          )}
        >
          <IoCopyOutline size={14} />
        </button>
      </div>

      <div
        className={cn(
          "min-w-0",
          "group cursor-pointer",
          "flex items-center gap-2",
        )}
        onClick={() => {
          navigator.clipboard.writeText(user.user_phone);
          toast.success("Phone number successfully copied!");
        }}
        title={`Click to copy phone: ${user.user_phone}`}
      >
        {user.user_phone ? (
          <>
            <span className="truncate group-hover:font-medium">
              {user.user_phone}
            </span>
            <button
              className={cn(
                "p-1",
                "bg-slate-200 opacity-0",
                "rounded",
                "group-hover:opacity-100",
                "disabled:cursor-wait",
                "transition-all duration-300",
              )}
            >
              <IoCopyOutline size={14} />
            </button>
          </>
        ) : (
          <span className="">&mdash;</span>
        )}
      </div>

      <div
        className={cn(
          "relative",
          "group cursor-pointer",
          "flex items-center gap-2",
        )}
      >
        <span className={cn("capitalize", "group-hover:font-medium")}>
          {user.gender}
        </span>
      </div>
      <div>{user.role}</div>
      <div className="flex justify-between">
        <Link
          href={`/admin/users/${user.user_id}`}
          className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300"
        >
          <IoEyeOutline />
        </Link>
        <button className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300">
          <IoTrashOutline />
        </button>
      </div>

      {isModalOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50",
            "flex items-center justify-center",
            "bg-black/50",
          )}
        >
          <div
            className={cn(
              "",
              "w-96 h-36 p-5",
              "flex flex-col justify-between items-center",
              "bg-slate-100 shadow-sm",
              "rounded",
            )}
          >
            <p>
              Are you sure you want to delete user
              <span className="font-bold">5</span>?
            </p>
            <div className="flex gap-5">
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className={cn(
                  "w-24 h-8",
                  "bg-slate-300",
                  "rounded",
                  "font-semibold",
                  "hover:bg-slate-400 hover:text-slate-100",
                  "transition-all duration-300",
                )}
              >
                Cancel
              </button>
              <button
                onClick={() => {}}
                className={cn(
                  "w-24 h-8",
                  "bg-red-500",
                  "rounded",
                  "font-bold uppercase text-slate-100",
                  "hover:bg-red-700",
                  "transition-all duration-300",
                )}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
