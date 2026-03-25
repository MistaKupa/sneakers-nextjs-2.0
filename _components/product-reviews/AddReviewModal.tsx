"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AddReviewForm from "./AddReviewForm";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { ProductId } from "@/types/product.types";
import { cn } from "@/app/_lib/utils";

interface AddReviewModalProps {
  productId: ProductId;
  productImage: string;
  productTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddReviewModal({
  productId,
  productImage,
  productTitle,
  isOpen,
  onClose,
}: AddReviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
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
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start lg:items-center justify-center overflow-y-auto">
      {/* BLUR BG */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* FORM CONTAINER */}
      <div
        ref={modalRef}
        className={cn(
          "relative my-10",
          " bg-dark-200 rounded-lg",
          "w-11/12",
          "md:w-4/5",
          "lg:w-3/5",
          "xl:w-1/3",
        )}
      >
        {/* HEADER */}
        <div className="flex justify-between p-5 shadow sticky top-0 bg-dark-200 rounded-t-lg z-10">
          <button
            type="button"
            onClick={onClose}
            className="text-newPrimary hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <IoCloseSharp size={30} />
          </button>
          <div className="flex items-center">
            <Image
              src="/images/logo_black.svg"
              width={100}
              height={100}
              alt="Sneakers logo black"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-8 px-5 py-16 md:px-12 lg:mt-20">
          <div className="flex flex-col text-center gap-4">
            <h1 className="text-4xl font-bold">Product review</h1>
            <p>
              We would be happy if you would take a moment to write a short
              review of the product you purchased. Your opinion will certainly
              be appreciated by other customers and maybe you will choose based
              on their reviews next time.
            </p>
          </div>

          {/* PRODUCT IMAGE */}
          <div className="flex items-center gap-5 border-t border-b py-8 px-5">
            <div>
              <Image
                src={productImage}
                width={120}
                height={120}
                alt={`${productTitle} image`}
              />
            </div>
            <h2 className="font-semibold">{productTitle}</h2>
          </div>

          <div>
            <AddReviewForm productId={productId} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
