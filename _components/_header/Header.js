"use client";

import useProfileUpsert from "@/hooks/useProfileUpsert";
import { useGSAP } from "@gsap/react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import CartIcon from "./_cartIcon/CartIcon";
import LogoWhite from "./_navigation/LogoWhite";
import Navigation from "./_navigation/Navigation";
import UserAvatar from "./_userAvatar/UserAvatar";
import LogoBlack from "./_navigation/LogoBlack";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header({}) {
  useProfileUpsert();

  const navRef = useRef(null);
  const logoBlackRef = useRef(null);
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(null);

  const [hidden, setHidden] = useState();
  const { scrollY } = useScroll();

  const isLandingPage = pathname === "/main";
  const isLoginPage = pathname === "/login";
  const isSignUpPage = pathname === "/signUp";
  const isAdminPage = pathname.startsWith("/admin");

  const defaultNavTextColor = "text-dark-500";
  const landingPageNavDefaultTextColor = "text-dark-100";

  const [currentTextColorClass, setCurrentTextColorClass] = useState(
    isLandingPage ? landingPageNavDefaultTextColor : defaultNavTextColor,
  );

  const [logoBlackOpacity, setLogoBlackOpacity] = useState("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 250) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const variants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -75, opacity: 0 },
  };

  useGSAP(
    () => {
      if (!isLandingPage) {
        setCurrentTextColorClass(defaultNavTextColor);
        gsap.set(logoBlackRef.current, { opacity: 1 });
        return;
      }

      const sections = gsap.utils.toArray(
        document.querySelectorAll(`[class*=-section]`),
      );

      sections.forEach((section) => {
        const isWhite = section.classList.contains("white-section");

        const colorClass =
          isWhite || openMenu ? "text-dark-500" : "text-dark-100";

        ScrollTrigger.create({
          trigger: section,
          start: "top top+=112",
          onEnter: () => updateTheme(isWhite, colorClass),
          onEnterBack: () => updateTheme(isWhite, colorClass),
        });
      });

      function updateTheme(isWhite, colorClass) {
        setCurrentTextColorClass(colorClass);

        gsap.to(logoBlackRef.current, {
          opacity: isWhite || openMenu ? 1 : 0,
          duration: 0.08,
          ease: "power2.inOut",
        });
      }
    },
    { scope: navRef, dependencies: [isLandingPage, pathname, openMenu] },
  );

  let headerClasses = `fixed top-0 h-28 w-full flex justify-between items-center px-5 lg:px-10 z-20 ${currentTextColorClass}`;

  if (isLoginPage || isSignUpPage || isAdminPage) return;

  return (
    <motion.header
      ref={navRef}
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={headerClasses}
    >
      <div className="flex h-28 items-center md:justify-between md:gap-10 lg:gap-28">
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:transform-none w-24 sm:w-32 md:w-24 lg:w-32 z-20">
          <LogoWhite />
        </div>
        <div
          ref={logoBlackRef}
          className="absolute left-1/2 -translate-x-1/2 opacity-0 md:left-10 md:-translate-x-0 md:transform-none w-24 sm:w-32 md:w-24 lg:w-32 transition-all duration-300 z-20"
        >
          <LogoBlack />
        </div>

        <Navigation openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>

      <div className="flex items-center justify-end gap-5 sm:gap-8 lg:gap-16 z-10">
        <CartIcon />

        <div className="">
          <UserAvatar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
      </div>
    </motion.header>
  );
}
