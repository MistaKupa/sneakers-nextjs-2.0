"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUpUser } from "../_lib/account-service";

// import VerifyAccount from "../_components/verifyAccount/VerifyAccount";

import dynamic from "next/dynamic";

// Load VerifyAccount without SSR
const VerifyAccount = dynamic(
  () => import("../_components/verifyAccount/VerifyAccount"),
  { ssr: false }
);

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const [verify, setVerify] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (data) => {
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("displayName", data.displayName);
    // }

    const result = await signUpUser(data);

    if (!result.success) {
      console.error(result.error);
      reset();
      return;
    }

    setEmail(data.email);
    setVerify(true);
    reset();
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div
        layoutId="loginRegisterBg"
        initial={{ rotate: -12 }}
        animate={{ rotate: -12 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute top-[40rem] -right-24 w-[2200px] h-[500px] -z-10"
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
              src="/images/logo_black.svg"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        <motion.div
          key="registerAccountForm"
          layoutId="loginRegisterForm"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: errors.email || errors.password ? [0, -10, 10, -10, 10, 0] : 0,
          }}
          transition={{
            duration: 0.3,
            type: errors.email || errors.password ? "" : "spring",
            stiffness: 100,
          }}
          className="bg-dark-100  w-7/8 md:w-[33rem] md:h-[40rem] flex flex-col justify-between shadow-xl drop-shadow-2xl rounded-lg pt-14 px-1 pb-1"
        >
          {verify ? (
            <VerifyAccount email={email} />
          ) : (
            <>
              <div className="flex flex-col gap-8 px-14">
                <h3 className="text-center text-dark-500 text-3xl font-semibold">
                  Create your Sneakers account
                </h3>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <div className="w-full flex flex-col">
                    <label>Display Name</label>
                    <input
                      {...register("displayName", {
                        required: "Display Name is required",
                        minLength: {
                          value: 4,
                          message: "Display name must be at least 4 characters",
                        },
                      })}
                      type="text"
                      placeholder="Your Display Name"
                      className="px-4 py-2 border rounded-md bg-dark-100 outline-newPrimary"
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label>Email</label>
                    <input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      placeholder="Your Email"
                      className="px-4 py-2 border rounded-md bg-dark-100 outline-newPrimary"
                    />
                    {errors.email && (
                      <p className="text-red-500">{`${errors.email.message}`}</p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <label>Password</label>
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 10,
                          message: "Password must be at least 10 characters",
                        },
                      })}
                      type="password"
                      placeholder="Your Password"
                      className="px-4 py-2 border rounded-md bg-dark-100 outline-newPrimary"
                    />
                    {errors.password && (
                      <p className="text-red-500">{`${errors.password.message}`}</p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <label>Confirm password</label>
                    <input
                      {...register("confirmPassword", {
                        required: "Password must match",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords must match",
                      })}
                      type="password"
                      placeholder="Confirm Password"
                      className="px-4 py-2 border rounded-md bg-dark-100 outline-newPrimary"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                    )}
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="w-full h-10 rounded-md bg-newPrimary text-newWhite"
                  >
                    {isSubmitting ? "Creating Account" : "Create Account"}
                  </button>
                </form>
              </div>

              <div className="w-full h-14 rounded-b-lg flex items-center justify-center gap-1 bg-dark-200 text-sm">
                Already have an account?
                <Link
                  href="/login"
                  className="text-newPrimary font-semibold hover:text-dark-500 transition-all duration-150"
                >
                  Sign In
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
