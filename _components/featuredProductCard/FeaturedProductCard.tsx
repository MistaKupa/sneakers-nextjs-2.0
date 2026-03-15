"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "../UI/Button";
import { useCart } from "@/app/_context/CartContext";
import { ProductDetailsPublic } from "@/types/product.types";

function FeaturedProductCard({
  products,
}: {
  products: ProductDetailsPublic[];
}) {
  const { id, title, price, discount, images } = products[0];

  return (
    <div className="bannerProduct bg-white bg-opacity-75 flex flex-col justify-between w-full h-96 lg:grid lg:grid-cols-3 md:w-96 lg:w-[30rem] lg:h-60 p-2 rounded-md">
      <Link
        className="block w-full h-full lg:col-span-2"
        href={`/main/product/${id}`}
      >
        <motion.div
          // layoutId={`product-${id}`}
          className="relative w-full h-full"
        >
          <Image
            src={images[0]}
            alt="Adifom"
            fill
            className="rounded-md object-cover"
          />
          <span className="absolute top-2 left-2 uppercase text-dark-100 text-xs font-semibold bg-newPrimary px-2 py-1 rounded-md z-10">
            Sale
          </span>
        </motion.div>
      </Link>
      <div className="flex flex-col justify-between  gap-8 md:gap-4 lg:gap-0 items-center p-4">
        <div className="flex flex-col gap-3">
          <h5 className="uppercase text-sm font-semibold">{title}</h5>
          <div className="flex gap-3 ">
            <p>{price}€</p>
            <p className="text-dark-400 line-through">180.00€</p>
          </div>
        </div>
        {/* <button className="uppercase bg-newPrimary text-dark-100 text-sm  font-bold px-3 py-3 rounded-full">
                  Add To Cart
                </button> */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          <Link href={`/main/product/${id}`}>
            <Button
              variant="primary"
              className="uppercase text-sm md:w-3/4 place-self-center"
            >
              View
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default FeaturedProductCard;
