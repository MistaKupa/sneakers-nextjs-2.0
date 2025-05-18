"use client";

import Payment from "@/app/_components/_payment/Payment";
import { motion } from "framer-motion";
import "simplebar-react/dist/simplebar.min.css";
import CheckoutSummary from "./CheckoutSummary";

export default function Checkout() {
  return (
    <div
      className="w-full flex flex-col gap-20 mb-8 lg:my-10 lg:grid lg:grid-cols-2 lg:justify-center lg:items-center lg:p-5"
      key="checkoutWrapper"
    >
      <CheckoutSummary />

      <motion.div
        key="paymentForm"
        animate={{ opacity: 1, scaleY: 1 }}
        initial={{ opacity: 0, scaleY: 0 }}
        transition={{ delay: 0.35, duration: 0.35 }}
        exit={{ opacity: 0, y: 500 }}
        className="flex items-center justify-center w-full h-full"
      >
        <Payment />
      </motion.div>
    </div>
  );
}
