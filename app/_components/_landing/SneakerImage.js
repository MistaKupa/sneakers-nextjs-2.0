"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SneakerImage({ currentSneaker }) {
  const { image, bg1, bg2 } = currentSneaker;

  return (
    <div className="relative w-full h-full">
      {/*SNEAKER*/}
      <AnimatePresence mode="wait">
        <motion.div
          key={image}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{
            rotate: [0, 15, -2, -360],
            opacity: [1, 1, 1, 0],
            transition: { duration: 1.2 },
          }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="flex items-center justify-center w-full"
        >
          <Image
            key={image}
            src={image}
            alt="Nike Shoe"
            width={500}
            height={500}
            quality={80}
            className="relative z-10 "
          />
        </motion.div>
      </AnimatePresence>

      {/*SHADOW*/}

      <div
        className="absolute left-28 bottom-7 md:bottom-28 md:left-52 lg:bottom-14 lg:left-44 xl:bottom-3 xl:left-72 w-44 h-3 md:w-96 md:h-10 lg:w-72 lg:h-7 xl:w-96 xl:h-10 bg-black opacity-30 md:opacity-20 rounded-full blur-md -translate-x-1/2 "
        aria-hidden="true"
      />

      <AnimatePresence>
        {/*MAIN CIRCLE*/}
        <motion.div
          key={bg1}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeInOut" }}
          className={`absolute top-0 left-20 md:top-2 md:left-28 xl:-top-10 xl:left-40 -z-10 w-2/3 h-2/3 xl:w-96 xl:h-96 rounded-full ${bg1} `}
        ></motion.div>
      </AnimatePresence>

      {/*SECONDARY CIRLCE*/}
      <AnimatePresence>
        <motion.div
          key={bg2}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }}
          className={`absolute top-14 left-7 md:top-24 md:left-4 xl:top-24 xl:left-14 -z-10 w-1/2 h-1/2 xl:w-60 xl:h-60 rounded-full ${bg2} `}
        ></motion.div>
      </AnimatePresence>
    </div>
  );
}
