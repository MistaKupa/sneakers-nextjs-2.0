import { createPortal } from "react-dom";
import CreateProductForm from "../CreateProductForm";
import { IoCloseOutline } from "react-icons/io5";
import { cn } from "@/app/_lib/utils";
import { useEffect, useRef, useState } from "react";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProductModal({ isOpen, onClose }) {
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
  }, [isOpen, onClose, modalRef]);

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className={cn(
          "absolute top-20 left-[50%] -translate-x-[50%] z-20",
          "w-1/2 h-5/6 py-10 px-28",
          "flex flex-col gap-10",
          "bg-slate-50",
          "rounded",
          "overflow-auto",
        )}
      >
        <div className={cn("relative", "flex justify-between")}>
          <h1 className="font-bold text-xl">Create New Product</h1>
          <button onClick={onClose}>
            <IoCloseOutline size={30} />
          </button>
        </div>
        <CreateProductForm />
      </div>
    </div>,
    document.body,
  );
}
