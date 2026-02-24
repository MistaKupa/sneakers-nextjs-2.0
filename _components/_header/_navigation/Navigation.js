"use client";

import navLinks from "@/data/constants";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";

const listVariants = {
  hidden: { opacity: 0, width: 0 },
  visible: {
    opacity: 1,
    width: "auto",
    transition: {
      when: "beforeChildren",
      delayChildren: 0.06,
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function Navigation({ openMenu, setOpenMenu }) {
  const pathname = usePathname();

  const isOpen = openMenu === "nav";

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/*Mobile menu button*/}
      <button
        className={`md:hidden z-50 ${isOpen ? "text-dark-500" : ""}`}
        onClick={() => setOpenMenu(isOpen ? null : "nav")}
      >
        {isOpen ? <IoCloseSharp size={25} /> : <IoMenuSharp size={25} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pt-28 fixed inset-0 z-10 md:hidden bg-dark-100"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute z-10 bg-dark-500/40 w-full h-screen "
            />
            <motion.ul className="relative z-20 w-full h-full bg-dark-100 flex flex-col items-center gap-8 py-14 text-dark-400 md:hidden">
              {navLinks.map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-center"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className={`h-full flex items-center border-b-4 transition-all duration-300 ${
                      pathname === item.href
                        ? "border-newPrimary text-dark-500"
                        : "hover:text-dark-500 border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/*Desktop nav*/}
      <nav className="h-full">
        <ul className="hidden md:flex gap-10 w-full h-full lg:text-base font-medium ">
          {navLinks.map((item, i) => (
            <li className="h-full flex items-center" key={i}>
              <Link
                href={item.href}
                className={`flex items-center border-b-4 transition-all duration-300 ${
                  pathname === item.href
                    ? "border-newPrimary text-dark-500"
                    : "hover:text-dark-500  border-transparent hover:newPrimary"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
