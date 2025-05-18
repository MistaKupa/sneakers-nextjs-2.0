"use client";

import emailVerify from "@/public/email-verify.json";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import dynamic from "next/dynamic";

function VerifyAccount({ email }) {
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="text-center">
        <Lottie
          className="h-40"
          animationData={emailVerify}
          loop={false}
        ></Lottie>
        <h3 className="text-4xl font-semibold">Verify your email address</h3>
      </div>

      <p>
        We have sent a verification link to{" "}
        <span className="font-semibold">{email}</span>.
      </p>
      <div className="text-center">
        <p>Click on the link to complete the verification process.</p>
        <p>
          You might need to{" "}
          <span className="font-semibold">check your spam folder</span>.
        </p>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 text-newPrimary font-semibold mt-10"
      >
        Return to site <IoArrowForward />
      </Link>
    </div>
  );
}

export default VerifyAccount;
