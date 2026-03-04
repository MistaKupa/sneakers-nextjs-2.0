"use client";

import { updateProduct } from "@/app/_lib/admin-service-client";
import { cn } from "@/app/_lib/utils";
import { Product, ProductUpdate } from "@/types/product.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCheckmark, IoCloseOutline, IoEyeOutline } from "react-icons/io5";
import ErrorSpan from "./ErrorSpan";

export default function ProductCardForm({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product successfully updated!");
      onClose();
    },
    onError: () => {
      toast.error("Product could not be updated!");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Product>({
    mode: "onChange",
    defaultValues: {
      title: product.title,
      price: product.price,
      discount: product.discount || 0,
      stock: product.stock,
    },
  });

  const onSubmit: SubmitHandler<ProductUpdate> = (formData) => {
    mutate({
      id: product.id,
      changes: formData,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "grid grid-cols-4 grid-rows-5 items-center gap-3 p-5 border-b-2 last:border-0 transition-opacity",
        "lg:h-28 lg:px-10 lg:py-2 lg:grid grid-cols-[repeat(6,1fr)_8rem] lg:grid-rows-1 lg:gap-6",
        isPending && "opacity-60 cursor-wait",
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-full min-h-[100px] col-span-2 row-span-4 lg:col-auto lg:row-auto lg:h-20 lg:w-20 rounded overflow-hidden">
        <Image
          src={product.images[0]}
          alt="Thumbnail"
          fill
          className="object-cover"
        />
      </div>

      {/* ID */}
      <div className="text-xs font-mono lg:text-sm">#{product.id}</div>

      {/* Title Input */}
      <div className="row-start-2 col-start-3 col-span-2 lg:col-auto lg:row-auto relative">
        <input
          type="text"
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "At least 3 chars" },
          })}
          disabled={isPending}
          className={cn(
            "w-full px-2 py-1 border rounded text-sm",
            errors.title ? "border-red-500" : "border-slate-300",
          )}
        />
        {errors.title && <ErrorSpan error={errors.title.message} />}
      </div>

      {/* Price Input */}
      <div className="row-start-3 col-start-3 lg:col-auto lg:row-auto relative">
        <div className="flex items-center gap-1">
          <span className="text-xs">€</span>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: true,
              valueAsNumber: true,
              min: { value: 10, message: "Min 10" },
            })}
            disabled={isPending}
            className={cn(
              "w-full px-1 py-1 border rounded text-sm font-semibold",
              errors.price ? "border-red-500" : "border-slate-300",
            )}
          />
        </div>
        {errors.price && <ErrorSpan error={errors.price.message} />}
      </div>

      {/* Discount Input */}
      <div className="row-start-3 col-start-4 place-self-end lg:place-self-auto lg:col-auto lg:row-auto relative">
        <div className="flex items-center gap-1">
          <input
            type="number"
            {...register("discount", {
              valueAsNumber: true,
              min: 0,
              max: 100,
            })}
            disabled={isPending}
            className={cn(
              "w-16 px-1 py-1 border rounded text-sm text-center",
              errors.discount ? "border-red-500" : "border-slate-300",
            )}
          />
          <span className="text-xs">%</span>
        </div>
      </div>

      {/* Stock Input */}
      <div className="row-start-4 col-start-3 lg:col-auto lg:row-auto relative">
        <input
          type="number"
          {...register("stock", {
            valueAsNumber: true,
            min: 0,
          })}
          disabled={isPending}
          className={cn(
            "w-20 px-1 py-1 border rounded text-sm",
            errors.stock ? "border-red-500" : "border-slate-300",
          )}
        />
        <span className="ml-2 text-xs text-slate-400">u</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 row-start-5 col-span-2 lg:col-auto lg:row-auto lg:justify-end">
        <button
          type="submit"
          disabled={!isDirty || isPending}
          className="p-1 bg-green-500 text-white rounded shadow-sm hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Save changes"
        >
          <IoCheckmark size={20} />
        </button>
        <button
          type="button"
          className="p-1 bg-white border rounded shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
          onClick={onClose}
          title="Cancel"
        >
          <IoCloseOutline size={20} />
        </button>
        <Link
          href={`/admin/products/${product.id}`}
          className="p-1 bg-slate-100 border rounded shadow-sm hover:bg-slate-200 transition-all"
        >
          <IoEyeOutline size={20} />
        </Link>
      </div>
    </form>
  );
}
