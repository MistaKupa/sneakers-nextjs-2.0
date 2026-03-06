"use client";

import Image from "next/image";
import { IoChevronBack, IoChevronForward, IoCloseSharp } from "react-icons/io5";

import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/app/_lib/utils";

function LightbulbModal({
  isOpen,
  onClose,
  productImages,
  setActiveIndex,
  activeIndex,
}) {
  const modalRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, modalRef]);

  const nextImage = () => {
    if (activeIndex === productImages.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevImage = () => {
    if (activeIndex === 0) {
      setActiveIndex(productImages.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className={cn(
          "w-11/12",
          "fixed top-48 left-[50%] translate-x-[-50%]",
          "flex flex-col gap-5",
          "md:w-3/4 md:top-14",
          "lg:w-2/4 ",
          "xl:w-1/3 xl:h-1/3",
        )}
      >
        <motion.button
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.15 }}
          className="place-self-end text-newWhite hover:text-dark-300 transition-all duration-300 cursor-pointer"
          onClick={onClose}
        >
          <IoCloseSharp size={30} />
        </motion.button>
        {/*MAIN IMAGE CONTAINER*/}
        <div className="relative rounded-lg aspect-square">
          <AnimatePresence mode="wait">
            <motion.div
              className="h-full w-full"
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={productImages[activeIndex]}
                alt="Product photo"
                fill
                quality={80}
                className="w-full h-full rounded-lg object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/*NAVIGATION BUTTONS*/}
          <button
            onClick={prevImage}
            className={cn(
              "absolute top-[50%] translate-y-[-50%] -left-2.5",
              "p-0.5 rounded-full",
              "text-dark-500 bg-dark-100",
              "md:-left-6 md:p-3",
              "hover:text-newPrimary",
            )}
          >
            <IoChevronBack size={25} className="" />
          </button>

          <button
            onClick={nextImage}
            className={cn(
              "absolute top-[50%] translate-y-[-50%] -right-2.5",
              "p-0.5 rounded-full",
              "text-dark-500 bg-dark-100",
              "md:-right-6 md:p-3",
              "hover:text-newPrimary",
            )}
          >
            <IoChevronForward size={25} className="" />
          </button>
        </div>

        <div className="w-full items-center justify-around flex rounded-lg">
          {productImages.map((productImage, i) => (
            <div
              key={i}
              className={`max-w-36 flex items-center justify-center cursor-pointer rounded-lg ${
                activeIndex === i
                  ? "border-2 border-newPrimary"
                  : "border border-transparent"
              }`}
              onClick={() => setActiveIndex(i)}
            >
              <Image
                src={productImage}
                alt={`Product image ${i}`}
                width={100}
                height={100}
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default LightbulbModal;
