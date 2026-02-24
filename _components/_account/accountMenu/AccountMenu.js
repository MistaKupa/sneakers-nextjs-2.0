"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountMenu() {
  const pathName = usePathname();

  return (
    <div className="absolute -top-12 left-1">
      <ul className="flex gap-2 font-medium">
        <li
          className={`flex justify-center items-center w-32 md:w-44 h-12 rounded-t-md ${
            pathName.startsWith("/main/account/myOrders")
              ? "text-dark-500 bg-dark-100"
              : "text-white bg-dark-400"
          } `}
        >
          <Link href="/main/account/myOrders">My Orders</Link>
        </li>
        {/* <li className="flex justify-center items-center w-44 h-12 rounded-t-md text-white bg-dark-400">
          <Link href="">Bought Products</Link>
        </li> */}
        <li
          className={`flex justify-center items-center w-32 md:w-44 h-12 rounded-t-md ${
            pathName === "/main/account/accountSettings"
              ? "text-dark-500 bg-dark-100"
              : "text-white bg-dark-400"
          } `}
        >
          <Link href="/main/account/accountSettings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
