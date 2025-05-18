"use client";

import { useCart } from "@/app/_context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline, IoAdd, IoRemove } from "react-icons/io5";

export default function CartProductCard() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      {cart.map((product, i) => {
        const discountedPrice = product.price * (product.discount / 100);

        const productTotal = product.discount
          ? discountedPrice * product.quantity
          : product.price * product.quantity;

        return (
          <div
            className="grid grid-cols-7 gap-4 px-5 border-b pb-5 justify-between items-center text-dark-500 "
            key={i}
          >
            <div className="flex items-center gap-10 col-span-2">
              <div className="rounded-md">
                <Link href={`/main/product/${product.id}`}>
                  <Image
                    src={product.images[0]}
                    alt={`${product.title} thumbnail`}
                    width={60}
                    height={60}
                    className="rounded-md border border-transparent hover:border-newPrimary transition-all duration-300"
                  />
                </Link>
              </div>

              <div>
                <span className="text-xs text-dark-300">SNEAKERS COMPANY</span>
                <Link href={`/product/${product.id}`}>
                  <h5 className="text-dark-500 font-semibold hover:text-newPrimary duration-300 text-sm xl:text-base">
                    {product.title}
                  </h5>
                </Link>
              </div>

              <div className="text-dark-400 text-xs xl:text-sm">
                Size: {product.selectedSize}
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <button
                className="bg-dark-300 p-1 xl:p-1.5 rounded-md"
                onClick={() =>
                  updateQuantity(
                    product.id,
                    product.quantity - 1,
                    product.selectedSize
                  )
                }
              >
                <IoRemove />
              </button>
              <input
                type="number"
                min="1"
                value={product.quantity}
                className="w-6 xl:w-10 xl:py-1.5 text-center bg-dark-200 border rounded-md focus:outline-newPrimary"
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value, 10);
                  if (!isNaN(newQuantity) && newQuantity >= 1) {
                    updateQuantity(
                      product.id,
                      newQuantity,
                      product.selectedSize
                    );
                  }
                }}
              />
              <button
                className="bg-dark-300 p-1 xl:p-1.5 rounded-md"
                onClick={() =>
                  updateQuantity(
                    product.id,
                    product.quantity + 1,
                    product.selectedSize
                  )
                }
              >
                <IoAdd />
              </button>
            </div>

            <div className="flex items-center justify-center">
              <span className="text-green-600 text-xs xl:text-sm ">
                On Stock
              </span>
            </div>

            <div className="flex items-center justify-center text-sm xl:text-base">
              {product.discount ? (
                <div className="flex flex-col">
                  <span className="text-newPrimary font-medium">
                    €{discountedPrice.toFixed(2)}
                  </span>
                  <span className="line-through text-dark-400">
                    €{product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-dark-500 font-medium">
                  €{product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center justify-center">
              <span className="font-bold text-sm xl:text-base">
                €{productTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={() => removeFromCart(product.id, product.selectedSize)}
              >
                <IoTrashOutline
                  size={20}
                  className="text-dark-400 hover:text-newPrimary transition-all duration-300 cursor-pointer"
                />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
