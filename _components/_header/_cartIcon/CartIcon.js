"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import CartPopup from "./CartPopup";
import { useCart } from "@/app/_context/CartContext";
import sneakers from "@/data/landingSneakers";

function Cart({}) {
  const { totalItems, setCheckoutProgress, checkoutProgress, cartColor } =
    useCart();

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
      className="relative h-full group"
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
            <IoCartOutline className=" size-5 sm:size-7" />
          </button>
        </Link>
        <span
          className={`absolute top-[-20%] right-[50%] translate-x-[100%] flex items-center justify-center sm:font-bold text-xs text-dark-100 bg-newPrimary rounded-full w-4 h-3 sm:w-6 sm:h-4 transition-colors  duration-500 delay-500`}
        >
          {totalItems}
        </span>

        <div className="absolute top-5 -right-12 md:-right-16 lg:-right-24 hidden group-hover:block">
          <CartPopup
            isOpen={isOpen}
            openPopup={openPopup}
            closePopup={closePopup}
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;
