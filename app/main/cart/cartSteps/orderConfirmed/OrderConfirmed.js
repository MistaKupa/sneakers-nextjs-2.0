"use client";

import orderConfirmed from "@/public/order-confirmed-guy.json";
import { motion } from "framer-motion";

import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
export default function OrderConfirmed() {
  return (
    <div className="flex flex-col items-center gap-10 lg:my-10">
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 500 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className=" flex flex-col items-center gap-5"
      >
        <h2 className="text-2xl font-medium">Thank you for your purchase!</h2>
        <Link href="/main/account/myOrders">
          <motion.button
            className="py-2 px-5 bg-newPrimary text-newWhite font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            onClick={() => {}}
          >
            View your order
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        animate={{
          scale: [0, 1.25, 0.85, 1.05, 1],
          opacity: [1, 1, 1, 1, 1],
        }}
        transition={{
          duration: 2.4,
          ease: "easeInOut",
          times: [0.4, 0.5, 0.6, 0.7, 0.8],
        }}
      >
        <Lottie
          className="h-52 lg:h-96 my-4"
          animationData={orderConfirmed}
        ></Lottie>
      </motion.div>
    </div>
  );
}

// initial={{ opacity: 0, scale: 0 }}
// animate={{
//   scale: [1, 1.25, 0.85, 1.05, 1],
//   opacity: [1, 1, 1, 1, 1],
// }}
// transition={{
//   delay: 0.35,
//   duration: 2.5,
//   ease: "easeInOut",
//   times: [0.4, 0.5, 0.6, 0.7, 0.8],
// }}
