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
        "h-28 px-10 py-2",
        "grid grid-cols-[repeat(6,1fr)_6rem] gap-10 items-center",
        "border-b-2 last:border-0",
        isPending && "opacity-85 cursor-wait",
      )}
    >
      <div className="relative w-1/2 h-full">
        <Image
          src={product.images[0]}
          alt="Sneaker thumbnail"
          fill
          className="object-cover"
        />
      </div>
      <div>{product.id}</div>
      <div className="relative w-full">
        <input
          type="text"
          {...register("title", {
            required: true,
            minLength: {
              value: 3,
              message: "Title needs to have at least 3 letters.",
            },
          })}
          disabled={isPending}
          className={cn(
            "w-full px-1 border rounded disabled:cursor-wait",
            errors.title && "border-red-500",
          )}
        />
        {errors.title && <ErrorSpan error={errors.title.message} />}
      </div>

      <div className="relative w-1/3">
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: true,
            valueAsNumber: true,
            min: { value: 10, message: "Price needs to be at least 10." },
          })}
          disabled={isPending}
          className={cn(
            "w-full px-1 border rounded disabled:cursor-wait",
            errors.price && "border-red-500",
          )}
        />
        {errors.price && <ErrorSpan error={errors.price.message} />}
      </div>

      <div className="relative w-1/3">
        <input
          type="number"
          {...register("discount", {
            required: true,
            valueAsNumber: true,
            min: { value: 0, message: "Discount cant be less than 0." },
            max: { value: 100, message: "Discount cant be more than 100." },
          })}
          disabled={isPending}
          className={cn(
            "w-full px-1 border rounded disabled:cursor-wait",
            errors.discount && "border-red-500",
          )}
        />
        {errors.discount && <ErrorSpan error={errors.discount.message} />}
      </div>

      <div className="relative w-1/3">
        <input
          type="number"
          {...register("stock", {
            required: true,
            valueAsNumber: true,
            min: { value: 0, message: "Quantity cant be less than 0" },
            max: { value: 30, message: "Quantity cant be more than 30" },
          })}
          disabled={isPending}
          className={cn(
            "w-full px-1 border rounded disabled:cursor-wait",
            errors.stock && "border-red-500",
          )}
        />
        {errors.stock && <ErrorSpan error={errors.stock.message} />}
      </div>

      <div className="flex justify-between">
        <button
          className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed"
          disabled={!isDirty}
        >
          <IoCheckmark />
        </button>
        <button
          className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300"
          onClick={onClose}
        >
          <IoCloseOutline />
        </button>
        <Link
          href={`/admin/products`}
          className="bg-slate-100 p-1 drop-shadow-sm border hover:scale-105 transition-all duration-300"
        >
          <IoEyeOutline />
        </Link>
      </div>
    </form>
  );
}
