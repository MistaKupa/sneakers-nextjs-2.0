"use client";

import { useUserProfile } from "@/hooks/useUSerProfile";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  IoHomeOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";

export default function AvatarAdmin() {
  const session = useUserProfile();
  const isAuthenticated = !!session?.profile;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userName: string = session?.profile?.display_name || "Guest Guest";
  const userInitials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const userImage: string = session?.profile?.avatar_url ?? "";

  return (
    <>
      {isAuthenticated ? (
        <button
          className="relative rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          {userImage ? (
            <Image
              src={userImage}
              alt={session.profile.display_name || "User"}
              width={50}
              height={50}
              quality={80}
              referrerPolicy="no-referrer"
              className="rounded-full w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-transparent hover:border-2 hover:border-newPrimary transition-all duration-300 object-cover"
            />
          ) : (
            <span className="flex items-center justify-center bg-newPrimary border rounded-full w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-newWhite sm:font-semibold hover:border-newPrimary hover:bg-opacity-95">
              {userInitials}
            </span>
          )}
          {isOpen && (
            <div className="absolute top-14 right-0 flex flex-col gap-3 bg-slate-50 drop-shadow-sm border min-w-44 p-5 rounded-b">
              <div className="flex flex-col border-b pb-6">
                <span className="font-semibold">{userName}</span>
                <span className="text-xs font-light text-dark-300 capitalize">
                  {session.profile.role}
                </span>
              </div>
              <Link
                className="flex gap-4 hover:text-newPrimary transition-all duration-200 border-b pb-2"
                href="/main"
              >
                <IoHomeOutline size={20} />
                <span>To Main</span>
              </Link>
              <Link
                className="flex gap-4 hover:text-newPrimary transition-all duration-200"
                href="/logout"
              >
                <IoLogOutOutline size={20} />
                <span>Logout</span>
              </Link>
            </div>
          )}{" "}
        </button>
      ) : (
        <Link href="/login">
          <IoPersonOutline
            size={27}
            className="text-dark-500 hover:text-newPrimary  transition-all duration-300"
          />
        </Link>
      )}
    </>
  );
}
