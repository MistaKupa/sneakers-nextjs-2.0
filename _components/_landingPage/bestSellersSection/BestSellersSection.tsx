"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import useSectionColorChange from "@/hooks/useSectionColorChange";
import { Product } from "@/types/product.types";

export default function BestSellersSection({
  bestSellers,
}: {
  bestSellers: Product[];
}) {
  const bestSellerSectionRef = useRef(null);

  return (
    <section
      ref={bestSellerSectionRef}
      className="white-section relative w-full min-h-screen xl:h-screen bg-white z-20 py-24 px-5 md:px-16 xl:px-16 xl:py-0"
    >
      <div className="max-w-[1440px] h-full flex flex-col justify-center gap-16 mx-auto">
        <div className="flex justify-between">
          <h2 className="uppercase text-2xl font-semibold ">Best Sellers</h2>
          <div className="">
            <Link
              className="uppercase font-semibold text-sm border border-dark-500 rounded-full px-2 py-2"
              href=""
            >
              View All
            </Link>
          </div>
        </div>

        <div className="w-full grid lg:grid-cols-2 xl:grid-cols-4 gap-24 lg:gap-x-16 lg:gap-y-40 xl:gap-8 items-center">
          {bestSellers.map((product) => (
            <div key={product.id} className="flex flex-col gap-5">
              <Link
                className="block w-full h-full"
                href={`/main/product/${product.id}`}
              >
                <motion.div
                  layoutId={`product-${product.id}`}
                  className="relative aspect-[6/7] "
                >
                  <Image
                    src={product.images[0]}
                    alt="sneakers"
                    fill
                    className="rounded-md object-cover"
                  />
                  <span className="absolute top-2 left-2 uppercase text-dark-100 text-xs font-semibold bg-newPrimary px-2 py-1 rounded-md">
                    Best Seller
                  </span>
                </motion.div>
              </Link>
              <div className="flex flex-col gap-2">
                <h5 className="uppercase text-sm font-semibold">
                  {product.title}
                </h5>
                <span className="">{product.price.toFixed(2)}€</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
