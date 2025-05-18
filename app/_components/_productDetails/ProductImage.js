"use client";

import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";
import LightbulbModal from "../_lightbulb/LightbulbModal";
import { useEffect, useState } from "react";

function ProductImage({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col items-center gap-7 w-full max-w-xl mx-auto">
        {/* MAIN IMAGE */}
        <motion.div
          layoutId={`product-${product.id}`}
          className="w-full cursor-pointer rounded-2xl"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={product.images[0]}
            alt="Main product image"
            width={720}
            height={720}
            quality={80}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </motion.div>

        {/* SECONDARY IMAGES */}
        <div className="flex flex-wrap items-center justify-center gap-4 lg:flex-nowrap">
          {product.images.map((image, i) => (
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.3 }}
              key={i}
              onClick={() => {
                setActiveIndex(i);
                setIsOpen(true);
              }}
              className="w-24 md:w-32 lg:w-20 xl:w-24 cursor-pointer rounded-xl"
            >
              <Image
                src={image}
                alt={`Thumbnail ${i + 1}`}
                width={400}
                height={400}
                quality={80}
                className="w-full h-auto rounded-xl object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBULB IMAGE MODAL */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10 bg-lightBox"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-[50%] left-[50%] z-20"
            >
              <LightbulbModal
                productImages={product.images}
                setIsOpen={setIsOpen}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductImage;
