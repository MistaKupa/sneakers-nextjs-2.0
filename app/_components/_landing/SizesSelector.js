"use client";

import { useEffect, useRef, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { motion } from "framer-motion";

const sizes = [38, 39, 40, 41, 42, 43, 45];

export default function SizesSelector({ borderColor }) {
  const [selectedSize, setSelectedSize] = useState(41);

  const handleSizeBack = () => {
    const currentIndex = sizes.indexOf(selectedSize);

    if (currentIndex <= 0) {
      setSelectedSize(sizes[sizes.length - 1]);
    } else {
      setSelectedSize(sizes[currentIndex - 1]);
    }
  };

  const handleSizeForward = () => {
    const currentIndex = sizes.indexOf(selectedSize);

    if (currentIndex >= sizes.length - 1) {
      setSelectedSize(sizes[0]);
    } else {
      setSelectedSize(sizes[currentIndex + 1]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/*BUTTONS*/}
      <div className="w-full flex justify-between xl:pr-16">
        <motion.button
          whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
          onClick={() => handleSizeBack()}
        >
          <IoArrowBack size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
          onClick={() => handleSizeForward()}
        >
          <IoArrowForward size={20} />
        </motion.button>
      </div>

      {/*SIZES*/}
      <div
        className={`row-start-2 flex justify-between xl:gap-6 overflow-x-auto no-scrollbar border-b-2 xl:border-b-0 xl:border-r-2 ${borderColor} p-1 pb-3 xl:p-0 xl:pr-16 transition-colors duration-500 delay-500`}
      >
        {sizes.map((size) => {
          const distance = Math.abs(
            sizes.indexOf(size) - sizes.indexOf(selectedSize)
          );
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.6 : 0.3;
          const scale = distance === 0 ? 1.3 : distance === 1 ? 1 : 0.95;

          return (
            <motion.button
              key={size}
              onClick={() => setSelectedSize(size)}
              animate={{ opacity, scale }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-lg font-medium"
            >
              {size}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
