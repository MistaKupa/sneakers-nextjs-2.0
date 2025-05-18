"use client";

import LogoWhite from "@/app/_components/_header/_navigation/LogoWhite";
import { useCart } from "@/app/_context/CartContext";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import "simplebar-react/dist/simplebar.min.css";
import CheckoutSummaryItems from "./CheckoutSummaryItems";

export default function CheckoutSummary() {
  const { totalCartPrice, setCheckoutProgress } = useCart();

  return (
    <motion.div
      key="cartSummary"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, y: 500 }}
      transition={{ delay: 0.35, duration: 0.3 }}
      className="w-full h-[720px] bg-newPrimary lg:rounded-md"
    >
      <div className="flex flex-col gap-16 p-20">
        <motion.div
          key="logoWhite"
          animate={{ opacity: 1, scaleX: 1 }}
          initial={{ opacity: 0, scaleX: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="flex items-center gap-5"
        >
          <button onClick={() => setCheckoutProgress("in-cart")}>
            <IoArrowBack size={20} className="text-newWhite" />
          </button>

          <LogoWhite />
        </motion.div>

        <CheckoutSummaryItems />

        <motion.div
          key="price"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{
            delay: 2,
            duration: 1,
          }}
          className="w-full flex justify-around border-t-2 pt-5 border-newWhite text-newWhite"
        >
          <span className="w-24 flex justify-end font-semibold text-2xl">
            Total:
          </span>
          <span className="w-36 font-bold text-2xl">
            €{totalCartPrice.toFixed(2)}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
