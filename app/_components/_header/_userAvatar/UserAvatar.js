"use client";

import Image from "next/image";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { useUserProfile } from "@/hooks/useUSerProfile";
import { AnimatePresence, motion } from "framer-motion";
import AvatarMenu from "./AvatarMenu";
import AvatarMenuMobile from "./AvatarMenuMobile";

export default function UserAvatar({ openMenu, setOpenMenu }) {
  const session = useUserProfile();
  const isAuthenticated = !!session?.profile;

  const userName = session?.profile?.display_name || "Guest Guest";
  const userInitials = userName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const userImage = session?.profile?.avatar_url;

  const isOpen = openMenu === "avatar";

  return (
    <div className=" flex items-center justify-center rounded-full relative">
      {isAuthenticated ? (
        <button
          className="rounded-full"
          onClick={() => setOpenMenu(isOpen ? null : "avatar")}
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
        </button>
      ) : (
        <Link href="/login">
          <IoPersonOutline
            size={27}
            className="text-dark-500 hover:text-newPrimary  transition-all duration-300"
          />
        </Link>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="avatarPopupMobile"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden w-full h-screen absolute top-28 left-0 z-50"
              onClick={closeMenu}
            >
              <AvatarMenuMobile session={session} />
            </motion.div>
            <motion.div
              key="avatarPopup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block absolute top-24 md:right-5 lg:right-5 z-50"
            >
              <AvatarMenu session={session} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
