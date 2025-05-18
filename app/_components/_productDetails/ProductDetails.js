"use client";

import ProductButtons from "./ProductButtons";
import ProductPrice from "./ProductPrice";
import { motion } from "motion/react";
import ProductSizes from "./ProductSizes";
import { useState } from "react";

function ProductDescription({ product, sneakerSizes }) {
  const { id, title, description, price, discount, details } = product;

  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 md:px-10 lg:px-0 lg:flex lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-dark-400 tracking-wider">
            SNEAKER COMPANY
          </h3>
          <h1 className="font-bold text-5xl text-dark-500">{title}</h1>
        </div>
        <div className="flex flex-col justify-between gap-8">
          <div className="flex items-center justify-center">
            <p className="text-dark-400">{description}</p>
          </div>
          <div>
            <ProductSizes
              sizes={sneakerSizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <ProductPrice price={price} discount={discount} />
        </div>
        <ProductButtons product={product} selectedSize={selectedSize} />
      </motion.div>
    </div>
  );
}

export default ProductDescription;
