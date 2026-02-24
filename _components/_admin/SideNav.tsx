"use client";

import { cn } from "@/app/_lib/utils";
import { ADMIN_NAV_LINKS } from "@/data/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoHomeOutline,
  IoLayersOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { TfiPackage } from "react-icons/tfi";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <header
      className={cn("w-full h-full", "flex flex-col gap-10", "bg-dark-500")}
    >
      <div className="shadow-black/15 shadow-md p-5">
        <Image
          src="/images/logo_white.svg"
          alt="Sneakers Logo"
          width={150}
          height={22}
        />
      </div>
      <nav className="px-5">
        <ul
          className="flex flex-col gap-5
        "
        >
          {ADMIN_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <li
                key={link.href}
                className={cn(
                  "transition-all duration-300",
                  link.linkHover,
                  isActive
                    ? `${link.activeColor} font-medium`
                    : "text-dark-100 ",
                )}
              >
                <Link href={link.href} className="flex gap-3 items-center">
                  <Icon className="text-xl" />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
