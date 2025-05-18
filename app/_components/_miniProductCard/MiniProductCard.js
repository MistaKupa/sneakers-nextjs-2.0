"use client";

import { useCart } from "@/app/_context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

export default function MiniProductCard() {
  const { cart, removeFromCart } = useCart();

  return (
    <>
      {cart.map((product, i) => {
        const productTotal = product.price * product.quantity;

        const discountedPrice = product.price * (product.discount / 100);

        const discountedTotal = discountedPrice * product.quantity;

        return (
          <div
            key={i}
            exit={{ opacity: 0, x: 150 }}
            transition={{ duration: 500, delay: 1 }}
            className="flex items-center gap-5 px-6 "
          >
            <div className="rounded-md">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.images[0]}
                  alt={`${product.title} thumbnail`}
                  width={60}
                  height={60}
                  className="rounded-md border border-transparent hover:border-newPrimary transition-all duration-300"
                />
              </Link>
            </div>
            <div className="w-full flex items-center justify-between ">
              <div className="flex flex-col justify-center">
                <Link href={`/product/${product.id}`}>
                  <h5 className="text-dark-400 hover:text-newPrimary duration-300">
                    {product.title}
                  </h5>
                </Link>
                <div className="flex items-center gap-2.5">
                  {product.discount ? (
                    <>
                      <span className="text-dark-400 ">
                        €{discountedPrice.toFixed(2)} x {product.quantity}
                      </span>
                      <span className="font-bold text-dark-500">
                        €{discountedTotal.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-dark-400 ">
                        €{product.price.toFixed(2)} x {product.quantity}
                      </span>
                      <span className="font-bold text-dark-500">
                        €{productTotal.toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-1 text-dark-400 text-sm">
                <span>Size:</span>
                <span>{product.selectedSize}</span>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() =>
                    removeFromCart(product.id, product.selectedSize)
                  }
                >
                  <IoTrashOutline
                    size={20}
                    className="text-dark-400 hover:text-newPrimary transition-all duration-300 cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
