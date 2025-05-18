"use client";

import Image from "next/image";
import CartDiscountInput from "./CartDiscountInput";
import CartHeader from "./CartHeader";
import CartProductCard from "./CartProductCard";
import { useCart } from "@/app/_context/CartContext";
import CartProductCardMobile from "./CartProductCardMobile";

export default function CartSummary() {
  const { setCheckoutProgress } = useCart();

  return (
    <div className="w-full p-5">
      <div className="my-7">
        <h2 className="text-3xl text-dark-500 font-bold">Your Cart</h2>
      </div>

      {/*Cart Header */}
      <div className="hidden lg:block">
        <CartHeader />
      </div>

      {/*Cart Items */}
      <div className="hidden lg:grid lg:grid-rows-[auto] lg:gap-5 lg:border-b-2">
        <CartProductCard />
      </div>

      <div className="lg:hidden">
        <CartProductCardMobile />
      </div>

      {/*DISCOUNT + PROCEED CHECKOUT*/}
      <div className="flex flex-col items-center gap-10 md:items-end mt-8">
        {/* <CartDiscountInput /> */}

        {/*"BUTTON"*/}
        <div className="flex justify-end">
          <button
            className="bg-newPrimary px-5 py-4 lg:px-10 lg:py-4 rounded-md text-newWhite font-bold"
            onClick={() => setCheckoutProgress("in-checkout")}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
