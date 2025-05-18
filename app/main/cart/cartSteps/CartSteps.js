"use client";

import { useCart } from "@/app/_context/CartContext";
import CartSummary from "./cartSummary/CartSummary";
import Checkout from "./checkout/Checkout";
import OrderConfirmed from "./orderConfirmed/OrderConfirmed";
import { AnimatePresence, motion } from "framer-motion";
import EmptyCart from "../emptyCart/EmptyCart";
import { IoCardSharp, IoCartSharp, IoCheckmarkSharp } from "react-icons/io5";
import LoadingSpinner from "@/app/_components/loadingspinner/LoadingSpinner";

const cartVariants = {
  hidden: { opacity: 0, y: 500 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
  exit: { opacity: 0, y: -500, transition: { duration: 0.3 } },
};

export default function CartSteps() {
  const { checkoutProgress, cart, isCartReady } = useCart();

  if (!isCartReady) {
    return (
      <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center mt-28 gap-10">
        <span className="font-semibold text-xl">Loading cart...</span>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className="max-w-[1440px] mx-auto ">
      {(cart.length > 0 || checkoutProgress === "order-confirmed") && (
        <div className="relative w-2/3 lg:w-full h-3 bg-gray-200 my-20 rounded-md max-w-xl mx-auto px-4">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between rounded-md">
            <motion.span
              initial={{ width: 0 }}
              animate={{
                width:
                  checkoutProgress === "in-cart"
                    ? 0
                    : checkoutProgress === "in-checkout"
                    ? "50%"
                    : "100%",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full rounded-md bg-newPrimary z-30 "
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center bg-newPrimary rounded-full p-2 z-50"
            >
              <IoCartSharp size={20} color="white" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale:
                  checkoutProgress === "in-checkout" ||
                  checkoutProgress === "order-confirmed"
                    ? 1
                    : 0,
              }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center bg-newPrimary rounded-full p-2 z-50"
            >
              <IoCardSharp size={20} color="white" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: checkoutProgress === "order-confirmed" ? 1 : 0,
              }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center bg-newPrimary rounded-full p-2 z-50"
            >
              <IoCheckmarkSharp size={20} color="white" />
            </motion.div>
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {checkoutProgress === "order-confirmed" ? (
          <motion.div
            key="orderConfirmed"
            variants={cartVariants}
            initial="hidden"
            animate="visible"
          >
            <OrderConfirmed />
          </motion.div>
        ) : cart.length !== 0 ? (
          <>
            {checkoutProgress === "in-cart" && (
              <motion.div
                key="cartSummary"
                variants={cartVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <CartSummary />
              </motion.div>
            )}
            {checkoutProgress === "in-checkout" && (
              <motion.div
                key="checkoutSummary"
                variants={cartVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Checkout />
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            key="emptyCart"
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <EmptyCart />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
