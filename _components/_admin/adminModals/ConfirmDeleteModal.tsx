"use client";

import { cn } from "@/app/_lib/utils";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoAlertCircleOutline } from "react-icons/io5";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  id: number | string;
  message: string;
  isPending: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  id,
  message,
  isPending,
}: ConfirmModalProps) {
  const modalRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handeClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handeClickOutside);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handeClickOutside);
    };
  }, [isOpen, modalRef]);

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className={cn(
          "relative",
          "w-[29rem] h-48 p-5",
          "flex flex-col justify-between items-center",
          "bg-slate-100",
          "rounded",
        )}
      >
        <div className="flex flex-col items-center gap-5">
          <IoAlertCircleOutline className="text-red-500" size={30} />
          <p>
            {message} <span className="font-bold">{id}</span>?
          </p>
        </div>
        <div className="flex gap-5">
          <button
            onClick={onClose}
            className={cn(
              "px-4 py-1",
              "bg-slate-300",
              "rounded",
              "font-semibold",
              "hover:bg-slate-400 hover:text-slate-100",
              "transition-all duration-300",
            )}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              "px-4 py-1",
              "bg-red-500",
              "rounded",
              "font-bold uppercase text-slate-100",
              "hover:bg-red-700",
              "transition-all duration-300",
            )}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
