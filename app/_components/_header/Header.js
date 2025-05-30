"use client";

import useProfileUpsert from "@/hooks/useProfileUpsert";
import { useState } from "react";
import CartIcon from "./_cartIcon/CartIcon";
import LogoBlack from "./_navigation/LogoBlack";
import Navigation from "./_navigation/Navigation";
import UserAvatar from "./_userAvatar/UserAvatar";

export default function Header({}) {
  useProfileUpsert();

  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="relative h-28 w-full flex justify-between items-center px-5 border-b md:px-10 lg:px-20 ">
      <div className="flex h-28 items-center md:justify-between md:gap-10 lg:gap-28">
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:transform-none w-24 sm:w-32 md:w-24 lg:w-32">
          <LogoBlack />
        </div>

        <Navigation openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>

      <div className="flex items-center justify-end gap-5 sm:gap-8 lg:gap-16">
        <CartIcon />

        <div>
          <UserAvatar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
      </div>
    </header>
  );
}
