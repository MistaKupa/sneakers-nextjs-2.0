"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";

import { motion } from "motion/react";
import { useState } from "react";
import { login, loginWithGoogle } from "./actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const result = await login(new FormData(e.target));

    if (result?.error) {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.div
        layoutId="loginRegisterBg"
        initial={{ rotate: -12 }}
        animate={{ rotate: -12 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute -top-48 -right-10 w-[2200px] h-[500px] -z-10"
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
          key="loginForm"
          layoutId="loginRegisterForm"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: errorMessage ? [0, -10, 10, -10, 10, 0] : 0,
          }}
          transition={{
            duration: 0.3,
            type: errorMessage ? "" : "spring",
            stiffness: 100,
          }}
          className="bg-dark-100 w-7/8 md:w-[33rem] md:h-[40rem] flex flex-col justify-between shadow-xl rounded-lg gap-10 p-1 pt-16"
        >
          <div className="flex flex-col gap-8 px-5 md:px-20">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 w-full"
            >
              <div>
                <h3 className="text-center text-dark-500 text-3xl font-semibold">
                  Sign in to your account
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                <span className="h-5">
                  {errorMessage && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-red-500"
                    >
                      {errorMessage}
                    </motion.span>
                  )}
                </span>

                <label
                  htmlFor="email"
                  className="text-dark-500 font-medium flex flex-col gap-1"
                >
                  Email
                  <input
                    value={email}
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email..."
                    className="rounded-md px-2 h-12 bg-dark-100 font-normal outline-newPrimary border"
                  />
                </label>
                <label
                  htmlFor="password"
                  className="text-dark-500 font-medium flex flex-col gap-1"
                >
                  Password
                  <input
                    value={password}
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password..."
                    className="rounded-md px-2 h-12 bg-dark-100 font-normal outline-newPrimary border"
                  />
                </label>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                // formAction={login}
                className="w-full bg-newPrimary text-newWhite h-10 rounded-md"
              >
                Sign in
              </motion.button>
            </form>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={() => signIn("google")}
              className="w-full bg-newPrimary text-newWhite h-10 rounded-md flex items-center justify-center gap-2"
            >
              Sign in with Google
              <Image
                src="/images/google_logo.png"
                alt="Google"
                width={25}
                height={25}
              />
            </motion.button> */}
          </div>

          <div className="w-full h-14 rounded-b-lg flex items-center justify-center gap-1 bg-dark-200 text-sm">
            New to Sneakers?
            <Link
              href="/signUp"
              className="text-newPrimary font-semibold hover:text-dark-500 transition-all duration-150"
            >
              Create account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
