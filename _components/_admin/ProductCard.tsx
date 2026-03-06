"use client";

import { deleteProductClient } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { Product, ProductId } from "@/types/product.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoEyeOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import ConfirmDeleteModal from "./adminModals/ConfirmDeleteModal";
import toast from "react-hot-toast";

export default function ProductCard({
  product,
  onEdit,
}: {
  product: Product;
  onEdit: (id: ProductId) => void;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: deleteProductClient,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product successfully deleted!");
    },

    onError: () => {
      toast.error("Product could not be deleted!");
    },
  });

  const handleDelete = (id: ProductId) => {
    mutate(id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-4 grid-rows-5 items-center gap-3 p-5 border-b-2 last:border-0",

          "lg:h-28 lg:px-10 lg:py-2 lg:grid-cols-[repeat(6,1fr)_8rem] lg:grid-rows-1 lg:gap-6",
        )}
      >
        {/* Thumbnail */}
        <div
          className={cn(
            "relative w-full h-full min-h-[100px] col-span-2 row-span-4 rounded-md overflow-hidden",
            "lg:col-auto lg:row-auto lg:h-20 lg:w-20",
          )}
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="text-xs text-slate-500 font-mono lg:text-sm lg:text-slate-900">
          #{product.id}
        </div>

        {/* Title */}
        <div
          className="row-start-2 col-start-3 col-span-2 min-w-0 lg:col-auto lg:row-auto"
          title={product.title}
        >
          <h3 className="font-bold lg:font-medium truncate text-sm lg:text-base">
            {product.title}
          </h3>
        </div>

        {/* Price */}
        <div className="row-start-3 col-start-3 lg:col-auto lg:row-auto">
          <span className="font-semibold whitespace-nowrap">
            €{product.price.toFixed(2)}
          </span>
        </div>

        {/* Discount */}
        <div className="row-start-3 col-start-4 place-self-end lg:place-self-auto lg:col-auto lg:row-auto">
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-bold",
              product.discount
                ? "bg-green-100 text-green-700"
                : "text-slate-400",
            )}
          >
            {product.discount ? `-${product.discount}%` : "—"}
          </span>
        </div>

        {/* Stock */}
        <div className="row-start-4 col-start-3 lg:col-auto lg:row-auto">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                product.stock <= 2
                  ? "bg-red-500"
                  : product.stock <= 5
                    ? "bg-amber-500"
                    : "bg-green-500",
              )}
            />
            <span className="text-sm">{product.stock} u</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 row-start-5 col-span-2 lg:col-auto lg:row-auto ">
          <Link
            href={`/admin/products/${product.id}`}
            className="p-1 bg-white border rounded shadow-sm hover:bg-slate-50 transition-colors"
            title="View Details"
          >
            <IoEyeOutline size={18} />
          </Link>
          <button
            className="p-1 bg-white border rounded shadow-sm hover:bg-slate-50 transition-colors cursor-pointer text-blue-600"
            onClick={() => onEdit(product.id)}
            title="Edit"
          >
            <IoPencilOutline size={18} />
          </button>
          <button
            className="p-1 bg-white border rounded shadow-sm hover:bg-slate-50 transition-colors text-red-500"
            onClick={() => setIsDeleteModalOpen(true)}
            title="Delete"
          >
            <IoTrashOutline size={18} />
          </button>
        </div>
      </div>
      <ConfirmDeleteModal
        id={product.id}
        message="Are you sure you want to delete product"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(product.id)}
        isPending={isPending}
      />
    </>
  );
}
