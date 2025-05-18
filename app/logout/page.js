"use client"; // Add this to specify that this is a Client Component

import { createClientInstance } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation"; // Using Next.js router for client-side navigation

function Logout() {
  const supabase = createClientInstance();
  const router = useRouter(); // useRouter for client-side navigation

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login"); // Navigate to login page after logout
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.div
        layoutId="loginRegisterBg"
        initial={{ rotate: 0 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute -top-0 -right-0 w-[2200px] h-[500px] -z-10"
      >
        <Image
          src="/images/bg-main-desktop-horizontal.png"
          alt="background"
          fill
          className="object-cover"
        />
      </motion.div>
      <div className="relative mx-auto max-w-[1440px] h-screen flex items-center justify-center">
        <div className="absolute w-9/12 h-full border -z-20"></div>
        <div className="absolute w-9/12 top-7 xl:top-10 md:right-16 lg:right-28 xl:right-36">
          <Link href="/">
            <Image
              src="/images/logo_white.svg"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        <motion.div
          key="logout"
          layoutId="loginRegisterForm"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 100,
          }}
          className="bg-dark-100 w-7/8 h-2/3 md:w-[33rem] md:h-[40rem] flex flex-col justify-center items-center gap-20 shadow-xl rounded-lg p-20"
        >
          <h5 className="text-center text-dark-500 text-2xl font-semibold">
            Are you sure you want to logout?
          </h5>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            onClick={handleLogout}
            className="w-3/4 sm:w-1/2 bg-newPrimary text-newWhite h-10 rounded-md"
          >
            Logout
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Logout;
