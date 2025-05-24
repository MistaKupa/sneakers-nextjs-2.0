"use client";

import { motion } from "framer-motion";

function ColorSelector({ setCurrent, resetInterval }) {
  return (
    <div className="flex justify-around pt-4 xl:gap-10 xl:pl-16 xl:items-end">
      <motion.button
        whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
        className="w-8 h-8 bg-red-600 rounded-full"
        onClick={() => {
          setCurrent(0);
          resetInterval();
        }}
        aria-label="Select red sneaker"
      ></motion.button>
      <motion.button
        whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
        className="w-8 h-8 bg-lime-400 rounded-full"
        onClick={() => {
          setCurrent(1);
          resetInterval();
        }}
        aria-label="Select lime sneaker"
      ></motion.button>
      <motion.button
        whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
        className="w-8 h-8 bg-purple-700 rounded-full"
        onClick={() => {
          setCurrent(2);
          resetInterval();
        }}
        aria-label="Select purple sneaker"
      ></motion.button>
    </div>
  );
}

export default ColorSelector;
