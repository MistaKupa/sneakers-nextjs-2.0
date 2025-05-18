"use client";

import { useCart } from "@/app/_context/CartContext";
import Button from "../UI/Button";
import { useState } from "react";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";

function ProductButtons({ product, selectedSize }) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  function increment() {
    setQuantity((prev) => prev + 1);
  }

  function decrement() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  return (
    <div className="flex flex-col gap-5 md:grid md:grid-cols-[1.2fr,1fr,1fr] items-center md:justify-between md:gap-3 ">
      <div className="col-span-1 flex items-center justify-between border border-slate-300 rounded-xl w-4/5">
        <div>
          <Button variant="quantity" onClick={decrement}>
            -
          </Button>
        </div>
        <span className="font-bold text-dark-500">{quantity}</span>
        <div>
          <Button variant="quantity" onClick={increment}>
            +
          </Button>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center w-4/5 rounded-xl">
        <Button
          variant="primary"
          disabled={!selectedSize}
          icon={IoCartOutline}
          onClick={() => addToCart(product, quantity, selectedSize)}
        >
          <span className="font-bold text-newWhite ">Add to cart</span>
        </Button>
      </div>
    </div>
  );
}

export default ProductButtons;
