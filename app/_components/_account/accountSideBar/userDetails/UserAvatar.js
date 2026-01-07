"use client";

import { useUserProfile } from "@/hooks/useUSerProfile";
import Image from "next/image";

export default function UserAvatar({}) {
  const session = useUserProfile();

  const userName = session?.profile?.display_name;

  const userInitials = userName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const userImage = session?.profile?.avatar_url;
  return (
    <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-newPrimary text-newWhite rounded-full">
      {userImage ? (
        <Image
          src={userImage}
          alt={session?.profile?.display_name || "User"}
          width={50}
          height={50}
          quality={80}
          referrerPolicy="no-referrer"
          className="rounded-full w-full h-full object-cover"
        />
      ) : (
        <span>{userInitials}</span>
      )}
    </div>
  );
}
