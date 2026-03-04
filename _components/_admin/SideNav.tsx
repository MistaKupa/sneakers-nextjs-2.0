"use client";

import { useState } from "react";
import { cn } from "@/app/_lib/utils";
import { ADMIN_NAV_LINKS } from "@/data/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // alebo vaše ikony

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // NAV LINKS
  const NavLinks = () => (
    <ul className="flex flex-col gap-5">
      {ADMIN_NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        return (
          <li
            key={link.href}
            className={cn(
              "transition-all duration-300",
              link.linkHover,
              isActive ? `${link.activeColor} font-medium` : "text-dark-100",
            )}
          >
            <Link
              href={link.href}
              className="flex gap-3 items-center"
              onClick={() => setIsOpen(false)}
            >
              <Icon className="text-xl" />
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* MOBILE NAV BAR*/}
      <div className="lg:hidden flex items-center justify-between p-4 bg-dark-500 text-white">
        <Image
          src="/images/logo_white.svg"
          alt="Logo"
          width={120}
          height={20}
        />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* DEKSTOP SIDE BAR -> MOBILE NAV OVERLAY */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-dark-500 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0 lg:h-full lg:w-full",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col gap-10 h-full">
          <div className="shadow-black/15 shadow-md p-5 hidden lg:block">
            <Image
              src="/images/logo_white.svg"
              alt="Logo"
              width={150}
              height={22}
            />
          </div>

          <nav className="px-5 mt-10 lg:mt-0">
            <NavLinks />
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
