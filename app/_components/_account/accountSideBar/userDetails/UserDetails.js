"use client";

import { useUserProfile } from "@/hooks/useUSerProfile";
import UserAvatar from "./UserAvatar";

export default function UserDetails({}) {
  const session = useUserProfile();

  const userName = session?.profile?.display_name;
  const userEmail = session?.profile?.email || "";

  return (
    <div className="flex items-center justify-start gap-5">
      <div>
        <UserAvatar />
      </div>
      <div className="flex flex-col text-dark-500 text-sm">
        <span className="font-semibold md:font-bold">{userName}</span>
        <span className="text-dark-400 text-xs md:text-sm">{userEmail}</span>
        <span className="text-dark-400 text-xs md:text-sm">
          Customer discount 7%
        </span>
      </div>
    </div>
  );
}
