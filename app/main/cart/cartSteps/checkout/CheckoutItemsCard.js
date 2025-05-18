"use client";

import { useCart } from "@/app/_context/CartContext";
import { motion } from "motion/react";
import Image from "next/image";
import "simplebar-react/dist/simplebar.min.css";

const childVariants = {
  hidden: { opacity: 0, y: -150 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "string",
    },
  },
};

export default function CheckoutItemsCard() {
  const { cart } = useCart();

  return (
    <div className="flex flex-col gap-10">
      {cart.map((item) => {
        return (
          <motion.div
            key={item.id}
            variants={childVariants}
            className="w-full flex items-center justify-around gap-5 md:gap-1 md:px-10 text-newWhite "
          >
            <div className="min-h-[80px] min-w-[80px] lg:min-h-[100px] lg:min-w-[100px]">
              <Image
                src={item.images[0]}
                alt="Product image"
                width={100}
                height={100}
                quality={80}
                className="rounded-md"
              />
            </div>
            <div className="w-36 flex flex-col justify-center gap-2 text-sm lg:text-base">
              <h3 className="font-bold ">{item.title}</h3>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg lg:text-xl">
                  €{item.price.toFixed(2)}
                </span>
                <span className="font-light"> x {item.quantity}</span>
              </div>
              <div className="text-sm">Size: {item.selectedSize}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
