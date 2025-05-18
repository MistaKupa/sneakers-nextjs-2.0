"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function CartEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -150 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex flex-col items-center justify-center gap-2"
    >
      <div>
        <Image
          src="/images/empty-cart.png"
          alt="emptyCart"
          width={200}
          height={200}
        />
      </div>
      <span className="text-dark-500 font-semibold text-xl">
        Your cart is empty
      </span>
    </motion.div>
  );
}
