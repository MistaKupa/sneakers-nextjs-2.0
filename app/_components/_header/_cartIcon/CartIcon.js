"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import CartPopup from "./CartPopup";
import { useCart } from "@/app/_context/CartContext";

function Cart() {
  const { totalItems, setCheckoutProgress, checkoutProgress } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    clearTimeout();
    setIsOpen(true);
  };

  const closePopup = () => {
    setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div
      className="relative h-full"
      onMouseEnter={openPopup}
      onMouseLeave={closePopup}
    >
      <div className="relative flex items-center justify-center">
        <Link className="flex items-center justify-center" href="/main/cart">
          <button
            onClick={() => setCheckoutProgress("in-cart")}
            onMouseEnter={openPopup}
            onMouseLeave={closePopup}
          >
            <IoCartOutline className="text-dark-500 size-5 sm:size-7" />
          </button>
        </Link>
        <span className="absolute top-[-20%] right-[50%] translate-x-[100%] flex items-center justify-center sm:font-bold text-xs text-dark-100 bg-newPrimary rounded-full w-4 h-3 sm:w-6 sm:h-4">
          {totalItems}
        </span>

        <CartPopup
          isOpen={isOpen}
          openPopup={openPopup}
          closePopup={closePopup}
        />
      </div>
    </div>
  );
}

export default Cart;
